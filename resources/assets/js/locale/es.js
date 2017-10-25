import {
  Validator
} from 'vee-validate';
const dictionary = {
  es: {
    attributes: {
      days: 'días',
      start: 'inicio',
      end: 'fin',
      key: 'llave',
      description: 'descripción',
      value: 'valor',
    }
  }
};

Validator.updateDictionary(dictionary);
