import Dexie, { Table } from 'dexie';
import { IAccount } from '../interfaces';

const versionDb = 1;

class AccountService extends Dexie {
  accounts!: Table<IAccount>;

  constructor() {
    super('cookiesClickerDatabase');
    this.version(versionDb).stores({
      accounts: '++id, username, cookies, is_active, factories',
    });
  }

  async getAllAccounts() {
    return await this.accounts.toArray();
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
}

export default AccountService;
