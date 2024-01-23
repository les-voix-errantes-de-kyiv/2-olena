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
	const ambientLight = new THREE.AmbientLight('#4C6561', 1);
	scene.add(ambientLight);

	// Directional light
	const sunLight = new THREE.DirectionalLight('#B9C9CB', 2);
	sunLight.position.set(0.5, 2, -2.5);
	scene.add(sunLight);

	const directionalLightHelper = new THREE.DirectionalLightHelper(sunLight, 0.2);
	scene.add(directionalLightHelper);

	const axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);

	const gridHelper = new THREE.GridHelper(5, 5);
	scene.add(gridHelper);

	// objects
	const room = (await gltfLoader.loadAsync('/assets/gltf/room/piecev1.gltf')).scene;
	room.scale.set(2, 2, 2);
	scene.add(room);
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
	const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 100);
	camera.position.set(0.75, 2, 0.75);

	camera.lookAt(-3, 3, 0);
	scene.add(camera);

	// Controls
	const controls = new OrbitControls(camera, canvas);
	controls.minAzimuthAngle = -0.7;
	controls.maxAzimuthAngle = 1.75;
	controls.minPolarAngle = Math.PI / 4;
	controls.maxPolarAngle = Math.PI / 2 - 0.4;
	controls.enableZoom = false;

	/**
	 * Renderer
	 */
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas
	});
	renderer.setClearColor('#ffffff');
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	/**
	 * Shadows
	 */
	renderer.shadowMap.enabled = true;

	/**
	 * Animate
	 */
	// const clock = new THREE.Clock();

	const tick = () => {
		// const elapsedTime = clock.getElapsedTime();

		// Update controls
		controls.update();

		// Render
		renderer.render(scene, camera);

		// Call tick again on the next frame
		window.requestAnimationFrame(tick);
	};

	tick();
};
