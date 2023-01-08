import { TAuthMeta } from './token';
import { TUser } from './user';

export type TAuth = {
  data: TUser;
  meta: TAuthMeta;
};
