import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import AppMain from './index';
import { AccountService } from './services';
import { IAccount } from './interfaces';
import { IAccountFactories } from './interfaces/account.interface';
import { of } from 'rxjs';
import './index';

describe('AppMain Component', () => {
  let element: AppMain;
  let accountServiceStub: sinon.SinonStubbedInstance<AccountService>;
  let putStub: sinon.SinonStub;

  beforeEach(async () => {
    accountServiceStub = sinon.createStubInstance(AccountService);
    accountServiceStub.getAllAccounts.resolves([]);
    accountServiceStub.watchAccounts.returns({
      subscribe: (callback: () => void) => {
        callback();
        return { unsubscribe: () => {} };
      },
    } as any);

    element = await fixture(html`<app-main></app-main>`);
    element['db'] = accountServiceStub;

    putStub = sinon.stub().returns(Promise.resolve());
    accountServiceStub.accounts = {
      put: putStub,
    } as any;

    element.accounts = [];
    element.currentAccount = undefined;
    await element.updateComplete;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render create-user component if no accounts are available', async () => {
    const createUser = element.shadowRoot?.querySelector('create-user');
    expect(createUser, 'Expected create-user component to be rendered').to
      .exist;
  });

  it('should update currentFactory and showListFactories, and subscribe to factory updates', async () => {
    const testFactory: IAccountFactories = {
      id: 1,
      name: 'Test Factory',
      level: 1,
      max_level: 5,
      price: 100,
      cookies_revenue: 10,
      milliseconds: 1000,
      image: '',
      update_at: new Date().getTime(),
    };

    const mockFactories: IAccountFactories[] = [
      {
        id: 1,
        name: 'Test Factory',
        level: 1,
        max_level: 5,
        price: 100,
        cookies_revenue: 10,
        milliseconds: 1000,
        image: '',
        update_at: new Date().getTime(),
      },
    ];
    accountServiceStub.watchFactoriesByName.returns(of(mockFactories));
    await element.setShowListFactories(testFactory, true);
    expect(element.currentFactory).to.equal(testFactory);
    expect(element.showListFactories).to.be.true;
    expect(
      accountServiceStub.watchFactoriesByName.calledOnceWith('Test Factory'),
    ).to.be.true;
    expect(element.allFactoriesByAccount).to.deep.equal(mockFactories);
  });

  it('should unsubscribe from previous factorySubscription when a new factory is set', async () => {
    const unsubscribeSpy = sinon.spy();
    element['factorySubscription'] = { unsubscribe: unsubscribeSpy } as any;
    await element.setShowListFactories(null);
    expect(unsubscribeSpy.calledOnce).to.be.true;
    expect(element.showListFactories).to.be.false;
  });

  it('should call activateAccountByUsername with the correct username', async () => {
    const username = 'testuser';
    accountServiceStub.activateAccountByUsername.resolves();
    await element.activateAccount(username);
    expect(
      accountServiceStub.activateAccountByUsername,
    ).to.have.been.calledOnceWith(username);
  });

  it('should call activateAccount with the correct username', async () => {
    const activateAccountSpy = sinon.spy(element, 'activateAccount');
    const username = 'testuser';
    await element.activateAccount(username);
    expect(activateAccountSpy.calledOnceWith(username)).to.be.true;
    activateAccountSpy.restore();
  });

  it('should call activateAccount with the selected username', async () => {
    const activateAccountSpy = sinon.spy(element, 'activateAccount');

    const username = 'testuser';
    const selectElement = document.createElement('select');
    const option = document.createElement('option');
    option.value = username;
    option.selected = true;
    selectElement.appendChild(option);

    const event = new Event('change');
    Object.defineProperty(event, 'target', {
      writable: false,
      value: selectElement,
    });
    await element.selectNewAccount(event);
    expect(activateAccountSpy.calledOnceWith(username)).to.be.true;
    activateAccountSpy.restore();
  });

  it('should play audio and call addNewCookieToSelectedAccount on handleClick', async () => {
    const playStub = sinon.stub(Audio.prototype, 'play').resolves();
    accountServiceStub.addNewCookieToSelectedAccount.resolves();
    await element.handleClick();
    expect(playStub.calledOnce).to.be.true;
    expect(accountServiceStub.addNewCookieToSelectedAccount.calledOnce).to.be
      .true;
  });

  it('should call addSelectedFactoryToCurrentAccount with currentFactory on onBuyFactory', async () => {
    const testFactory = {
      id: 1,
      name: 'Test Factory',
      image: 'hola',
      cookies_revenue: 12,
      price: 12,
      max_level: 12,
      milliseconds: 1000,
    };
    element.currentFactory = testFactory;
    accountServiceStub.addSelectedFactoryToCurrentAccount.resolves();
    await element.onBuyFactory();
    expect(
      accountServiceStub.addSelectedFactoryToCurrentAccount.calledOnceWith(
        testFactory,
      ),
    ).to.be.true;
  });

  it('should calculate and update cookies for each account based on factories', async () => {
    // Configuración de los datos de prueba
    const currentTime = new Date().getTime();
    const mockFactories: IAccountFactories[] = [
      {
        id: 1,
        name: 'Factory1',
        level: 2,
        max_level: 5,
        price: 100,
        cookies_revenue: 5,
        milliseconds: 1000,
        image: '',
        update_at: currentTime - 1000, // 1 segundo en el pasado
      },
    ];

    const mockAccounts: IAccount[] = [
      {
        id: 1,
        username: 'user1',
        cookies: 100,
        is_active: true,
        factories: mockFactories,
      },
    ];

    // Stubbear `getAllAccounts` para que retorne `mockAccounts`
    accountServiceStub.getAllAccounts.resolves(mockAccounts);

    // Llamar al método `calculateNewCookies`
    await element.calculateNewCookies();

    // Verificar que se llamó a `getAllAccounts` una vez
    expect(accountServiceStub.getAllAccounts.calledOnce).to.be.true;

    // Verificar que las cookies se actualizaron correctamente
    const expectedCookiesEarned = 5 * 2 * 10; // cookies_revenue * level * interval
    expect(mockAccounts[0].cookies).to.equal(100 + expectedCookiesEarned);

    // Verificar que `put` fue llamado con la cuenta actualizada
    expect(putStub.calledOnce).to.be.true;
    expect(putStub.getCall(0).args[0]).to.deep.equal(mockAccounts[0]);
  });
});
