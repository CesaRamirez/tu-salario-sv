<?php

namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'bcv');

// Project repository
set('repository', 'git@github.com:cesaramirez/tu-salario-sv.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true);

// Shared files/dirs between deploys
add('shared_files', []);
add('shared_dirs', []);

// Writable dirs by web server
add('writable_dirs', []);
set('allow_anonymous_stats', false);

// Hosts

host('root@104.236.116.54')
    ->set('branch', 'master')
    ->set('deploy_path', '/var/www/salariosv.com');

// Tasks

task('build', function () {
    run('cd {{release_path}} && build');
});

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.
// before('deploy:symlink', 'artisan:migrate');

desc('Restart PHP-FPM service');
task('php-fpm:restart', function () {
    // The user must have rights for restart service
    // /etc/sudoers: username ALL=NOPASSWD:/bin/systemctl restart php-fpm.service
    run('sudo service php7.0-fpm restart');
});

// after('deploy:symlink', 'php-fpm:restart');

task('deploy', [
  'deploy:prepare',
  'deploy:lock',
  'deploy:release',
  'deploy:update_code',
  'deploy:shared',
  'deploy:vendors',
  'deploy:writable',
  'artisan:storage:link',
  'artisan:view:clear',
  'artisan:cache:clear',
  // 'artisan:config:cache',
  'artisan:optimize',
  // 'artisan:migrate',
  'deploy:symlink',
  'php-fpm:restart',
  'deploy:unlock',
  'cleanup',
]);
