let mix = require('laravel-mix');
var tailwindcss = require('tailwindcss');
require('dotenv').config();

mix.js('resources/assets/js/site/app.js', 'public/js/site/')  
  .sass('resources/assets/sass/site/app.scss', 'public/css/site/')
  .options({
    processCssUrls: false,
    postCss: [tailwindcss('tailwind.config.js')]
  });

mix.js('resources/assets/js/admin/app.js', 'public/js/admin/')
  .extract(['vue', 'axios', 'vuetify', 'vue-router', 'vee-validate', 'lodash', 'collect.js'], 'js/admin/vendor.js')
  .extract(['vue', 'axios', 'lodash', 'animejs'], 'js/site/vendor.js')
  .sass('resources/assets/sass/admin/app.scss', 'public/css/admin/');

if (mix.inProduction()) {
  mix.version()
    .options({
      purifyCss: false
    });
}

mix.browserSync(process.env.APP_URL);
