import { CSSResultGroup, LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CookieClickerStyle from './cookie-clicker.style';
import cookie from '../../assets/cookie.png';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('cookie-clicker')
export default class CookieClicker extends LitElement {
  static styles: CSSResultGroup = [CookieClickerStyle];

  @property({ attribute: false })
  handleClick!: Function;

  render() {
    return html`<div class="cookie-clicker">
      <img
        class="cookie-clicker-img"
        @click=${this.handleClick}
        draggable="false"
        src=${cookie}
        width="250"
        height="250"
      />
    </div>`;
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'cookie-clicker': CookieClicker;
  }
}
