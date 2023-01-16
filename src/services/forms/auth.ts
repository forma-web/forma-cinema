import { login, register } from '@/services/api/auth';
import { Ref } from 'nuxt/dist/app/compat/capi';
import { SubmissionContext } from 'vee-validate';
import { setJWTToken } from '@/helpers/jwt';
import setFormErrors from '@/helpers/formErrors';
import { TAuth, TAuthError } from '@/types/auth';
import { AsyncData } from 'nuxt/dist/app/composables';
import { useUserStore } from '@/stores/user';

const onAuth =
  <T extends Record<string, any> = Record<string, any>>(
    fetchFunc: (body: T) => AsyncData<TAuth, TAuthError | null>
  ) =>
  async (
    values: T,
    actions: SubmissionContext<T>,
    commonError: Ref<string>
  ) => {
    const { data, error } = await fetchFunc(values);

    if (data.value) {
      commonError.value = '';
      const { data: userData, meta } = data.value;
      const store = useUserStore();
      store.setUserData(userData);
      
      setJWTToken(meta);
      await navigateTo('/');
    } else if (error.value) {
      setFormErrors(error.value, values, actions, commonError);
    }
  };

export const onLogin = onAuth<TLogin>(login);
export const onRegister = onAuth<TRegister>(register);

export default onAuth;
