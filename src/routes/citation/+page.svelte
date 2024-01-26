<script lang="ts">
	import Loader from '$lib/components/Loader.svelte';
	import ArrowRight from '$lib/components/icons/mini/arrow-right.svelte';
	import Eye from '$lib/components/icons/mini/eye.svelte';
	import { RoomScene } from '$lib/room/index';
	import { onMount } from 'svelte';
</script>

<container class="">
	<header class="absolute top-0 flex items-center w-full h-16 px-2 bg-white text-blue">
		<h1 class="text-4xl font-title">24 février 2022</h1>
	</header>
	<section class="container flex flex-col gap-4 mt-20 font-text text-blue">
		<h2 class="text-2xl">Invasion de l’Ukraine par la Russie</h2>
		<p>
			“[Le trajet] est lourd, mais quand vous devez faire quelque chose très vite, il n’y a pas le
			temps pour réfléchir.” - Olena
		</p>
		<img
			class="absolute w-1/2 mb-4 -rotate-[150deg] right-6 bottom-24"
			src="/assets/images/petites_billes.svg"
			alt=""
		/>
	</section>

	<section class="fixed bottom-0 left-0 w-full">
		<div class="container flex flex-col justify-between w-full gap-2 py-2">
			<a class="btn-secondary" href="/map?step=0">
				Fuir le pays <ArrowRight />
			</a>
		</div>
	</section>
</container>
