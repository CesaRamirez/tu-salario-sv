let mix = require('laravel-mix');
require('dotenv').config();

mix.js('resources/assets/js/admin/app.js', 'public/js/admin/')
.extract(['vue', 'axios', 'vuetify', 'vue-router', 'vee-validate', 'lodash', 'collect.js'], 'js/admin/vendor.js')
.sass('resources/assets/sass/admin/app.scss', 'public/css/admin/');
