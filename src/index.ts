import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AccountService } from './services';
import './components';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('app-main')
export class AppMain extends LitElement {
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more';

  async detectIfThereIsNotAccounts() {
    const accountService = new AccountService();
    return await accountService.getAllAccounts();
  }

  protected firstUpdated(): void {
    this.detectIfThereIsNotAccounts();
  }

  render() {
    return html` <create-user></create-user>`;
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
