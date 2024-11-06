import { CSSResultGroup, LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ListFactoriesStyle from './list-factories.style';
import { IFactory } from '../../interfaces';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('list-factories')
export default class ListFactories extends LitElement {
  @property({ attribute: false })
  onBuyFactory!: Function;

  private factories: IFactory[] = [
    {
      id: 1,
      name: 'Clicker',
      image: '/cursor.webp',
      cookies_revenue: 10,
      max_level: 3,
      minutes: 1,
      price: 250,
    },
    {
      id: 1,
      name: 'Beauty Grandma',
      image: '/grandma.jpg',
      cookies_revenue: 35,
      max_level: 3,
      minutes: 2,
      price: 600,
    },
  ];

  static styles: CSSResultGroup = [ListFactoriesStyle];

  render() {
    return html`
      <div class="list-factories">
        ${this.factories.map((factory) => {
          return html`
            <div>
              <img src=${factory.image} width="100" height="100" />
              <span
                >${factory.name} | Cookie Revenue Each ${factory.minutes}
                minutes: ${factory.cookies_revenue}</span
              >
              <button @click=${() => this.onBuyFactory(factory)}>Buy</button>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface HTMLElementTagNameMap {
    'list-factories': ListFactories;
  }
}
