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
	<header class="text-blue absolute top-0 flex h-16 w-full items-center bg-white px-4">
		<h1 class="font-title text-4xl">Chez Olena</h1>
	</header>

	<section class="fixed bottom-0 left-0 w-full">
		<div class="container flex w-full flex-col justify-between gap-2 py-2">
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
				<a class="btn-primary" href="/actions">
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
