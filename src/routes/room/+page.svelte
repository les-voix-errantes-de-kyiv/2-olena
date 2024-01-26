<script lang="ts">
	import Loader from '$lib/components/Loader.svelte';
	import ArrowRight from '$lib/components/icons/mini/arrow-right.svelte';
	import Eye from '$lib/components/icons/mini/eye.svelte';
	import { RoomScene } from '$lib/room/index';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let roomScene: RoomScene;

	const isXPFinished = localStorage.getItem('isXPFinished') === 'true';
	let isShowingBefore = false;
	let isLoading = false;
	let progress = 0;

	const showAfterRoom = () => {
		isShowingBefore = false;
		roomScene.showAfterRoom();
	};
	const showBeforeRoom = () => {
		isShowingBefore = true;
		roomScene.showBeforeRoom();
	};

	onMount(async () => {
		roomScene = new RoomScene({ canvas });
		isLoading = true;
		await roomScene.init((currentProgress) => {
			progress = currentProgress;
		});
		isLoading = false;

		if (isXPFinished) {
			showAfterRoom();
		} else {
			showBeforeRoom();
		}
	});
</script>

<container class="">
	<header class="absolute top-0 flex items-center w-full h-16 px-4 bg-white text-blue">
		<h1 class="text-4xl font-title">Chez Olena</h1>
	</header>

	<section class="fixed bottom-0 left-0 w-full">
		<div class="container flex flex-col justify-between w-full gap-2 py-2">
			{#if isXPFinished}
				{#if isShowingBefore}
					<button class="btn-secondary" on:click={() => showAfterRoom()}>
						Voir après la guerre
						<Eye />
					</button>
				{:else}
					<button class="btn-secondary" on:click={() => showBeforeRoom()}>
						Voir avant la guerre
						<Eye />
					</button>
				{/if}
				<a class="btn-primary" href="/map?step=6">
					Continuer <ArrowRight />
				</a>
			{:else}
				<a class="btn-primary" href="/citation">Continuer <ArrowRight /> </a>
			{/if}
		</div>
	</section>

	<Loader {isLoading} {progress} />

	<canvas id="three-before" bind:this={canvas}></canvas>
</container>
