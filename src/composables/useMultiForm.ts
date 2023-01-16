import { MaybeRef } from '@vueuse/core';
import { Ref } from 'nuxt/dist/app/compat/capi';
import {
  GenericValidateFunction,
  SubmissionContext,
  useForm,
} from 'vee-validate';

const useMultiForm = <T extends Record<string, any> = Record<string, any>>(
  submitAction: (
    values: T,
    actions: SubmissionContext<T>,
    commonError: Ref<string>
  ) => Promise<void> | void,
  validationSchema: MaybeRef<
    | Record<keyof T, GenericValidateFunction | string | Record<string, any>>
    | any
    | undefined
  >[]
) => {
  const commonError = ref('');
  const currentStep = ref(0);

  const currentSchema = computed(() => {
    return validationSchema[currentStep.value];
  });

  const { handleSubmit, ...formState } = useForm<T>({
    validationSchema: currentSchema,
    keepValuesOnUnmount: true,
  });

  const onSubmit = handleSubmit(async (values, actions) => {
    if (currentStep.value === validationSchema.length - 1) {
      console.log('submit');
      
      await submitAction(values, actions, commonError);
    } else {
      currentStep.value += 1;
    }
  });

  return {
    ...formState,
    onSubmit,
    commonError,
    currentStep,
  };
};

export default useMultiForm;
