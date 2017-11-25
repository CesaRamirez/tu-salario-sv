<?php

$router->namespace('Site')->group(function ($router) {
    $router->get('/', 'HomeController@index')->name('site.home');
});

$router->get('/admin/{vue_capture?}', function () {
    return view('app');
})->where('vue_capture', '[\/\w\.-]*');
