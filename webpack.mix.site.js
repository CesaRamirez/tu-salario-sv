let mix = require('laravel-mix');
require('dotenv').config();

  mix.js('resources/assets/js/site/app.js', 'public/js/site/')
  .extract(['vue', 'axios', 'lodash'], 'js/site/vendor.js')
  .sass('resources/assets/sass/site/app.scss', 'public/css/site/');
