import * as THREE from 'three';
import { sceneStore, cameraStore, boxStore, ambientLightStore, gltfLoaderStore } from '$lib/stores';
import { get } from 'svelte/store';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = get(sceneStore);
const camera = get(cameraStore);
const cube = get(boxStore);
const ambientLight = get(ambientLightStore);

export function resize(renderer: THREE.WebGLRenderer) {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

export function initObjectScene() {
	scene.add(cube);
	scene.add(ambientLight);
	camera.position.z = 5;
}

export function placeModel(model: GLTF) {
	scene.add(model.scene.children[0]);
}

export function getModel(model: GLTF) {
	placeModel(model);
}
export function loadModel(url: string) {
	const gltfLoader = get(gltfLoaderStore);
	return gltfLoader.loadAsync(url);
}
