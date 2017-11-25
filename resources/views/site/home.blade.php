@extends('site') @section('content')
<img src="{{ asset('storage/assets/svg/pattern.svg') }}" alt="" class="absolute bg-cover h-screen w-100">
<div class="h-screen">
	<header class="relative container mx-auto h-screen">
		<nav class="flex items-center justify-between pt-10">
			<div class="justify-start">
				<img src="{{ asset('storage/assets/svg/logo_white.svg') }}" alt="Logo" class="h-11 w-40">
			</div>
			<div class="justify-end">
				<ul class="list-reset flex items-center leading-loose text-xl cl-effect">
					<li class="mr-12 ">
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
			<img src="{{ asset('storage/assets/svg/isotipo.svg') }}" alt="" class="h-12 w-12 mb-4">
			<h1 class="text-white text-6xl font-medium mb-4">Calculá tu salario</h1>
			<p class="text-white lg:w-1/3 font-light text-xl roman mb-12 leading-normal">Con SalarioSV podés calcular fácilmente tu salario, vacaciones y aguinaldo.</p>
			<a href="" class="no-underline py-2 px-8 font-bold rounded-full text-white bg-blue-dark mb-12 hover:bg-white hover:text-blue-dark border-blue-dark border-2">Comenzar</a>
			<div id="scroll-down" class="mt-8 scroll">
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
	<section class="flex justify-center my-12">
		<div class="flex justify-center items-center w-3/4">
			<div class="w-3/5">
				<img src="{{ asset('storage/assets/svg/illustrations/salario.svg') }}" alt="">
			</div>
			<div class="w-2/5">
				<h3 class="text-6xl text-grey mb-6">Calculá tu Salario</h3>
				<p class="text-grey leading-normal text-lg w-3/4">Morbi porttitor sapien laoreet, convallis lectus at, ultricies neque. Sed fermentum sed augue eget accumsan. Quisque at pellentesque lectus pretiumto.</p>
			</div>
		</div>
	</section>	
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