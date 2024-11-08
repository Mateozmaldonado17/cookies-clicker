import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';
import './list-users';
import CreateUser from './list-users';
import { IAccount } from '../../interfaces';

describe('ListUsers Component', () => {
  it('should be defined', async () => {
    const el = await fixture(html`<list-users></list-users>`);
    expect(el).to.be.instanceOf(CreateUser);
  });

  it('should render a list of user options', async () => {
    const accounts: IAccount[] = [
      {
        username: 'user1',
        cookies: 100,
        is_active: false,
        factories: [],
      },
      {
        username: 'user2',
        cookies: 250,
        is_active: false,
        factories: [],
      },
    ];

    const el = await fixture<CreateUser>(
      html`<list-users .accounts=${accounts}></list-users>`,
    );

    const options = el.shadowRoot?.querySelectorAll('option');
    expect(options?.length).to.equal(accounts.length); // Verifica que el número de opciones coincida con el de cuentas
    expect(options?.[0]?.textContent).to.include('user1');
    expect(options?.[1]?.textContent).to.include('user2');
  });

  it('should call selectNewAccount on selecting a new option', async () => {
    const accounts: IAccount[] = [
      {
        username: 'user1',
        cookies: 100,
        is_active: false,
        factories: [],
      },
      {
        username: 'user2',
        cookies: 250,
        is_active: false,
        factories: [],
      },
    ];
    const selectNewAccount = sinon.spy();

    const el = await fixture<CreateUser>(
      html`<list-users
        .accounts=${accounts}
        .selectNewAccount=${selectNewAccount}
      ></list-users>`,
    );

    const select = el.shadowRoot?.querySelector('select') as HTMLSelectElement;
    select.value = 'user2';
    select.dispatchEvent(new Event('change'));

    expect(selectNewAccount.calledOnce).to.be.true;
  });
});
