<?php


/*
 * Auth routes
 */

$router->namespace('Auth')
        ->prefix('v1')
        ->middleware('api')
        ->group(function ($router) {
            $router->post('login', 'AuthController@login')
                   ->name('login');
            $router->post('logout', 'AuthController@logout')
                   ->name('logout');
            $router->middleware('auth:api')->group(function ($router) {
                $router->get('me', 'AuthController@user')
                       ->name('me');
            });
        });

/*
 * Admin routes
 */

$router->namespace('API\V1\Admin')
       ->prefix('v1/admin')
       ->group(function ($router) {
           $router->middleware('jwt.auth')->group(function ($router) {
               $router->get('rents/{type}/type', 'RentsController@index')
                      ->name('rents.index.type');
               $router->resource('rents', 'RentsController')
                      ->only('update', 'show');
               $router->resource('settings', 'SettingsController')
                      ->only('index', 'update', 'show');
               $router->resource('bonus', 'BonusController')
                      ->only('index', 'update', 'show');
           });
       });

/*
 * Public routes
 */

$router->namespace('API\V1')
       ->prefix('v1')
       ->group(function ($router) {
           $router->post('salary', 'TransactionsController@salary')
                  ->name('salary');
           $router->post('vacation', 'TransactionsController@vacation')
                  ->name('vacation');
           $router->post('bonus', 'TransactionsController@bonus')
                  ->name('bonus');
       });
