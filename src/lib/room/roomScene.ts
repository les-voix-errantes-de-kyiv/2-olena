import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
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

	private beforeRoomLights?: THREE.Group<THREE.Object3DEventMap>;
	private afterRoomLights?: THREE.Group<THREE.Object3DEventMap>;

	private room?: RoomSceneMapObject;

	private beforeRoom?: THREE.Object3D<THREE.Object3DEventMap>;
	private afterRoom?: THREE.Object3D<THREE.Object3DEventMap>;

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

	async init(onProgress: (progress: number) => void) {
		this.camera.position.set(1.15, 0.5, 1.15);
		this.controls.target.set(0, 0.75, 0);

		this.controls.minAzimuthAngle = -0.7;
		onProgress(20);

		this.controls.maxAzimuthAngle = 1.75;
		this.controls.minPolarAngle = Math.PI / 4;
		this.controls.maxPolarAngle = Math.PI / 2 - 0.4;
		onProgress(40);

		this.controls.enableZoom = false;
		this.controls.enablePan = false;
		onProgress(60);

		this.renderer.setClearColor('#010D1C');
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		onProgress(80);

		this.renderer.shadowMap.enabled = true;

		await this.setupObjects((progress) => onProgress(80 + progress * 0.2));
		onProgress(100);

		this.animate();
	}

	private async setupObjects(onProgress: (progress: number) => void) {
		const ambientLight = new THREE.AmbientLight('#ffffff', 0.7);

		const sunLight = new THREE.DirectionalLight('#FFC371', 1.5);
		sunLight.position.set(0.5, 2, -2.5);

		const ambientLightAfter = new THREE.AmbientLight('#4C6561', 1);

		const sunLightAfter = new THREE.DirectionalLight('#B9C9CB', 2);
		sunLightAfter.position.set(0.5, 2, -2.5);

		const lampLight = new THREE.PointLight(0xff9000, 0.5);
		lampLight.position.set(-1.6, 0.9, 1.35);

		const candleLight = new THREE.PointLight(0xff9000, 0.2);
		candleLight.position.set(0.05, 0.6, -0.32);

		const wallLeft = new THREE.BoxGeometry(5, 4, 0.02);
		const wallRight = new THREE.BoxGeometry(0.02, 4, 5);

		const material = new THREE.MeshStandardMaterial({ color: '#6B5F54' });
		const meshRight = new THREE.Mesh(wallRight, material);
		const meshLeft = new THREE.Mesh(wallLeft, material);
		meshRight.position.set(2, 1, 0.5);
		meshLeft.position.set(0.7, 1, 1.92);
		this.scene.add(meshRight, meshLeft);

		onProgress(15);

		//BACKGROUND

		const image = new Image();
		const texture = new THREE.Texture(image);
		image.addEventListener('load', () => {
			texture.needsUpdate = true;
		});
		image.src = '/assets/images/kyiv.jpg';

		const backgroundAfter = new THREE.PlaneGeometry(7, 7);
		const materialBackgroundAfter = new THREE.MeshStandardMaterial({ map: texture });
		const meshBackgroundAfter = new THREE.Mesh(backgroundAfter, materialBackgroundAfter);
		meshBackgroundAfter.position.set(0, 1, -3.9);
		this.scene.add(meshBackgroundAfter);

		const backgroundBefore = new THREE.PlaneGeometry(7, 7);
		const materialBackgroundBefore = new THREE.MeshStandardMaterial({ color: '#05172E' });
		const meshBackgroundBefore = new THREE.Mesh(backgroundBefore, materialBackgroundBefore);
		meshBackgroundBefore.position.set(0, 1, -3.9);
		this.scene.add(meshBackgroundBefore);

		onProgress(40);

		//GROUPS

		this.beforeRoomLights = new THREE.Group();
		this.beforeRoomLights.add(ambientLight, sunLight, lampLight, candleLight, meshBackgroundBefore);
		this.scene.add(this.beforeRoomLights);

		this.afterRoomLights = new THREE.Group();
		this.afterRoomLights.add(ambientLightAfter, sunLightAfter, meshBackgroundAfter);
		this.scene.add(this.afterRoomLights);

		onProgress(50);

		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('/draco/');
		dracoLoader.preload();
		this.gltfLoader.setDRACOLoader(dracoLoader);

		this.room = (await this.gltfLoader.loadAsync('/assets/models/room.glb')).scene;
		onProgress(99);

		this.beforeRoom = this.room.children[0];
		this.afterRoom = this.room.children[1];

		this.scene.add(this.room);

		this.room.scale.set(2, 2, 2);
	}

	private animate() {
		const clock = new THREE.Clock();

		const tick = () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const elapsedTime = clock.getElapsedTime();

			this.controls.update();

			this.renderer.render(this.scene, this.camera);

			window.requestAnimationFrame(tick);
		};

		tick();
	}

	showBeforeRoom() {
		if (!this.beforeRoomLights || !this.afterRoomLights || !this.beforeRoom || !this.afterRoom) {
			return;
		}

		this.beforeRoomLights.visible = true;
		this.afterRoomLights.visible = false;
		this.beforeRoom.visible = true;
		this.afterRoom.visible = false;
	}

	showAfterRoom = () => {
		if (!this.beforeRoomLights || !this.afterRoomLights || !this.beforeRoom || !this.afterRoom) {
			return;
		}

		this.beforeRoomLights.visible = false;
		this.afterRoomLights.visible = true;
		this.beforeRoom.visible = false;
		this.afterRoom.visible = true;
	};
}
