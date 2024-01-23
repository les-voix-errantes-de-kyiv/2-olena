<script lang="ts">
	import { createRoomBeforeScene, createRoomAfterScene } from '$lib/rooms';
	import { onMount } from 'svelte';

	let canvasBefore: HTMLCanvasElement;
	let canvasAfter: HTMLCanvasElement;

	onMount(() => {
		createRoomBeforeScene(canvasBefore);
		createRoomAfterScene(canvasAfter);
	});
</script>

<body>
	<section>
		<canvas class="webgl1" id="three-before" bind:this={canvasBefore}></canvas>
		<canvas class="webgl2" id="three-after" bind:this={canvasAfter}></canvas>
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
