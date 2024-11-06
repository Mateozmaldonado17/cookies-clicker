import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AccountService } from './services';
import { IAccount, IFactory } from './interfaces';
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
