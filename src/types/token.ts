export type TAuthMeta = {
  token: string;
  token_type: string;
  expires_in: number;
};

export type TJWTToken = {
  jwt: string;
  expiration: number;
};
