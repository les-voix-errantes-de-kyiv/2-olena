import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { type Position, type Step } from './steps';

export type MapSceneMapObject = THREE.Group<THREE.Object3DEventMap>;

export type MapSceneParams = {
	canvas: HTMLCanvasElement;
};

export type Sizes = {
	width: number;
	height: number;
};

export class MapScene {
	readonly canvas: HTMLCanvasElement;
	private readonly gltfLoader: GLTFLoader;
	sizes: Sizes;

	readonly controls: OrbitControls;
	readonly camera: THREE.PerspectiveCamera;
	readonly scene: THREE.Scene;
	readonly renderer: THREE.WebGLRenderer;
	private map?: MapSceneMapObject;

	constructor({ canvas }: MapSceneParams) {
		this.canvas = canvas;

		this.gltfLoader = new GLTFLoader();

		this.scene = new THREE.Scene();

		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
		this.scene.add(this.camera);

		this.controls = new OrbitControls(this.camera, this.canvas);

		this.renderer = new THREE.WebGLRenderer({
			canvas: canvas
		});

		window.addEventListener('resize', () => {
			// Update sizes
			this.sizes.width = window.innerWidth;
			this.sizes.height = window.innerHeight;

			// Update camera
			this.camera.aspect = this.sizes.width / this.sizes.height;
			this.camera.updateProjectionMatrix();

			// Update renderer
			this.renderer.setSize(this.sizes.width, this.sizes.height);
			this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		});
	}

	addHelpers() {
		const axesHelper = new THREE.AxesHelper(10);
		this.scene.add(axesHelper);

		const gridCases = 22;
		const gridHelper = new THREE.GridHelper(gridCases, gridCases);
		this.scene.add(gridHelper);
	}

	async init() {
		this.camera.position.x = 4;
		this.camera.position.y = 4;
		this.camera.position.z = 4;

		this.controls.enableDamping = true;
		this.controls.enableZoom = false;
		this.controls.enablePan = false;
		this.controls.minPolarAngle = 0.5;
		this.controls.maxPolarAngle = Math.PI / 2 - 0.2;

		this.renderer.setClearColor('#0F223B');
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.shadowMap.enabled = true;
		this.renderer.outputColorSpace = THREE.SRGBColorSpace;

		await this.setupObjects();

		this.animate();
	}

	private async setupObjects() {
		const ambientLight = new THREE.AmbientLight('#b9d5ff', 1);
		this.scene.add(ambientLight);

		const fog = new THREE.Fog('#262837', 1, 5);
		this.scene.fog = fog;

		this.map = (await this.gltfLoader.loadAsync('/assets/glb/europe-map/EUROPE_MAP.gltf')).scene;
		this.scene.add(this.map);
	}

	private animate() {
		const clock = new THREE.Clock();

		let oldElapsedTime = 0;
		const tick = () => {
			const elapsedTime = clock.getElapsedTime();
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const delta = oldElapsedTime - elapsedTime;
			oldElapsedTime = elapsedTime;

			// Update controls
			this.controls.update();

			// Render
			this.renderer.render(this.scene, this.camera);

			// Call tick again on the next frame
			window.requestAnimationFrame(tick);
		};

		tick();
	}

	private getCameraPositionForTarget(position: Position): Position {
		return { x: position.x + 0, y: position.y + 2, z: position.z + 1 };
	}

	lookAtStep(step: Step) {
		if (!this.map) {
			return;
		}

		const target = this.map.children.find((child) => child.name === step.targetName);
		if (!target) {
			return;
		}

		const targetPosition = target.position;
		const cameraPosition = this.getCameraPositionForTarget(targetPosition);

		gsap.to(this.controls.target, {
			duration: 1,
			x: targetPosition.x,
			y: targetPosition.y,
			z: targetPosition.z
		});

		gsap.to(this.controls.object.position, {
			duration: 1,
			x: cameraPosition.x,
			y: cameraPosition.y,
			z: cameraPosition.z
		});
	}
}
