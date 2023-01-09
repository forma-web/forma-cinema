import { login } from '@/services/api/auth';
import { Ref } from 'nuxt/dist/app/compat/capi';
import { SubmissionContext } from 'vee-validate';

const onLogin = async (
  values: TLogin,
  actions: SubmissionContext<TLogin>,
  commonError: Ref<string>
) => {
  const { data, error } = await login(values);

  if (data.value) {
    commonError.value = '';
    console.log(data.value);
  } else if (error.value) {
    const { message, errors } = error.value.data ?? {};
    console.log(error.value);
    if (errors) {
      actions.setErrors(errors);
    } else if (message) {
      commonError.value = message;
      actions.resetForm({ values });
    } else {
      commonError.value = 'Что-то пошло не так. Попробуйте позже';
      actions.resetForm({ values });
    }
  }
};

export default onLogin;
