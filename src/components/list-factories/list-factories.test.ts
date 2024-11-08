import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import './list-factories';
import ListFactories from './list-factories';

describe('ListFactories Component', () => {
  it('should be defined', async () => {
    const el = await fixture(html`<list-factories></list-factories>`);
    expect(el).to.be.instanceOf(ListFactories);
  });

  it('should render the correct number of factory items', async () => {
    const el = await fixture<ListFactories>(
      html`<list-factories></list-factories>`,
    );
    const items = el.shadowRoot?.querySelectorAll('.item');
    expect(items?.length).to.equal(3);
  });

  it('should call setShowListFactories on item click', async () => {
    const setShowListFactories = sinon.spy();
    const el = await fixture<ListFactories>(
      html`<list-factories
        .setShowListFactories=${setShowListFactories}
      ></list-factories>`,
    );

    const item = el.shadowRoot?.querySelector('.item') as HTMLElement;
    item.click();

    expect(setShowListFactories.calledOnce).to.be.true;
  });
});
