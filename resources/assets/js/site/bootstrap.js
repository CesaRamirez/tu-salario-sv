import Vue from 'vue'
import lodash from 'lodash'
import axios from 'axios'
import moveTo from 'moveto'

window.Vue = Vue
window.moveTo = moveTo
window._ = lodash

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}