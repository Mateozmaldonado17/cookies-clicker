import { fixture, html, expect } from '@open-wc/testing';
import './create-user';
import CreateUser from './create-user';
describe('CreateUser Component', () => {
  it('should be defined', async () => {
    const el = await fixture(html`<create-user></create-user>`);
    expect(el).to.be.instanceOf(HTMLElement);
  });

  it('should render input and button elements', async () => {
    const el = await fixture(html`<create-user></create-user>`);
    const input = el.shadowRoot?.querySelector('input');
    const button = el.shadowRoot?.querySelector('button');
    expect(input).to.exist;
    expect(button).to.exist;
  });

  it('should update username state on input change', async () => {
    const element: any = await fixture(html`<create-user></create-user>`);
    const input = element.shadowRoot?.querySelector(
      'input',
    ) as HTMLInputElement;
    input.value = 'testuser';
    input.dispatchEvent(new Event('input'));

    expect(element.username).to.equal('testuser');
  });

  it('should update account and clear username after creating a new account', async () => {
    const element = await fixture<CreateUser>(
      html`<create-user></create-user>`,
    );

    element.username = 'testuser';

    await element.updateComplete;
    const button = element.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement;
    button.click();

    await element.updateComplete;
    expect(element.username).to.equal('testuser');
    expect(element.account).to.not.be.null;
  });
});
