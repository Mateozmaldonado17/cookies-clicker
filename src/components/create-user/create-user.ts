import { CSSResultGroup, LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AccountService } from '../../services';
import CreateUserStyle from './create-user.style';
import { IAccount } from '../../interfaces';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('create-user')
export default class CreateUser extends LitElement {
  static styles: CSSResultGroup = [CreateUserStyle];

  @state()
  username!: string;

  @state()
  account!: IAccount | null;

  public async onChangeUsername(event: Event) {
    const target = event.target as HTMLInputElement;
    this.username = target.value;
  }

  async onCreateNewAccount() {
    try {
      const accountService = new AccountService();
      const getCreatedUser = await accountService.createNew({
        username: this.username,
      });
      this.account = getCreatedUser;
      await accountService.activateAccountByUsername(this.username);
      this.username = '';
    } catch (error: any) {
      this.account = null;
      alert(error.message);
    }
  }

  render() {
    return html`<div class="create-user">
      <input @input=${this.onChangeUsername} placeholder="Username here" />
      <button @click=${this.onCreateNewAccount}>Create new user</button>
    </div>`;
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'create-user': CreateUser;
  }
}
