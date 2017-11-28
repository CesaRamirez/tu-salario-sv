<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="description" content="Con SalarioSV podés calcular tu salario, vacaciones y aguinaldo para El Salvador 🇸🇻 de una manera fácil y rápida.">
   
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2f80ed">
    <meta name="apple-mobile-web-app-title" content="SalarioSV">
    <meta name="application-name" content="SalarioSV">
    <meta name="theme-color" content="#2f80ed">

    <meta name="google-site-verification" content="jFIi-8RxEyKuEwjMAJUqlGFNDnQ1GlMwQaGpnAcr2f8" />

    <link rel=”canonical” href=”http://salariosv.com” />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} - Calculá tu Salario, Vacación ó Aguinaldo</title>

    <!-- Styles -->
    <link href="{{ mix('css/site/app.css') }}" rel="stylesheet" type="text/css">
    @routes
</head>
<body>
    <div id="site" class="bg-blue">
        @yield('content')
    </div>

    <!-- Scripts -->
    <script src="{{ mix('js/admin/manifest.js') }}"></script>
    <script src="{{ mix('js/site/vendor.js') }}"></script>
    <script src="{{ mix('js/site/app.js') }}"></script>
</body>
</html>
