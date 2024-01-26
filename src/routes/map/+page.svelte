<script lang="ts">
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';
	import ChevronDown from '$lib/components/icons/mini/chevron-down.svelte';
	import ChevronLeft from '$lib/components/icons/mini/chevron-left.svelte';
	import ChevronRight from '$lib/components/icons/mini/chevron-right.svelte';
	import Eye from '$lib/components/icons/mini/eye.svelte';
	import { MapScene, canNextWith, canPreviousWith, isStepIndexValid, steps } from '$lib/map/index';
	import { onMount } from 'svelte';

	let mapScene: MapScene;
	let canvas: HTMLCanvasElement;
	let isLoading = false;
	let progress = 0;

	let stepIndex = -1;
	$: step = isStepIndexValid(stepIndex) ? steps[stepIndex] : null;
	$: if (mapScene && step) {
		mapScene.lookAtStep(step);
	}
	$: nextStepIndex = stepIndex + 1;
	$: isNextStep = isStepIndexValid(nextStepIndex);

	let isStepOpen = false;

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

	const openStep = (): void => {
		isStepOpen = true;
	};

	const closeStep = (): void => {
		isStepOpen = false;
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
		closeStep();

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

	<div
		class="fixed top-0 left-0 w-full py-4 bg-white text-blue aria-hidden:hidden"
		aria-hidden={isStepOpen}
	>
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
		<section class="fixed bottom-0 left-0 w-full bg-white">
			<div class="container py-2">
				<span class="flex items-center justify-center h-12 col-span-2 font-text text-purple">
					<span>
						{#if stepIndex === 0}
							Départ
						{:else if stepIndex === steps.length - 1}
							Arrivée
						{:else}
							Étape {stepIndex}
						{/if}
						: {step.city}, {step.country}
					</span>
				</span>
				<nav class="flex items-center justify-center gap-2 text-center">
					<button
						disabled={!canPrevious}
						class="flex-none w-12 btn-secondary"
						on:click={() => previousStep()}
					>
						<ChevronLeft />
					</button>
					<button class="col-span-2 btn-primary" on:click={() => openStep()}>
						<span>Voir</span>
						<Eye />
					</button>
					<button
						disabled={!canNext}
						class="flex-none w-12 btn-secondary"
						on:click={() => nextStep()}
					>
						<ChevronRight />
					</button>
				</nav>
			</div>
		</section>

		{#if isStepOpen}
			<div class="fixed top-0 left-0 w-full h-full overflow-auto bg-white">
				<section class="container relative py-2">
					<nav class="mb-4">
						<button class="btn-text" on:click={() => closeStep()}>
							<span>Fermer</span>
							<ChevronDown />
						</button>
					</nav>

					<h1 class="mb-2 text-4xl font-title text-blue">
						{#if stepIndex === 0}
							Départ
						{:else if stepIndex === steps.length - 1}
							Arrivée
						{:else}
							Étape {stepIndex}
						{/if}
					</h1>
					<h2 class="mb-4 text-2xl font-text text-blue">
						{step.city}, {step.country}
					</h2>

					<div class="mb-4 space-y-2 text-blue">
						{#each step.lines as line}
							<p>{line}</p>
						{/each}
					</div>

					{#if isNextStep}
						<button class="btn-primary" on:click={() => nextStep()}>
							Étape suivante : {steps[nextStepIndex].city}
						</button>
					{:else}
						<button
							on:click={() => {
								localStorage.setItem('isXPFinished', 'true');
								goto('/room');
							}}
							class="btn-primary"
						>
							Retourner en Ukraine
						</button>
					{/if}
				</section>
			</div>
		{/if}
	{/if}
</main>
