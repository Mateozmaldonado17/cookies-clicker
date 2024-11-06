import IFactory from './factory.interface';

export type IAccountFactories = IFactory & { update_at: Date; level: number };

interface IAccount {
  id?: number;
  username: string;
  cookies: number;
  is_active: boolean;
  factories: IAccountFactories[];
}

export default IAccount;
