import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { Position, Step } from './steps';

type LookAtStepFn = (step: Step) => void;

export type MapScene = {
	controls: OrbitControls;
	camera: THREE.PerspectiveCamera;
	scene: THREE.Scene;
	renderer: THREE.Renderer;
	clock: THREE.Clock;
	lookAtStep: LookAtStepFn;
};

export const createMapScene = async (canvas: HTMLCanvasElement): Promise<MapScene> => {
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

	/**
	 * Fog
	 */
	const fog = new THREE.Fog('#262837', 1, 5);
	scene.fog = fog;

	// objects
	const map = (await gltfLoader.loadAsync('/assets/glb/europe-map/EUROPE_MAP.gltf')).scene;

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
	camera.position.y = 4;
	camera.position.z = 4;
	scene.add(camera);

	// const axesHelper = new THREE.AxesHelper(10);
	// scene.add(axesHelper);

	// const gridCases = 22;
	// const gridHelper = new THREE.GridHelper(gridCases, gridCases);
	// scene.add(gridHelper);

	// Controls
	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;
	controls.enableZoom = false;
	controls.enablePan = false;
	controls.minPolarAngle = 0.5;
	controls.maxPolarAngle = Math.PI / 2 - 0.2;

	/**
	 * Renderer
	 */
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas
	});
	renderer.setClearColor('#0F223B');
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

	let oldElapsedTime = 0;
	const tick = () => {
		const elapsedTime = clock.getElapsedTime();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const delta = oldElapsedTime - elapsedTime;
		oldElapsedTime = elapsedTime;

		// Update controls
		controls.update();

		// Render
		renderer.render(scene, camera);

		// Call tick again on the next frame
		window.requestAnimationFrame(tick);
	};

	tick();

	const getCameraPositionForTarget = (position: Position): Position => {
		return { x: position.x + 0, y: position.y + 2, z: position.z + 1 };
	};

	const lookAtStep = (step: Step) => {
		const target = map.children.find((child) => child.name === step.targetName);
		if (!target) {
			return;
		}
		const targetPosition = target.position;
		const cameraPosition = getCameraPositionForTarget(targetPosition);

		gsap.to(controls.target, {
			duration: 1,
			x: targetPosition.x,
			y: targetPosition.y,
			z: targetPosition.z
		});

		gsap.to(controls.object.position, {
			duration: 1,
			x: cameraPosition.x,
			y: cameraPosition.y,
			z: cameraPosition.z
		});
	};

	return {
		controls,
		camera,
		scene,
		renderer,
		clock,
		lookAtStep
	};
};
