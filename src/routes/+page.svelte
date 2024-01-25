<script lang="ts">
	import ArrowRight from '$lib/components/icons/mini/arrow-right.svelte';
</script>

<section
	class="container flex h-full flex-col justify-between py-4 align-bottom font-text text-blue"
>
	<img class="absolute" src="/assets/images/petites_billes.svg" alt="" />

	<!-- to format section in the right way (justify between) -->
	<div></div>

	<div class="flex flex-col gap-4">
		<h1 class="font-title text-4xl">Les 3600 km <br /> d’Olena</h1>
		<h2 class="text-2xl">Une narration interactive</h2>
		<p class="text-base">
			Arrivé à Oujhorod, Olena a appelé son ami de Bordeaux pour savoir s'il allait pouvoir les
			héberger. Il lui a aussi donné l’adresse de son cousin à Budapest pour pouvoir s’y arrêter un
			moment.
		</p>
	</div>

	<a class="btn-primary" href="/room"
		>Commencer
		<ArrowRight />
	</a>
</section>
