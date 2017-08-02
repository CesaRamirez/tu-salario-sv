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
               $router->resource('rents', 'RentsController',
                                 ['except' => ['create', 'store', 'edit',   'destroy']]);
               $router->resource('settings', 'SettingsController',
                                 ['except' => ['create', 'edit', 'destroy']]);
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
       });
