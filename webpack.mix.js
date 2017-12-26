let mix = require("laravel-mix");
var tailwindcss = require("tailwindcss");
require("dotenv").config();

mix
  .js("resources/assets/js/admin/app.js", "public/js/admin/")
  .js("resources/assets/js/site/app.js", "public/js/site/")
  .extract([
    "vue",
    "axios",
    "vuetify",
    "vue-router",
    "vee-validate",
    "lodash",
    "collect.js",
    "animejs"
  ])
  .sass("resources/assets/sass/site/app.scss", "public/css/site/")
  .sass("resources/assets/sass/admin/app.scss", "public/css/admin/")
  .options({
    processCssUrls: false,
    postCss: [tailwindcss("tailwind.config.js")]
  });

if (mix.inProduction()) {
  mix.version().options({
    purifyCss: true
  });
}

mix.browserSync(process.env.APP_URL);
