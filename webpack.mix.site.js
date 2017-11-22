let mix = require('laravel-mix');
var tailwindcss = require('tailwindcss');
require('dotenv').config();

  mix.js('resources/assets/js/site/app.js', 'public/js/site/')
    .extract(['vue', 'axios', 'lodash'], 'js/site/vendor.js')
    .sass('resources/assets/sass/site/app.scss', 'public/css/site/')
    .options({
      processCssUrls: false,
      postCss: [tailwindcss('tailwind.config.js')]
    });
