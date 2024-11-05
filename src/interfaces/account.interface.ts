import IFactory from './factory.interface';

interface IAccount {
  id: number;
  username: string;
  cookies: number;
  is_active: number;
  factories: IFactory[];
}

export default IAccount;
