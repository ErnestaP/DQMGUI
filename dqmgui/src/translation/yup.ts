import * as Yup from 'yup';

export const translateValidation = () => Yup.setLocale({
  string: {
    min: ({ min }) => `Enter at least ${min} characters`,
  },
})
