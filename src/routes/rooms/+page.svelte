<script lang="ts">
	import { RoomScene } from '$lib/rooms/roomsScene';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let roomScene: RoomScene;

	onMount(async () => {
		roomScene = new RoomScene({ canvas });
		await roomScene.init();
	});
</script>

<body>
	<section class="container__button">
		<button on:click={roomScene.showBeforeRoom}> avant </button>
		<button on:click={roomScene.showAfterRoom}> apres </button>
	</section>

	<canvas id="three-before" bind:this={canvas}></canvas>
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

	.container__button {
		position: absolute;
		bottom: 1%;
		right: 2%;
		z-index: 100;
	}

	.container__button button {
		border: none;
		color: black;
		border-radius: 10px;
		background: white;
		font-size: 16px;
		text-decoration: none;
		padding: 0.5rem 2rem;
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
