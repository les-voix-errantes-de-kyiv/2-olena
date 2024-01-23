<script lang="ts">
	import { createRoomBeforeScene } from '$lib/rooms';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		createRoomBeforeScene(canvas);
	});
</script>

<body>
	<a class="change-page" href="/rooms/after">See after</a>

	<canvas class="webgl" id="three" bind:this={canvas}></canvas>
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

	.webgl {
		position: fixed;
		top: 0;
		left: 0;
		outline: none;
	}

	a {
		position: absolute;
		bottom: 1%;
		right: 2%;
		z-index: 100;
		color: black;
		border-radius: 10px;
		background: white;
		font-size: 16px;
		text-decoration: none;
		padding: 1rem;
	}
</style>
