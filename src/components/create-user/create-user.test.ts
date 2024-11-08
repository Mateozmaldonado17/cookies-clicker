import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
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

  xit('should call createNewAccount method on button click', async () => {
    const element = await fixture<CreateUser>(
      html`<create-user></create-user>`,
    );
    const createNewAccountStub = sinon
      .stub(element, 'onCreateNewAccount')
      .resolves();
    await element.updateComplete;
    const button = element.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement;
    await button.click();
    expect(createNewAccountStub).to.have.been.calledOnce;
    createNewAccountStub.restore();
  });

  // xit('should set account and clear username after creating a new account', async () => {
  //   const element = await fixture(
  //     html`<cookie-clicker></cookie-clicker>`,
  //   );
  //   const mockAccount = {
  //     username: 'testuser',
  //     cookies: 100,
  //     is_active: true,
  //     factories: [],
  //   };

  //   const accountServiceStub = sinon
  //     .stub(AccountService.prototype, 'createNew')
  //     .resolves(mockAccount);
  //   const activateAccountStub = sinon
  //     .stub(AccountService.prototype, 'activateAccountByUsername')
  //     .resolves();

  //   element.username = 'testuser';
  //   await element.onCreateNewAccount();

  //   expect(accountServiceStub).to.have.been.calledOnceWith({
  //     username: 'testuser',
  //   });
  //   expect(activateAccountStub).to.have.been.calledOnceWith('');
  //   expect(element.account).to.deep.equal(mockAccount);
  //   expect(element.username).to.equal('');

  //   accountServiceStub.restore();
  //   activateAccountStub.restore();
  // });

  // xit('should handle errors during account creation', async () => {
  //   const element = await fixture(
  //     html`<cookie-clicker></cookie-clicker>`,
  //   );
  //   const error = new Error('Failed to create account');
  //   const accountServiceStub = sinon
  //     .stub(AccountService.prototype, 'createNew')
  //     .rejects(error);

  //   const alertStub = sinon.stub(window, 'alert');
  //   element.username = 'testuser';
  //   await element.onCreateNewAccount();

  //   expect(alertStub).to.have.been.calledWith('Failed to create account');
  //   expect(element.account).to.be.null;

  //   accountServiceStub.restore();
  //   alertStub.restore();
  // });
});
