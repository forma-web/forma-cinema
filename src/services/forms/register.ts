import { Ref } from 'nuxt/dist/app/compat/capi';
import { SubmissionContext } from 'vee-validate';

const onRegister = async (
  values: TRegister,
  actions: SubmissionContext<TRegister>,
  commonError: Ref<string>
) => {
  console.log(values);
};

export default onRegister;
