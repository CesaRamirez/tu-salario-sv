<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    /**
     * Show home site.
     */
    public function index()
    {
        return view('site.home');
    }
}
