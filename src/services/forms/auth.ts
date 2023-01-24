import { login, register } from '@/services/api/auth';
import { Ref } from 'nuxt/dist/app/compat/capi';
import { SubmissionContext } from 'vee-validate';
import { setJWTToken } from '@/utils/jwt';
import setFormErrors from '@/utils/formErrors';
import { TAuth, TAuthError } from '@/types/auth';
import { useUserStore } from '@/stores/user';
import { _AsyncData } from 'nuxt/dist/app/composables/asyncData';

const onAuth =
  <T extends Record<string, any> = Record<string, any>>(
    fetchFunc: (body: T) => Promise<_AsyncData<TAuth, TAuthError | null> | null>
  ) =>
  async (
    values: T,
    actions: SubmissionContext<T>,
    commonError: Ref<string>
  ) => {
    const { data, error } = (await fetchFunc(values)) ?? {};

    if (data && data.value) {
      commonError.value = '';
      const { data: userData, meta } = data.value;
      const store = useUserStore();
      store.setUserData(userData);

      setJWTToken(meta);
      await navigateTo('/');
    } else if (error && error.value) {
      setFormErrors(error.value, values, actions, commonError);
    }
  };

export const onLogin = onAuth<TLogin>(login);
export const onRegister = onAuth<TRegister>(register);

export default onAuth;
