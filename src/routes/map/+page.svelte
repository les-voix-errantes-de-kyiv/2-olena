<script lang="ts">
	import { goto } from '$app/navigation';
	import { MapScene, canNextWith, canPreviousWith, isStepIndexValid, steps } from '$lib/map/index';
	import { onMount } from 'svelte';
	import Loader from '$lib/components/Loader.svelte';

	let mapScene: MapScene;
	let canvas: HTMLCanvasElement;
	let isLoading = false;
	let progress = 0;

	let stepIndex = -1;
	$: step = isStepIndexValid(stepIndex) ? steps[stepIndex] : null;
	$: if (mapScene && step) {
		mapScene.lookAtStep(step);
	}

	$: canPrevious = canPreviousWith(stepIndex);
	$: canNext = canNextWith(stepIndex);

	const lookAtStepFromUrl = (): void => {
		const urlParams = new URLSearchParams(window.location.search);

		const stepFromParams = urlParams.get('step') ?? '0';
		const dangerousStepIndex = Number.parseInt(stepFromParams) ?? 0;

		if (isStepIndexValid(dangerousStepIndex)) {
			stepIndex = dangerousStepIndex;
		}
	};

	const setUrlForStep = (stepIndex: number) => {
		const url = new URL(location.href);

		url.searchParams.set('step', stepIndex.toString());

		goto(url);
	};

	const previousStep = (): void => {
		if (!canPrevious) {
			return;
		}
		stepIndex--;
		setUrlForStep(stepIndex);
	};

	const nextStep = (): void => {
		if (!canNext) {
			return;
		}
		stepIndex++;
		setUrlForStep(stepIndex);
	};

	onMount(async () => {
		mapScene = new MapScene({ canvas });
		isLoading = true;

		await mapScene.init((currentProgress) => {
			progress = currentProgress;
		});
		isLoading = false;

		lookAtStepFromUrl();
	});
</script>

<main class="relative">
	<canvas id="three" bind:this={canvas}></canvas>
	<Loader {isLoading} {progress} />

	{#if step}
		<nav
			class="fixed grid items-center justify-center w-full grid-cols-3 gap-2 px-4 text-center bottom-2"
		>
			<button
				disabled={!canPrevious}
				class="p-4 bg-white disabled:bg-gray-400"
				on:click={previousStep}>Précédent</button
			>
			<span class="col-start-2 p-4 text-white">{stepIndex + 1} / {steps.length}</span>
			<button disabled={!canNext} class="p-4 bg-white disabled:bg-gray-400" on:click={nextStep}>
				Suivant
			</button>
			<a class="col-span-3 p-4 bg-white disabled:bg-gray-400" href={`/map/step/${stepIndex}`}>
				Voir "{step.title}"
			</a>
		</nav>
	{/if}
</main>
