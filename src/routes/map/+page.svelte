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

	<div class="fixed top-0 left-0 w-full py-4 bg-white text-blue">
		<header class="container">
			<h1 class="text-4xl font-title">Le périple</h1>
		</header>
	</div>

	<div class="fixed top-0 left-0 w-full py-4 bg-white text-blue">
		<header class="container">
			<h1 class="text-4xl font-title">Le périple</h1>
		</header>
	</div>

	{#if step}
		<div class="fixed bottom-0 left-0 w-full py-2">
			<nav class="container grid items-center justify-center grid-cols-2 gap-2 text-center">

				<button disabled={!canPrevious} class="btn-secondary" on:click={previousStep}
					>Précédent</button
				>
				<button disabled={!canNext} class="btn-secondary" on:click={nextStep}> Suivant </button>

				<a class="btn-primary col-span-2" href={`/map/step/${stepIndex}`}>
					Voir "{step.title}"
				</a>
			</nav>
		</div>
	{/if}
</main>
