import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AccountService } from './services';
import { IAccount, IFactory } from './interfaces';
import { IAccountFactories } from './interfaces/account.interface';
import './components';

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

  @state()
  accounts!: IAccount[];

  async detectIfThereIsNotAccounts() {
    return await this.db.getAllAccounts();
  }

  protected firstUpdated(): void {
    this.db.watchAccounts().subscribe((data) => {
      this.accounts = data;
    });
    this.detectIfThereIsNotAccounts();
  }

  private async selectNewAccount(username: string) {
    return await this.db.activateAccountByUsername(username);
  }

  private async handleClick() {
    await this.db.addNewCookieToSelectedAccount();
  }

  private async onBuyFactory(factory: IFactory) {
    this.db.addSelectedFactoryToCurrentAccount(factory);
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

  render() {
    return html`
      <create-user></create-user>
      <list-users
        .accounts=${this.accounts}
        .selectNewAccount=${(username: string) =>
          this.selectNewAccount(username)}
      ></list-users>
      <cookie-clicker .handleClick=${() => this.handleClick()}></cookie-clicker>
      <list-factories
        .onBuyFactory=${(factory: IFactory) => this.onBuyFactory(factory)}
      ></list-factories>
    `;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
  `;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'app-main': AppMain;
  }
}
