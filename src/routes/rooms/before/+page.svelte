<script lang="ts">
    import { createMapScene } from "$lib/room-before";
    import { onMount } from "svelte";

    let canvas: HTMLCanvasElement;

    onMount(() => {
        createMapScene(canvas)
    })
</script>
<body>
    <canvas class="webgl" id="three" bind:this={canvas}></canvas>

</body>


<style>
    
    *{
        margin: 0;
        padding: 0;
    }

    html,
    body
    {
        overflow: hidden;
    }

    .webgl
    {
        position: fixed;
        top: 0;
        left: 0;
        outline: none;
    }
</style>
