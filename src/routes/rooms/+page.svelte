<script lang="ts">
	import { RoomScene } from '$lib/rooms/index';
	import { onMount } from 'svelte';
	import ArrowRight from '$lib/components/icons/mini/arrow-right.svelte';

	let canvas: HTMLCanvasElement;
	let roomScene: RoomScene;

	const isXPFinished = localStorage.getItem('isXPFinished');
	console.log(isXPFinished);
	// localStorage.clear();

	onMount(async () => {
		roomScene = new RoomScene({ canvas });
		await roomScene.init();
	});
</script>

<container class="">
	<header class="flex items-center h-16 bg-white text-blue">
		<h1 class="ml-4 text-4xl font-title">Chez Olena</h1>
	</header>

	<section class="absolute flex justify-between w-full gap-4 px-4 bottom-16">
		{#if isXPFinished === 'true'}
			<button class="btn-secondary" on:click={() => roomScene.showBeforeRoom()}> Avant </button>
			<button class="btn-secondary" on:click={() => roomScene.showAfterRoom()}> Après </button>
		{/if}
	</section>
	<div class="absolute w-full px-4 bottom-2">
		<a class="btn-primary" href="/map">Commencer le périple <ArrowRight /> </a>
	</div>

	<canvas id="three-before" bind:this={canvas}></canvas>
</container>
