<?php


/*
 * Auth routes
 */

$router->namespace('Auth')
        ->prefix('v1')
        ->group(function ($router) {
            $router->post('login', 'AuthController@login')->name('login');
            $router->middleware('jwt.auth')->group(function ($router) {
                $router->get('me', 'AuthController@user')->name('me');
            });
        });

/*
 * Admin routes
 */

$router->namespace('API\V1\Admin')
       ->prefix('v1/admin')
       ->group(function ($router) {
           $router->middleware('jwt.auth')->group(function ($router) {
               $router->resource('rents', 'RentsController');
               $router->resource('settings', 'SettingsController');
           });
       });
