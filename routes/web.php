<?php

$router->view('/', 'site.home');

$router->get('/admin/{vue_capture?}', function () {
    return view('app');
})->where('vue_capture', '[\/\w\.-]*');
