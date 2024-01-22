<script lang="ts">
    import {createScene} from "$lib/three";
    import {loadModel, placeModel} from "$lib/functions";
    import {onMount} from "svelte";
    import type {GLTF} from "three/examples/jsm/loaders/GLTFLoader.js";

    let canvas;

    onMount(() => {
        createScene(canvas)
        loadModel('/assets/Avion.glb').then((model: GLTF) => {
            placeModel(model)
        })
        loadModel('/assets/Island.glb').then((model: GLTF) => {
            placeModel(model)
        })
        loadModel('/assets/scene.glb').then((model: GLTF) => {
            placeModel(model)
        })
    })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<canvas id="three" bind:this={canvas}></canvas>
