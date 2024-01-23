<script lang="ts">
	import { createRoomScene, type RoomScene } from '$lib/rooms';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let isBeforeRoomActive: boolean = true;

	let canvas: HTMLCanvasElement;
	let roomScene: RoomScene;
	onMount(async () => {
		// createRoomScene(canvas);
		roomScene = await createRoomScene(canvas);
	});
</script>

<body>
	<button on:click={roomScene.showBeforeRoom}> avant </button>

	<button on:click={roomScene.showAfterRoom}> apres </button>

	<section>
		<canvas class="invisible" id="three-before" bind:this={canvas}></canvas>
	</section>
</body>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	html,
	body {
		overflow: hidden;
	}
	.change-page {
		position: absolute;
		top: 1%;
		right: 2%;
		z-index: 100;
		color: black;
		border-radius: 10px;
		background: white;
		font-size: 16px;
		text-decoration: none;
		padding: 1rem;
	}

	/* @media screen and (min-width: 900px) {
		section {
			display: flex;
			gap: 1rem;
		}
		.webgl1 {
			max-width: 50vw;
		}
		.webgl2 {
			max-width: 50vw;
		}
	} */
</style>
