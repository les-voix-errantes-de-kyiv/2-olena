<script lang="ts">
	import ArrowRight from '$lib/components/icons/mini/arrow-right.svelte';
	import Eye from '$lib/components/icons/mini/eye.svelte';
	import { RoomScene } from '$lib/rooms/index';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let roomScene: RoomScene;

	const isXPFinished = localStorage.getItem('isXPFinished') === 'true';
	let isShowingBefore = false;
	let isLoading = false;

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
		await roomScene.init();
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
	{#if isLoading === true}
		<div class="absolute inset-0 flex items-center justify-center w-full h-full bg-white">
			<div class="flex flex-col items-center justify-center">
				<h2 class="text-xl font-text text-blue">Chargement...</h2>
				<div class="relative w-8 h-8 border-4 rounded-full animate-spin border-purple">
					<div
						class="absolute top-[50%] left-[50%] z-50 w-5 h-1 border-4 border-white rounded-full"
					></div>
				</div>
			</div>
		</div>
	{/if}

	<canvas id="three-before" bind:this={canvas}></canvas>
</container>
