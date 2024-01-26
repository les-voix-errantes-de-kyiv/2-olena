<script lang="ts">
	import Loader from '$lib/components/Loader.svelte';
	import ArrowRight from '$lib/components/icons/mini/arrow-right.svelte';
	import Eye from '$lib/components/icons/mini/eye.svelte';
	import { RoomScene } from '$lib/room/index';
	import { onMount } from 'svelte';
</script>

<container class="">
	<header class="flex items-center w-full h-20 px-2 pt-6 bg-white text-blue">
		<h1 class="text-4xl font-title">Ce qu’on <br /> peut faire</h1>
	</header>
	<section class="container flex flex-col gap-4 mt-8 font-text text-blue">
		<h2 class="text-2xl">Invasion de l’Ukraine par la Russie</h2>
		<p>
			Pour aider les personnes comme Olena et pour ouvrir la parole autour du conflit
			Russo-Ukrainien, la meilleure chose à faire est de se renseigner. Il faut vérifier les
			informations et surtout, les diffuser.
		</p>
		<p>
			A l’échelle locale, il existe l’association <a
				class="underline font-title text-purple"
				href="https://lamaisonukrainienne.fr/"
				target="_blank">la Maison Ukrainienne</a
			> , à Mérignac, qui soutien et favorise le bon accueil en France et en Europe du peuple Ukrainien.
		</p>
	</section>

	<section class="fixed bottom-0 left-0 w-full">
		<div class="container flex flex-col justify-between w-full gap-2 py-2">
			<a class="btn-secondary" href="/map?step=0"> Revoir les étapes </a>
		</div>
	</section>
</container>
