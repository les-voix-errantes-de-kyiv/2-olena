import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type RoomScene = {
	controls: OrbitControls;
	camera: THREE.PerspectiveCamera;
	scene: THREE.Scene;
	renderer: THREE.WebGLRenderer;
	clock: THREE.Clock;
	showBeforeRoom: () => void;
	showAfterRoom: () => void;
};

export const createRoomScene = async (canvas: HTMLCanvasElement): Promise<RoomScene> => {
	const gltfLoader = new GLTFLoader();
	// Scene
	const scene = new THREE.Scene();

	const ambientLight = new THREE.AmbientLight('#ffffff', 0.01);

	// LIGHT
	const sunLight = new THREE.DirectionalLight('#FFC371', 1.5);
	sunLight.position.set(0.5, 2, -2.5);

	const ambientLightAfter = new THREE.AmbientLight('#4C6561', 1);

	const sunLightAfter = new THREE.DirectionalLight('#B9C9CB', 2);
	sunLightAfter.position.set(0.5, 2, -2.5);

	const lampLight = new THREE.PointLight(0xff9000, 0.5);
	lampLight.position.set(-1.6, 0.9, 1.35);

	const candleLight = new THREE.PointLight(0xff9000, 0.2);
	candleLight.position.set(0.05, 0.6, -0.32);

	// OBJECTS
	const room = (await gltfLoader.loadAsync('/assets/gltf/room/piecev1.gltf')).scene;
	room.scale.set(2, 2, 2);
	scene.add(room);

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

	// CAMERA
	const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 100);
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
	controls.enablePan = false;

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

	const groupBeforeRoom = new THREE.Group();
	groupBeforeRoom.add(ambientLight, sunLight, lampLight, candleLight);
	scene.add(groupBeforeRoom);

	const groupAfterRoom = new THREE.Group();
	groupAfterRoom.add(ambientLightAfter, sunLightAfter);
	scene.add(groupAfterRoom);

	scene.add(groupBeforeRoom);
	scene.add(groupAfterRoom);

	const showBeforeRoom = () => {
		groupBeforeRoom.visible = true;
		groupAfterRoom.visible = false;
	};

	const showAfterRoom = () => {
		groupBeforeRoom.visible = false;
		groupAfterRoom.visible = true;
	};

	showAfterRoom();

	/**
	 * Animate
	 */
	const clock = new THREE.Clock();

	const tick = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const elapsedTime = clock.getElapsedTime();

		// Update controls
		controls.update();

		// Render
		renderer.render(scene, camera);

		// Call tick again on the next frame
		window.requestAnimationFrame(tick);
	};

	tick();

	return { controls, camera, scene, renderer, clock, showBeforeRoom, showAfterRoom };
};
