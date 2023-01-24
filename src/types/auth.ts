import { TAuthMeta } from './token';
import { TUser } from './user';

export type TAuthError = {
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
};

export type TUserResponse = {
  data: TUser;
};

export type TMetaResponse = {
  meta: TAuthMeta;
};

export type TAuth = TUserResponse & TMetaResponse;
