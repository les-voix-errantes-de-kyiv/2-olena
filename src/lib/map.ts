import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const createMapScene = async (canvas: HTMLCanvasElement) => {
	const gltfLoader = new GLTFLoader();
	// Scene
	const scene = new THREE.Scene();

	/**
	 * Textures
	 */

	/**
	 * Lights
	 */
	// Ambient light
	const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
	scene.add(ambientLight);

	// Directional light
	const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.26);
	moonLight.position.set(4, 5, -2);
	scene.add(moonLight);

	/**
	 * Fog
	 */
	const fog = new THREE.Fog('#262837', 1, 15);
	scene.fog = fog;

	// objects
	const map = (await gltfLoader.loadAsync('/assets/glb/europe.glb')).scene;
	scene.add(map);
	/**
	 * Sizes
	 */
	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight
	};

	window.addEventListener('resize', () => {
		// Update sizes
		sizes.width = window.innerWidth;
		sizes.height = window.innerHeight;

		// Update camera
		camera.aspect = sizes.width / sizes.height;
		camera.updateProjectionMatrix();

		// Update renderer
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	});

	/**
	 * Camera
	 */
	// Base camera
	const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
	camera.position.x = 4;
	camera.position.y = 2;
	camera.position.z = 5;
	scene.add(camera);

	// Controls
	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;

	/**
	 * Renderer
	 */
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas
	});
	renderer.setClearColor('#262837');
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	/**
	 * Shadows
	 */
	renderer.shadowMap.enabled = true;

	/**
	 * Animate
	 */
	const clock = new THREE.Clock();

	const tick = () => {
		const elapsedTime = clock.getElapsedTime();

		// Update controls
		controls.update();

		// Render
		renderer.render(scene, camera);

		// Call tick again on the next frame
		window.requestAnimationFrame(tick);
	};

	tick();
};
