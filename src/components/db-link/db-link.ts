import { CSSResultGroup, LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import DBLinkStyle from './db-link.style';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('db-link')
export default class DBLink extends LitElement {
  static styles: CSSResultGroup = [DBLinkStyle];

  @property()
  value = 'Link';

  @property({ type: Boolean })
  disabled = false;

  render() {
    return html`<div class="db-link"> ${this.value} </div>`;
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'db-link': DBLink;
  }
}
