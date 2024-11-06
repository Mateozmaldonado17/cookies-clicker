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

  render() {
    return html`<div class="list-users">
      ${this.accounts?.map((account: IAccount) => {
        return html` <div>${account.username} $${account.cookies}</div> `;
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
