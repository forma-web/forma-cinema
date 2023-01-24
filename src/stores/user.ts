import { logout } from '@/services/api/auth';
import { TUser } from '@/types/user';
import { deleteJWTToken } from '@/utils/jwt';
import { currentUser } from '@/services/api/user';
import { useMoviesStore } from './movies';
import { useGenresStore } from './genres';
import { useSelectionStore } from './selections';

export const useUserStore = defineStore('userStore', () => {
  const data = ref<TUser | null>(null);
  const username = computed(() => {
    if (data.value)
      return [data.value.first_name, data.value.last_name].join(' ');
    return null;
  });
  const setUserData = (value: TUser) => {
    data.value = value;
  };
  const getUserData = async () => {
    if (!data.value) {
      const { data: userData } = (await currentUser()) ?? {};
      if (!userData) return null;
      data.value = userData.value?.data ?? null;
    }
    return data.value;
  };
  const logoutUser = async () => {
    data.value = null;
    await logout();

    deleteJWTToken();
    useMoviesStore().destroy();
    useGenresStore().destroy();
    useSelectionStore().destroy();

    await navigateTo('/login');
  };

  return { data, username, setUserData, getUserData, logoutUser };
});
