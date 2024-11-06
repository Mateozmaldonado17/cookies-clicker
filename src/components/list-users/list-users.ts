import { CSSResultGroup, LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

  @property({ type: Array })
  accounts!: IAccount[];

  @property({ attribute: false })
  selectNewAccount!: Function;

  render() {
    return html`<div class="list-users">
      ${this.accounts?.map((account: IAccount) => {
        const formattedCookies = new Intl.NumberFormat('en', {
          notation: 'compact',
        }).format(account.cookies);
        return html`
          <div
            >${account.username} ${formattedCookies}
            ${account.is_active
              ? 'Selected'
              : html`<button
                  @click=${() => this.selectNewAccount(account.username)}
                  >Select</button
                >`}</div
          >
        `;
      })}
    </div>`;
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'list-users': CreateUser;
  }
}
