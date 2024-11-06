import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AccountService } from './services';
import './components';
import { IAccount } from './interfaces';

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

  render() {
    return html`
      <create-user></create-user>
      <list-users .accounts=${this.accounts}></list-users>
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
