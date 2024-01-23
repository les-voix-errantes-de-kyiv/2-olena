<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		canNextWith,
		canPreviousWith,
		createMapScene,
		isStepIndexValid,
		lookAtStep,
		steps
	} from '$lib/map/index';
	import { onMount } from 'svelte';
	import type { OrbitControls } from 'three/examples/jsm/Addons.js';

	let controls: OrbitControls;
	let canvas: HTMLCanvasElement;

	let stepIndex = 0;
	$: step = steps[stepIndex];
	$: if (controls) {
		lookAtStep(controls, step);
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
		const mapScene = await createMapScene(canvas);
		controls = mapScene.controls;

		lookAtStepFromUrl();
	});
</script>

<main class="relative">
	<canvas id="three" bind:this={canvas}></canvas>

	<nav
		class="fixed bottom-2 w-full grid grid-cols-3 gap-2 px-4 items-center justify-center text-center"
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
		<a class="p-4 col-span-3 bg-white disabled:bg-gray-400" href={`/map/step/${stepIndex}`}>
			Voir "{step.title}"
		</a>
	</nav>
</main>
