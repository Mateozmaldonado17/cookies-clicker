import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import AccountService from './account.service';
import { IAccount } from '../interfaces';

describe('AccountService', () => {
    let accountService: AccountService;
    let accountsStub: sinon.SinonStub;

    beforeEach(() => {
        accountService = new AccountService();
        accountsStub = sinon.stub(accountService.accounts, 'toArray');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should fetch all accounts with getAllAccounts', async () => {
        const mockAccounts: IAccount[] = [
            { id: 1, username: 'user1', cookies: 100, is_active: true, factories: [] },
        ];
        accountsStub.resolves(mockAccounts);

        const accounts = await accountService.getAllAccounts();
        expect(accounts).to.deep.equal(mockAccounts);
        expect(accountsStub.calledOnce).to.be.true;
    });

    it('should create a new account with createNew', async () => {
        const username = 'newUser';
        const addStub = sinon.stub(accountService.accounts, 'add').resolves(1);
        const getAccountByUsernameStub = sinon.stub(accountService, 'getAccountByUsername').resolves(undefined);

        await accountService.createNew({ username });
        expect(addStub.calledOnceWith(sinon.match({ username }))).to.be.true;
        expect(getAccountByUsernameStub.calledOnceWith(username)).to.be.true;
    });

    it('should throw an error if creating an account that already exists', async () => {
        const username = 'existingUser';
        const mockAccount: IAccount = { id: 1, username, cookies: 100, is_active: true, factories: [] };
        const getAccountByUsernameStub = sinon.stub(accountService, 'getAccountByUsername').resolves(mockAccount);

        try {
            await accountService.createNew({ username });
        } catch (error: any) {
            expect(error.message).to.equal(`${username} already exists`);
        }

        expect(getAccountByUsernameStub.calledOnceWith(username)).to.be.true;
    });

    it('should upgrade factory level with upgradeFactoryLevel', async () => {
        const mockAccount: IAccount = {
            id: 1,
            username: 'user1',
            cookies: 500,
            is_active: true,
            factories: [
                { id: 1, name: 'Factory1', level: 1, max_level: 3, price: 100, cookies_revenue: 10, milliseconds: 1000, image: "", update_at: new Date().getTime() },
            ],
        };
        const getSelectedAccountStub = sinon.stub(accountService, 'getSelectedAccount').resolves(mockAccount);
        const updateStub = sinon.stub(accountService.accounts, 'update').resolves(1);

        await accountService.upgradeFactoryLevel(1);
        expect(getSelectedAccountStub.calledOnce).to.be.true;
        expect(updateStub.calledOnce).to.be.true;
        expect(mockAccount.factories[0].level).to.equal(2);
        expect(mockAccount.cookies).to.equal(400); // 500 - upgrade cost of 100
    });

    it('should throw an error if upgrading a factory beyond max level', async () => {
        const mockAccount: IAccount = {
            id: 1,
            username: 'user1',
            cookies: 500,
            is_active: true,
            factories: [
                { id: 1, name: 'Factory1', level: 3, max_level: 3, price: 100, cookies_revenue: 10, milliseconds: 1000, image: "", update_at: new Date().getTime() },
            ],
        };
        sinon.stub(accountService, 'getSelectedAccount').resolves(mockAccount);

        try {
            await accountService.upgradeFactoryLevel(1);
        } catch (error: any) {
            expect(error.message).to.equal('Factory has already reached its maximum level.');
        }
    });
});