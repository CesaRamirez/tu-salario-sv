<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="shortcut icon" href="favicon.ico">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ mix('css/admin/app.css') }}" rel="stylesheet" type="text/css">
    @routes
</head>
<body>
    <div id="app">
        <app></app>
    </div>
    <!-- Scripts -->
    <script src="{{ mix('js/site/manifest.js') }}"></script>
    <script src="{{ mix('js/site/vendor.js') }}"></script>
    <script src="{{ mix('js/admin/app.js') }}"></script>
    
    @yield('javascript')
</body>
</html>
