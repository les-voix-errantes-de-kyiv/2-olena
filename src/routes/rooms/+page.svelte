<script lang="ts">
	import { RoomScene } from '$lib/rooms/index';
	import { onMount } from 'svelte';
	import ArrowRight from '$lib/components/icons/mini/arrow-right.svelte';
	import Eye from '$lib/components/icons/mini/eye.svelte';

	let canvas: HTMLCanvasElement;
	let roomScene: RoomScene;

	const isXPFinished = localStorage.getItem('isXPFinished');
	// localStorage.clear();

	let showBefore = true;

	onMount(async () => {
		roomScene = new RoomScene({ canvas });
		await roomScene.init();
	});
</script>

<container class="">
	<header class="absolute top-0 flex items-center w-full h-16 px-4 bg-white text-blue">
		<h1 class="text-4xl font-title">Chez Olena</h1>
	</header>

	<section
		class={isXPFinished === 'true'
			? 'absolute flex flex-col justify-between w-full gap-4 px-4 bottom-2'
			: 'flex flex-col justify-between w-full bottom-2'}
	>
		{#if isXPFinished === 'true'}
			<a class="btn-secondary" href="/map">
				Retourner au périple <ArrowRight class="fill-purple text-purple stroke-purple" />
			</a>
			<button
				class="btn-primary"
				on:click={() => {
					if (showBefore) {
						roomScene.showBeforeRoom();
					} else {
						roomScene.showAfterRoom();
					}
					showBefore = !showBefore;
				}}
			>
				{showBefore ? 'Avant' : 'Après'}
				<Eye class="text-white fill-white stroke-white" />
			</button>
		{:else}
			<div class="absolute w-full px-4 bottom-2">
				<a class="btn-primary" href="/map">Commencer le périple <ArrowRight /> </a>
			</div>
		{/if}
	</section>
	<div class="absolute w-full px-4 bottom-2">
		<a class="btn-primary" href="/map">Commencer le périple <ArrowRight /> </a>
	</div>

	<canvas id="three-before" bind:this={canvas}></canvas>
</container>
