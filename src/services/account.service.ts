import Dexie, { Table } from 'dexie';
import { IAccount, IFactory } from '../interfaces';
import 'dexie-observable';
import { Observable } from 'rxjs';

const versionDb = 1;

class AccountService extends Dexie {
  accounts!: Table<IAccount>;

  constructor() {
    super('cookiesClickerDatabase');
    this.version(versionDb).stores({
      accounts: '++id, username, cookies, is_active, factories',
    });
  }

  async getAllAccounts(): Promise<IAccount[]> {
    return await this.accounts.toArray();
  }

  async getSelectedAccount(): Promise<IAccount | undefined> {
    return await this.accounts.filter((account) => account.is_active).first();
  }

  async addNewCookieToSelectedAccount(): Promise<void> {
    const selectedAccount = await this.getSelectedAccount();
    if (selectedAccount) {
      const id = selectedAccount.id;
      const cookies = selectedAccount.cookies + 1;
      await this.accounts.update(id, { cookies });
    }
  }

  public async activateAccountByUsername(username: string) {
    const accounts = await this.getAllAccounts();

    const updatedAccounts = accounts
      .map((account: IAccount) => {
        const isAccountToActivate = account.username === username;
        const shouldDeactivate = account.is_active && !isAccountToActivate;

        if (shouldDeactivate) {
          return { ...account, is_active: false };
        }

        if (isAccountToActivate && !account.is_active) {
          return { ...account, is_active: true };
        }

        return null;
      })
      .filter((account) => account !== null) as IAccount[];

    await Promise.all(
      updatedAccounts.map((account) => this.accounts.put(account)),
    );
  }
  async getAccountByUsername(username: string): Promise<IAccount | undefined> {
    return await this.accounts.where('username').equals(username).first();
  }

  async createNew(
    attributes: Pick<IAccount, 'username'>,
  ): Promise<IAccount | never> {
    const { username } = attributes;
    if (!username) throw new Error(`username should not be empty`);
    const userExist = await this.getAccountByUsername(username);
    if (userExist) throw new Error(`${username} already exists`);
    return await this.accounts.add({
      username,
      cookies: 0,
      is_active: false,
      factories: [],
    });
  }

  async addSelectedFactoryToCurrentAccount(factory: IFactory): Promise<void> {
    const currentDate = new Date();
    const selectedAccount = await this.getSelectedAccount();
    if (selectedAccount) {
      const currentCookies = selectedAccount?.cookies;
      const factoryCost = factory.price;
      if (currentCookies < factoryCost)
        throw new Error("you don't have cookies enough");
      const id = selectedAccount.id;
      const newFactories = [
        ...selectedAccount.factories,
        {
          ...factory,
          id: selectedAccount.factories.length + 1,
          update_at: currentDate.getTime(),
          level: 1,
        },
      ];
      await this.accounts.update(id, {
        factories: newFactories,
        cookies: currentCookies - factoryCost,
      });
    }
  }

  public watchAccounts(): Observable<IAccount[]> {
    return new Observable((observer) => {
      const emitAccounts = async () => {
        const accounts = await this.getAllAccounts();
        observer.next(accounts);
      };
      emitAccounts();
      this.on('changes', emitAccounts);
      return () => this.on('changes').unsubscribe(emitAccounts);
    });
  }
}

export default AccountService;
