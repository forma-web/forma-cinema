import { TUser } from '../types/user';

export const useUser = () => useState<TUser | null>('user', () => null);
