<script lang="ts">
	import ArrowRight from '$lib/components/icons/mini/arrow-right.svelte';
	import Eye from '$lib/components/icons/mini/eye.svelte';
	import { RoomScene } from '$lib/rooms/index';
	import { onMount } from 'svelte';
	import Loader from '$lib/components/Loader.svelte';

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
	<header class="absolute top-0 flex h-16 w-full items-center bg-white px-4 text-blue">
		<h1 class="font-title text-4xl">Chez Olena</h1>
	</header>

	<section class="fixed bottom-0 left-0 w-full">
		<div class="container flex w-full flex-col justify-between gap-2 py-2">
			{#if isXPFinished}
				<a class="btn-secondary" href="/map">
					Retourner au périple <ArrowRight />
				</a>
				{#if isShowingBefore}
					<button class="btn-primary" on:click={() => showAfterRoom()}>
						Voir après
						<Eye />
					</button>
				{:else}
					<button class="btn-primary" on:click={() => showBeforeRoom()}>
						Voir avant
						<Eye />
					</button>
				{/if}
			{:else}
				<a class="btn-primary" href="/map">Commencer le périple <ArrowRight /> </a>
			{/if}
		</div>
	</section>

	<Loader {isLoading} {progress} />

	<canvas id="three-before" bind:this={canvas}></canvas>
</container>
