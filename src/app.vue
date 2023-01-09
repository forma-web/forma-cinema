<script setup lang="ts">
import { configure } from 'vee-validate';
import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import ru from '@vee-validate/i18n/dist/locale/ru.json';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

localize({ ru });

configure({
  generateMessage: localize('ru', {
    names: {
      email: '',
      password: '',
      first_name: '',
    },
  }),
});

setLocale('ru');
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

