@extends('site')

@section('content')
<img src="{{ asset('storage/assets/svg/pattern.svg') }}" alt="" class="absolute bg-cover h-screen w-100">
<div class="h-screen">
    <header class="relative container mx-auto h-screen">
        <nav class="flex items-center justify-between pt-10">
            <div class="justify-start">
                <img src="{{ asset('storage/assets/svg/logo_white.svg') }}" alt="Logo" class="h-11 w-40">
            </div>
            <div class="justify-end">
                <ul class="list-reset flex items-center text-white leading-loose text-base">
                    <li class="mr-12 border-b-3">Salario</li>
                    <li class="mr-12">Vacaciones</li>
                    <li>Aguinaldo</li>
                </ul>
            </div>
        </nav>
        <div class="flex justify-center items-center flex-col h-full text-center">
            <img src="{{ asset('storage/assets/svg/isotipo.svg') }}" alt="" class="h-12 w-12 mb-4">
            <h1 class="text-white text-6xl font-medium mb-4">Calculá tu salario</h1>
            <p class="text-white w-1/3 font-light text-xl roman mb-12 leading-normal">Con SalarioSV podés calcular fácilmente tu salario, vacaciones y aguinaldo.</p>
            <a href="" class="no-underline py-2 px-8 font-bold rounded-full text-white bg-blue-dark mb-12 hover:bg-white hover:text-blue-dark border-blue-dark border-2">Comenzar</a>
            <div id="section10" class="mt-8 scroll">
                <a href="#calculate" class="js-trigger"><span></span>Scroll</a>
            </div>
        </div>
    </header>
    <section class="bg-white h-64 flex items-center justify-center" id="calculate">
        Hola
    </section>
    <section class="bg-white h-64 flex items-center justify-center">
        Hola
    </section>
    <section class="bg-white h-64 flex items-center justify-center">
        Hola
    </section>
    <section class="bg-white h-64 flex items-center justify-center">
        Hola
    </section>
    <section class="bg-white h-64 flex items-center justify-center">
        Hola
    </section>
    <section class="bg-white h-64 flex items-center justify-center">
        Hola
    </section>
    <section class="bg-white h-64 flex items-center justify-center">
        Hola
    </section>
</div>
@endsection

@section('javascript')
<script>
    new MoveTo({
        tolerance: 0,
        duration: 8000,
        easing: 'easeOutQuart'
    });
</script>
@endsection
