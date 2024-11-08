import { CSSResultGroup, LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AccountService } from './services';
import { IAccount, IFactory } from './interfaces';
import { IAccountFactories } from './interfaces/account.interface';
import MainStyle from './main.style';
import './components';
import { Subscription } from 'rxjs';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('app-main')
export default class AppMain extends LitElement {
  static styles: CSSResultGroup = [MainStyle];
  private db: AccountService = new AccountService();
  private intervalId?: number;
  private factorySubscription?: Subscription;

  @state()
  allFactoriesByAccount!: IAccountFactories[];

  @state()
  currentAccount!: IAccount | undefined;

  @state()
  currentFactory!: IFactory;

  @state()
  showListFactories: boolean = true;

  @state()
  accounts!: IAccount[];

  async setShowListFactories(factory: IFactory | null, openModal = false) {
    this.currentFactory = factory as IFactory;
    this.showListFactories = openModal;
    this.factorySubscription?.unsubscribe();
    if (factory) {
      this.factorySubscription = this.db
        .watchFactoriesByName(factory.name)
        .subscribe({
          next: (factories: IAccountFactories[]) => {
            if (
              JSON.stringify(this.allFactoriesByAccount) !==
              JSON.stringify(factories)
            ) {
              this.allFactoriesByAccount = factories;
            }
          },
          error: (err) => console.error(err),
        });
    }
  }

  async detectIfThereIsNotAccounts() {
    return await this.db.getAllAccounts();
  }

  protected firstUpdated(): void {
    this.db.watchAccounts().subscribe((data) => {
      this.accounts = data;
      this.getSelectedAccount();
    });
    this.detectIfThereIsNotAccounts();
  }

  async getSelectedAccount(): Promise<string | undefined> {
    const account = await this.db.getSelectedAccount();
    this.currentAccount = account;
    return account?.username;
  }

  async activateAccount(username: string) {
    return await this.db.activateAccountByUsername(username);
  }

  async selectNewAccount(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const username = selectElement.value;
    return await this.activateAccount(username);
  }

  async handleClick(): Promise<void> {
    const audio = new Audio('/public/bite.mp3');
    audio.play();
    await this.db.addNewCookieToSelectedAccount();
  }

  async onBuyFactory(): Promise<void> {
    this.db.addSelectedFactoryToCurrentAccount(this.currentFactory);
  }

  async calculateNewCookies() {
    const currentDate = new Date().getTime();
    const getAllAccounts = await this.db.getAllAccounts();

    for (const account of getAllAccounts) {
      account.factories.forEach((factory: IAccountFactories) => {
        const revenue = factory.cookies_revenue * factory.level;
        const differenceInMilliseconds = currentDate - factory.update_at;
        const interval = Math.floor(differenceInMilliseconds / 100);
        const cookiesEarned = revenue * interval;
        account.cookies += cookiesEarned;
        factory.update_at = currentDate;
      });
      await this.db.accounts.put(account);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.intervalId = window.setInterval(() => {
      this.calculateNewCookies();
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  async upgradeFactoryLevel(factoryId: number) {
    try {
      await this.db.upgradeFactoryLevel(factoryId);
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return html`
      ${this.showListFactories &&
      this.currentFactory &&
      html`
        <div class="list-factory-modal">
          <div class="list-factory-modal-header">
            <h2>${this.currentFactory.name}</h2>
            <div
              >Cookies Revenue: ${this.currentFactory.cookies_revenue} | Max
              Level: ${this.currentFactory.max_level}</div
            >
            <div class="buttons">
              <button @click=${this.onBuyFactory}>Buy</button>
              <button @click=${() => this.setShowListFactories(null, false)}
                >Close</button
              >
            </div>
            <div class="list-factory-modal-content">
              ${this.allFactoriesByAccount.map((factory: IAccountFactories) => {
                return html`
                  <hr />
                  <b
                    >${factory.name} #${factory.id} Level
                    ${factory.level}/${factory.max_level}</b
                  >
                  ${factory.level < factory.max_level
                    ? html` <button
                        @click=${() => this.upgradeFactoryLevel(factory.id)}
                      >
                        Up Level
                      </button>`
                    : 'Congratulations!'}
                `;
              })}
            </div>
          </div>
        </div>
      `}
      ${this.currentAccount
        ? html`
            <div style="position: absolute; left: 10px; top: 10px;">
              <create-user></create-user>
            </div>
            <p class="dancing-font-username"
              >${this.currentAccount?.username}</p
            >
            <div
              style="position: absolute; right: 0px; top: 0px; margin: 10px;"
            >
              <list-users
                .accounts=${this.accounts}
                .selectNewAccount=${(event: Event) =>
                  this.selectNewAccount(event)}
                .selectedUsername=${() => this.getSelectedAccount()}
              ></list-users>
            </div>

            <cookie-clicker
              .handleClick=${() => this.handleClick()}
            ></cookie-clicker>

            <div class="total-cookies">
              ${new Intl.NumberFormat('en', { notation: 'compact' }).format(
                this.currentAccount?.cookies as number,
              )}
              <span class="only-dancing-font cookies-value">Cookies</span>
            </div>

            <div class="factories-bottom">
              <list-factories
                .setShowListFactories=${(factory: IFactory) =>
                  this.setShowListFactories(factory, true)}
              ></list-factories>
            </div>
          `
        : html`
            <div
              style="display: grid; place-content: center; width: 100%; height: 90vh;"
            >
              <create-user></create-user>
            </div>
          `}

      <audio id="background-audio" autoplay loop>
        <source src="/public/background.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    `;
  }
}
declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'app-main': AppMain;
  }
}
