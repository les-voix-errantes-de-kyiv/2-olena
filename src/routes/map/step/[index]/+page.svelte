<script lang="ts">
	import ChevronRight from '$lib/components/icons/mini/chevron-right.svelte';
	import { isStepIndexValid, steps } from '$lib/map';
	import { goto } from '$app/navigation';

	import type { PageData } from './$types';

	export let data: PageData;

	const nextStepIndex = data.stepIndex + 1;
	$: isNextStep = isStepIndexValid(nextStepIndex);
</script>

<main class="container relative flex flex-col py-8">
	<nav class="flex items-center gap-1 mb-4 flex-nowrap font-title text-purple">
		<a href="/" class="underline">Accueil</a>
		<ChevronRight />
		<a href="/map" class="underline">Le périple</a>
		<ChevronRight />
		<span>Étape {data.stepIndex + 1}</span>
	</nav>

	<h1 class="mb-4 text-4xl text-blue font-title">{data.step.title}</h1>

	<div class="mb-4 space-y-2 text-blue">
		{#each data.step.lines as line}
			<p>{line}</p>
		{/each}
	</div>

	{#if isNextStep}
		<a
			class="p-4 text-center bg-white border disabled:bg-gray-400"
			href={`/map?step=${nextStepIndex}`}
		>
			Étape suivante: "{steps[nextStepIndex].title}"
		</a>
	{:else}
		<button
			on:click={() => {
				localStorage.setItem('isXPFinished', 'true');
				goto('/rooms');
			}}
			class="px-4 py-2 text-center text-white border-2 col-span-full bg-purple border-purple"
		>
			Retour à la maison
		</button>
	{/if}
</main>
