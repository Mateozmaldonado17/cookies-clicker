import { CSSResultGroup, LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import ListUsersStyle from './list-users.style';
import { IAccount } from '../../interfaces';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('list-users')
export default class CreateUser extends LitElement {
  static styles: CSSResultGroup = [ListUsersStyle];

  @state()
  private resolvedUsername: string | undefined;

  @property({ type: Array })
  accounts!: IAccount[];

  @property({ attribute: false })
  selectNewAccount!: Function;

  @property({ attribute: false })
  selectedUsername!: () => Promise<string | undefined>;

  async firstUpdated() {
    this.resolvedUsername = await this.selectedUsername();
  }

  render() {
    return html`<div class="list-users">
      <select @change=${this.selectNewAccount} id="accounts">
        ${this.accounts?.map((account: IAccount) => {
          const formattedCookies = new Intl.NumberFormat('en', {
            notation: 'compact',
          }).format(account.cookies);
          return html`<option ?selected=${account.username === this.resolvedUsername} value=${account.username}
            >${account.username} ${formattedCookies} cookies</option
          >`;
        })}
      </select>
    </div>`;
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'list-users': CreateUser;
  }
}
