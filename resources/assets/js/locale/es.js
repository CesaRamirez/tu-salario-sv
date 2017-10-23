import { Validator } from 'vee-validate';
const dictionary = {
  es: {
    attributes: {
      days: 'días',
      start: 'inicio',
      end: 'fin',
    }
  }
};

Validator.updateDictionary(dictionary);
