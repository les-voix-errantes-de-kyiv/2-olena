<script lang="ts">
	import { Button } from '../lib/components/buttons/Button';
</script>

<section class="flex flex-col justify-between h-full align-bottom text-blue font-text">
	<img class="absolute" src="/assets/images/petites_billes.svg" alt="" />

	<!-- to format section in the right way (justify between) -->
	<div></div>

	<div class="flex flex-col gap-4">
		<h1 class="text-4xl font-title">Les 3600 km <br /> d’Olena</h1>
		<h2 class="text-2xl">Une narration interactive</h2>
		<p class="text-base">
			Arrivé à Oujhorod, Olena a appelé son ami de Bordeaux pour savoir s'il allait pouvoir les
			héberger. Il lui a aussi donné l’adresse de son cousin à Budapest pour pouvoir s’y arrêter un
			moment.
		</p>
	</div>

	<Button url="/rooms">Commencer</Button>
</section>
