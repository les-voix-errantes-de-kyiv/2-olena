<script lang="ts">
	import { isStepIndexValid, steps } from '$lib/map';
	import type { PageData } from './$types';

	export let data: PageData;

	const nextStepIndex = data.stepIndex + 1;
	$: isNextStep = isStepIndexValid(nextStepIndex);
</script>

<main class="relative flex flex-col container py-8">
	<h1 class="text-3xl mb-4">{data.step.title}</h1>
	{#each data.step.lines as line}
		<p class="mb-2">{line}</p>
	{/each}
	{#if isNextStep}
		<a
			class="border text-center p-4 bg-white disabled:bg-gray-400"
			href={`/map?step=${nextStepIndex}`}
		>
			Étape suivante: "{steps[nextStepIndex].title}"
		</a>
	{:else}
		<a
			class="border text-center p-4 bg-white disabled:bg-gray-400"
			href={`/map?step=${data.stepIndex}`}
		>
			Retour à la carte
		</a>
	{/if}
</main>
