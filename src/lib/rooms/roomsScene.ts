import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type RoomSceneMapObject = THREE.Group<THREE.Object3DEventMap>;

export type RoomSceneParams = {
	canvas: HTMLCanvasElement;
};

export type Sizes = {
	width: number;
	height: number;
};

export class RoomScene {
	readonly canvas: HTMLCanvasElement;
	private readonly gltfLoader: GLTFLoader;
	sizes: Sizes;

	readonly controls: OrbitControls;
	readonly camera: THREE.PerspectiveCamera;
	readonly scene: THREE.Scene;
	readonly renderer: THREE.WebGLRenderer;

	private groupBeforeRoom?: THREE.Group<THREE.Object3DEventMap>;
	private groupAfterRoom?: THREE.Group<THREE.Object3DEventMap>;

	private room?: RoomSceneMapObject;

	constructor({ canvas }: RoomSceneParams) {
		this.canvas = canvas;

		this.gltfLoader = new GLTFLoader();

		this.scene = new THREE.Scene();

		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		this.camera = new THREE.PerspectiveCamera(90, this.sizes.width / this.sizes.height, 0.1, 100);
		this.scene.add(this.camera);

		this.controls = new OrbitControls(this.camera, this.canvas);

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas
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

	async init() {
		this.camera.position.set(0.75, 2, 0.75);
		this.camera.lookAt(-3, 3, 0);

		this.controls.minAzimuthAngle = -0.7;
		this.controls.maxAzimuthAngle = 1.75;
		this.controls.minPolarAngle = Math.PI / 4;
		this.controls.maxPolarAngle = Math.PI / 2 - 0.4;
		this.controls.enableZoom = false;
		this.controls.enablePan = false;

		this.renderer.setClearColor('#ffff00');
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.shadowMap.enabled = true;

		await this.setupObjects();

		this.animate();

		const isXPFinished = localStorage.getItem('isXPFinished');
		if (isXPFinished === 'true') {
			this.showAfterRoom();
		} else {
			this.showBeforeRoom();
		}
	}

	private async setupObjects() {
		const ambientLight = new THREE.AmbientLight('#ffffff', 0.01);

		const sunLight = new THREE.DirectionalLight('#FFC371', 1.5);
		sunLight.position.set(0.5, 2, -2.5);

		const ambientLightAfter = new THREE.AmbientLight('#4C6561', 1);

		const sunLightAfter = new THREE.DirectionalLight('#B9C9CB', 2);
		sunLightAfter.position.set(0.5, 2, -2.5);

		const lampLight = new THREE.PointLight(0xff9000, 0.5);
		lampLight.position.set(-1.6, 0.9, 1.35);

		const candleLight = new THREE.PointLight(0xff9000, 0.2);
		candleLight.position.set(0.05, 0.6, -0.32);

		this.groupBeforeRoom = new THREE.Group();
		this.groupBeforeRoom.add(ambientLight, sunLight, lampLight, candleLight);
		this.scene.add(this.groupBeforeRoom);

		this.groupAfterRoom = new THREE.Group();
		this.groupAfterRoom.add(ambientLightAfter, sunLightAfter);
		this.scene.add(this.groupAfterRoom);

		this.room = (await this.gltfLoader.loadAsync('/assets/gltf/room/piecev1.gltf')).scene;
		this.room.scale.set(2, 2, 2);

		this.scene.add(this.room);
	}

	private animate() {
		const clock = new THREE.Clock();

		const tick = () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const elapsedTime = clock.getElapsedTime();

			// Update controls
			this.controls.update();

			// Render
			this.renderer.render(this.scene, this.camera);

			// Call tick again on the next frame
			window.requestAnimationFrame(tick);
		};

		tick();
	}

	showBeforeRoom() {
		if (!this.groupBeforeRoom || !this.groupAfterRoom) {
			return;
		}

		this.groupBeforeRoom.visible = true;
		this.groupAfterRoom.visible = false;
	}

	showAfterRoom = () => {
		if (!this.groupBeforeRoom || !this.groupAfterRoom) {
			return;
		}

		this.groupBeforeRoom.visible = false;
		this.groupAfterRoom.visible = true;
	};
}
