<script lang="ts">
	import { isStepIndexValid, steps } from '$lib/map';
	import { goto } from '$app/navigation';

	import type { PageData } from './$types';

	export let data: PageData;

	const nextStepIndex = data.stepIndex + 1;
	$: isNextStep = isStepIndexValid(nextStepIndex);
</script>

<main class="container relative flex flex-col py-8">
	<h1 class="mb-4 text-3xl">{data.step.title}</h1>
	{#each data.step.lines as line}
		<p class="mb-2">{line}</p>
	{/each}
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
			class="p-4 text-center bg-white border disabled:bg-gray-400"
		>
			Retour à la maison
		</button>
	{/if}
</main>
