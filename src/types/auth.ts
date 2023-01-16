import { TAuthMeta } from './token';
import { TUser } from './user';

export type TAuth = {
  data: TUser;
  meta: TAuthMeta;
};

export type TAuthError = {
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
};

export type TUserResponse = {
  data: TUser;
};
