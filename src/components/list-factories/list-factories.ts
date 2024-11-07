import { CSSResultGroup, LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import ListFactoriesStyle from './list-factories.style';
import { IFactory } from '../../interfaces';
import { styleMap } from 'lit/directives/style-map.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('list-factories')
export default class ListFactories extends LitElement {
  @property({ attribute: false })
  setShowListFactories!: Function;

  private factories: IFactory[] = [
    {
      id: 1,
      name: 'Clicker',
      image: '/cursor.webp',
      cookies_revenue: 1,
      max_level: 3,
      milliseconds: 100,
      price: 100,
    },
    {
      id: 2,
      name: 'Grandma',
      image: '/grandma.jpg',
      cookies_revenue: 2,
      max_level: 3,
      milliseconds: 100,
      price: 250,
    },
    {
      id: 3,
      name: 'Trump',
      image: '/trump.jpg',
      cookies_revenue: 3,
      max_level: 3,
      milliseconds: 100,
      price: 450,
    },
    {
      id: 4,
      name: 'Kamala',
      image: '/kamala.png',
      cookies_revenue: 2,
      max_level: 3,
      milliseconds: 100,
      price: 350,
    },
  ];

  static styles: CSSResultGroup = [ListFactoriesStyle];

  render() {
    return html`
      <div class="list-factories">
        ${this.factories.map((factory) => {
          return html`
            <div
              class="item"
              @click=${() => this.setShowListFactories(factory)}
            >
              <div
                class="factory-img"
                style=${styleMap({
                  'background-image': `url(${factory.image})`,
                })}
              ></div>
              <span>${factory.name}</span>
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
