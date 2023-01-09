import { configure } from 'vee-validate';
import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import ru from '@vee-validate/i18n/dist/locale/ru.json';
import { FIELDS_NAMES } from '@/constants/forms';

const localizeValidationForm = () => {
  Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
  });

  localize({ ru });

  const names: Record<string, string> = {};
  FIELDS_NAMES.forEach((name) => {
    names[name] = '';
  });

  configure({
    generateMessage: localize('ru', {
      names,
    }),
  });

  setLocale('ru');
};

export default localizeValidationForm;
