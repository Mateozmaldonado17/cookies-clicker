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
export class AppMain extends LitElement {
  private db: AccountService = new AccountService();
  private intervalId?: number;
  private factorySubscription?: Subscription;

  @state()
  allFactoriesByAccount!: IAccountFactories[];

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
    });
    this.detectIfThereIsNotAccounts();
    this.getSelectedAccount();
  }

  private async getSelectedAccount(): Promise<string | undefined> {
    const account = await this.db.getSelectedAccount();
    return account?.username;
  }

  private async activateAccount(username: string) {
    return await this.db.activateAccountByUsername(username);
  }

  private async selectNewAccount(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const username = selectElement.value;
    return await this.activateAccount(username);
  }

  private async handleClick(): Promise<void> {
    await this.db.addNewCookieToSelectedAccount();
  }

  private async onBuyFactory(): Promise<void> {
    this.db.addSelectedFactoryToCurrentAccount(this.currentFactory);
  }

  private async calculateNewCookies() {
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
    }, 100);
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
      <create-user></create-user>
      <list-users
        .accounts=${this.accounts}
        .selectNewAccount=${(event: Event) => this.selectNewAccount(event)}
        .selectedUsername=${() => this.getSelectedAccount()}
      ></list-users>
      <cookie-clicker .handleClick=${() => this.handleClick()}></cookie-clicker>
      <div class="factories-bottom">
        <list-factories
          .setShowListFactories=${(factory: IFactory) =>
            this.setShowListFactories(factory, true)}
        ></list-factories>
      </div>
    `;
  }

  static styles: CSSResultGroup = [MainStyle];
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'app-main': AppMain;
  }
}
