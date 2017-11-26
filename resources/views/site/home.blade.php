@extends('site') @section('content')
<img src="{{ asset('storage/assets/svg/pattern.svg') }}" alt="" class="absolute bg-cover h-screen w-100" style="object-fit: cover">
<div class="h-screen">
	<header class="relative container mx-auto h-screen">
		<nav class="flex items-center lg:justify-between justify-center pt-10">
			<div class="">
				<img src="{{ asset('storage/assets/svg/logo_white.svg') }}" alt="Logo" class="h-11 w-40">
			</div>
			<div class="justify-end hidden lg:inline">
				<ul class="list-reset flex items-center leading-loose text-lg cl-effect">
					<li class="mr-12">
                        <a href="" class="no-underline text-white border-b-3">Salario</a>
                    </li>
					<li class="mr-12">
                        <a href="" class="no-underline text-white">Vacaciones</a>
                    </li>
					<li>
                        <a href="#" class="no-underline text-white">Aguinaldo</a>
                    </li>
				</ul>
			</div>
		</nav>
		<div class="flex justify-center items-center flex-col h-full text-center">
			<img src="{{ asset('storage/assets/svg/isotipo.svg') }}" alt="" class="h-12 w-12 mb-4 hidden lg:inline">
			<h1 class="text-white lg:text-6xl text-4xl font-medium mb-4">Calculá tu salario</h1>
			<p class="text-white lg:w-1/3 font-light lg:text-xl roman mb-12 leading-normal">Con SalarioSV podés calcular fácilmente tu salario, vacaciones y aguinaldo.</p>
			{{--  <a href="" class="no-underline py-2 px-8 font-bold rounded-full text-white bg-blue-dark mb-12 hover:bg-white hover:text-blue-dark border-blue-dark border-2">Comenzar</a>  --}}
			<div id="scroll-down" class="mt-8  scroll">
				<a href="#calculate" class="js-trigger">
					<span></span>Scroll</a>
			</div>
		</div>
	</header>
	<section class="bg-white py-8 flex flex-col items-center justify-center text-center my-8"
	 id="calculate">
		<h4 class="text-3xl text-grey-dark mb-6">Comenzá a calcular tu</h4>
		<div class="flex lg:flex-row md:flex-row flex-col justify-around w-3/4">
			<div class="border rounded shadow-1 hvr-underline-from-left py-4">
				<a href="#" class="no-underline">
					<img src="{{ asset('storage/assets/svg/icons/ic_salario.svg') }}" alt="" class="w-3/4 -mb-6">
				</a>
                <h4 class="text-2xl font-normal text-blue">Salario</h4>
			</div>
			<div class="border rounded shadow-1 hvr-underline-from-center py-4">
				<a href="#">
					<img src="{{ asset('storage/assets/svg/icons/ic_vacaciones.svg') }}" alt="" class="w-3/4 -mb-6">
				</a>
                <h4 class="text-2xl font-normal text-blue">Vacación</h4>
			</div>
			<div class="border rounded shadow-1 hvr-underline-from-right py-4">
				<a href="#">
					<img src="{{ asset('storage/assets/svg/icons/ic_aguinaldo.svg') }}" alt="" class="w-3/4 -mb-6">
				</a>
                <h4 class="text-2xl font-normal text-blue">Aguinaldo</h4>
			</div>
		</div>
	</section>
	<section class="flex flex-col lg:flex-row flex-wrap justify-center mt-20">
		<div class="flex flex-col lg:flex-row justify-center items-center lg:w-3/4 lg:mb-20 mb-10 mx-8">
			<div class="lg:w-3/5 hidden lg:inline">
				<img src="{{ asset('storage/assets/svg/illustrations/salario.svg') }}" alt="">
			</div>
			<div class="lg:w-2/5">
				<h3 class="lg:text-6xl text-4xl text-grey mb-6">Calculá tu Salario</h3>
				<p class="text-grey leading-normal text-lg lg:w-5/6 mb-8">Morbi porttitor sapien laoreet, convallis lectus at, ultricies neque. Sed fermentum sed augue eget accumsan. Quisque at pellentesque lectus pretiumto.</p>
				<a href="" class="no-underline py-2 px-12 font-bold rounded-full text-blue-dark bg-transparent mb-12 hover:bg-blue-dark hover:text-white border-blue-dark border-2 lg:inline-block block text-center">Leer más</a>
			</div>
		</div>
		<div class="flex flex-col lg:flex-row justify-center items-center lg:w-3/4 lg:mb-20 mb-10 mx-8">
			<div class="lg:w-2/5 lg:text-right lg:mr-10">
				<h3 class="lg:text-6xl text-4xl text-grey mb-6">Calculá tu Vacaciones</h3>
				<p class="text-grey leading-normal text-lg mb-8">Morbi porttitor sapien laoreet, convallis lectus at, ultricies neque. Sed fermentum sed augue eget accumsan. Quisque at pellentesque lectus pretiumto.</p>
				<a href="" class="no-underline py-2 px-12 font-bold rounded-full text-blue-dark bg-transparent mb-12 hover:bg-blue-dark hover:text-white border-blue-dark border-2 lg:inline-block block text-center">Leer más</a>
			</div>
			<div class="lg:w-3/5 hidden lg:inline">
				<img src="{{ asset('storage/assets/svg/illustrations/vacaciones.svg') }}" alt="">
			</div>
		</div>
		<div class="flex justify-center items-center lg:w-3/4 lg:mb-20 mb-10 mx-8">
			<div class="lg:w-3/5 hidden lg:inline">
				<img src="{{ asset('storage/assets/svg/illustrations/aguinaldo.svg') }}" alt="">
			</div>
			<div class="lg:w-2/5">
				<h3 class="lg:text-6xl text-4xl text-grey mb-6">Calculá tu Aguinaldo</h3>
				<p class="text-grey leading-normal text-lg lg:w-5/6 mb-8">Morbi porttitor sapien laoreet, convallis lectus at, ultricies neque. Sed fermentum sed augue eget accumsan. Quisque at pellentesque lectus pretiumto.</p>
				<a href="" class="no-underline py-2 px-12 font-bold rounded-full text-blue-dark bg-transparent mb-12 hover:bg-blue-dark hover:text-white border-blue-dark border-2 lg:inline-block block text-center">Leer más</a>
			</div>
		</div>
	</section>
	<footer class="bg-blue py-10 flex justify-center relative">
		<div class="flex lg:flex-row flex-col lg:w-3/4 items-center justify-center mx-8">
			<div class="lg:w-1/3 mb-6">
				<p class="text-white font-weight-normal leading-normal hidden lg:inline">Este sitio web está diseñado y construido <br> por salvadoreños, para salvadoreños. 
					<br>Por <a href="" class="no-underline text-teal-light">César</a> & <a href="" class="no-underline text-teal-light">Kathe</a>
				</p>
				<p class="text-white font-weight-normal leading-normal lg:hidden inline">
				Este sitio web está diseñado y construido por salvadoreños, para salvadoreños. Por <a href="" class="no-underline text-teal-light">César</a> & <a href="" class="no-underline text-teal-light">Kathe</a>
				</p>
			</div>
			<div class="lg:w-1/3 text-center mb-6">
				<img src="{{ asset('storage/assets/svg/logo_white.svg') }}" alt="Logo" class="h-11 w-40">
			</div>
			<div class="lg:w-1/3 flex justify-end">
				<a href="" class="no-underline">
					<img src="{{ asset('storage/assets/svg/icons/ic_facebook.svg') }}" alt="Logo Facebook" class="h-8 w-12">
				</a>
				<a href="" class="no-underline">
					<img src="{{ asset('storage/assets/svg/icons/ic_twitter.svg') }}" alt="Logo Twitter" class="h-8 w-12">
				</a>
			</div>
		</div>
		<a href="#" class="float flex justify-center items-center">
			<img src="{{ asset('storage/assets/svg/icons/ic_arrow.svg') }}" alt="Logo Twitter" class="h-4 w-8">
		</a>
	</footer>	
</div>
@endsection @section('javascript')
<script>
	new MoveTo({
        tolerance: 0,
        duration: 8000,
        easing: 'easeOutQuart'
    });
</script>
@endsection