import { CSSResultGroup, LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import ListFactoriesStyle from './list-factories.style';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('list-factories')
export default class ListFactories extends LitElement {
  static styles: CSSResultGroup = [ListFactoriesStyle];

  render() {
    return html`<div>Hello Worlds</div>`;
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'list-factories': ListFactories;
  }
}
