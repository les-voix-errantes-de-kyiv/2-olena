<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="relative flex flex-col container">
	<h1>Étape {data.stepIndex + 1}</h1>
	<a class="p-4 bg-white disabled:bg-gray-400" href={`/map?step=${data.stepIndex}`}>Carte</a>
</main>
