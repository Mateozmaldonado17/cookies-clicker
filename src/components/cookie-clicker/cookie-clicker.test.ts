import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import './cookie-clicker';

describe('CookieClicker Component', () => {
  it('should be defined', async () => {
    const el = await fixture(html`<cookie-clicker></cookie-clicker>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  it('should render an image with the specified attributes', async () => {
    const el = await fixture(html`<cookie-clicker></cookie-clicker>`);
    const img = el.shadowRoot?.querySelector(
      '.cookie-clicker-img',
    ) as HTMLImageElement;
    expect(img).to.exist;
    expect(img.src).to.include('http://localhost:8000/src/assets/cookie.png');
    expect(img.width).to.equal(250);
    expect(img.height).to.equal(250);
    expect(img.draggable).to.be.false;
  });

  it('should call handleClick when the image is clicked', async () => {
    const handleClick = sinon.spy();
    const el = await fixture(
      html`<cookie-clicker .handleClick=${handleClick}></cookie-clicker>`,
    );
    const img = el.shadowRoot?.querySelector(
      '.cookie-clicker-img',
    ) as HTMLImageElement;

    img.click();

    expect(handleClick.calledOnce).to.be.true;
  });

  it('should have the correct styles applied', async () => {
    const el = await fixture(html`<cookie-clicker></cookie-clicker>`);
    const computedStyle = getComputedStyle(
      el.shadowRoot?.querySelector('.cookie-clicker') as HTMLElement,
    );
    expect(computedStyle.display).to.not.be.undefined;
  });
});
