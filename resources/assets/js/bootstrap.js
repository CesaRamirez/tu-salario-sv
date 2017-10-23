import Vue from 'vue'
import lodash from 'lodash'
import axios from 'axios'
import Vuetify from 'vuetify'
import Vue2Filters from 'vue2-filters'
import VeeValidate, { Validator } from 'vee-validate';
import es from 'vee-validate/dist/locale/es';

Validator.localize('es', es);
Vue.use(VeeValidate, {
  locale: 'es',
});

import './locale/es'

Vue.use(Vue2Filters)
Vue.use(Vuetify)

window.Vue = Vue

window._ = lodash

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
