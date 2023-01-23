import { TAuthError } from '@/types/auth';
import { Ref } from 'nuxt/dist/app/compat/capi';
import { SubmissionContext } from 'vee-validate';

const setFormErrors = <T extends Record<string, any> = Record<string, any>>(
  errorData: TAuthError,
  values: T,
  actions: SubmissionContext<T>,
  commonError: Ref<string>
) => {
  const { message, errors } = errorData.data ?? {};

  if (errors) {
    actions.setErrors(errors as any);
  } else if (message) {
    commonError.value = message;
    actions.resetForm({ values });
  } else {
    commonError.value = 'Что-то пошло не так. Попробуйте позже';
    actions.resetForm({ values });
  }
};

export default setFormErrors;
