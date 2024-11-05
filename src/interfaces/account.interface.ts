import IFactory from './factory.interface';

export type IAccountFactories = IFactory & { update_at: Date, level: number }

interface IAccount {
  id: number;
  username: string;
  cookies: number;
  is_active: number;
  factories: IAccountFactories[];
}

export default IAccount;
