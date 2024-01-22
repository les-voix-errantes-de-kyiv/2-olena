<script lang="ts">
    import { createMapScene } from "$lib/map";
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement;

    onMount(() => {
        createMapScene(canvas)
    })
</script>

<canvas id="three" bind:this={canvas}></canvas>
