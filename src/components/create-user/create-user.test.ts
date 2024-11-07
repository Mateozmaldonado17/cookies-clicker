import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import CreateUser from './create-user';
import { AccountService } from '../../services';
import './create-user';

describe('CreateUser Component', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should be defined', async () => {
    const el = await fixture(html`<create-user></create-user>`);
    expect(el).to.be.instanceOf(CreateUser);
  });

  it('should update username state on input change', async () => {
    const el = await fixture<CreateUser>(html`<create-user></create-user>`);
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

    input.value = 'testUser';
    input.dispatchEvent(new Event('input'));

    expect(el.username).to.equal('testUser');
  });

  it('should call AccountService.createNew on button click and update account', async () => {
    const el = await fixture<CreateUser>(html`<create-user></create-user>`);
    const accountServiceStub = sinon
      .stub(AccountService.prototype, 'createNew')
      .resolves({
        username: 'testUser',
        cookies: 0,
        is_active: false,
        factories: [],
      });

    el.username = 'testUser';
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();

    await el.updateComplete;

    expect(accountServiceStub.calledOnce).to.be.true;
    expect(
      accountServiceStub.calledWith({
        username: 'testUser',
      }),
    ).to.be.true;
    expect(el.account).to.deep.equal({
      username: 'testUser',
      cookies: 0,
      is_active: false,
      factories: [],
    });

    accountServiceStub.restore();
  });

  it('should clear username after successful account creation', async () => {
    const el = await fixture<CreateUser>(html`<create-user></create-user>`);
    const accountServiceStub = sinon
      .stub(AccountService.prototype, 'createNew')
      .resolves({
        username: 'testUser',
        cookies: 0,
        is_active: false,
        factories: [],
      });

    el.username = 'testUser';
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();

    await el.updateComplete;

    expect(el.username).to.equal('');
    accountServiceStub.restore();
  });

  it('should handle errors during account creation and set account to null', async () => {
    const el = await fixture<CreateUser>(html`<create-user></create-user>`);
    const error = new Error('Account creation failed');
    const accountServiceStub = sinon
      .stub(AccountService.prototype, 'createNew')
      .rejects(error);
    const alertStub = sinon.stub(window, 'alert');

    el.username = 'testUser';
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    button.click();

    await el.updateComplete;

    expect(el.account).to.be.null;
    expect(alertStub.calledOnceWith('Account creation failed')).to.be.true;

    accountServiceStub.restore();
    alertStub.restore();
  });
});
