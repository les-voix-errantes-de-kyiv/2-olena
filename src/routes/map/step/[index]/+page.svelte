<script lang="ts">
	import ChevronRight from '$lib/components/icons/mini/chevron-right.svelte';
	import { isStepIndexValid, steps } from '$lib/map';
	import type { PageData } from './$types';

	export let data: PageData;

	const nextStepIndex = data.stepIndex + 1;
	$: isNextStep = isStepIndexValid(nextStepIndex);
</script>

<main class="relative flex flex-col container py-8">
	<nav class="mb-4 flex gap-1 flex-nowrap items-center font-title text-purple">
		<a href="/" class="underline">Accueil</a>
		<ChevronRight />
		<a href="/map" class="underline">Le périple</a>
		<ChevronRight />
		<span>Étape {data.stepIndex + 1}</span>
	</nav>

	<h1 class="text-4xl text-blue font-title mb-4">{data.step.title}</h1>

	<div class="mb-4 space-y-2 text-blue">
		{#each data.step.lines as line}
			<p>{line}</p>
		{/each}
	</div>

	{#if isNextStep}
		<a
			class="px-4 py-2 col-span-full bg-purple border-2 border-purple text-white text-center"
			href={`/map?step=${nextStepIndex}`}
		>
			Étape suivante: "{steps[nextStepIndex].title}"
		</a>
	{:else}
		<a
			class="px-4 py-2 col-span-full bg-purple border-2 border-purple text-white text-center"
			href={`/map?step=${data.stepIndex}`}
		>
			Retour à la carte
		</a>
	{/if}
</main>
