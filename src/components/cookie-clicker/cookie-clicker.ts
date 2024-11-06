import { CSSResultGroup, LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
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

  render() {
    return html`<div class="cookie-clicker">
      <img draggable="false" src=${cookie} />
    </div>`;
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'cookie-clicker': CookieClicker;
  }
}
