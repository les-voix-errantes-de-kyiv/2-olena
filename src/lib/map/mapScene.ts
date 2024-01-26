import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { steps, type Position, type Step } from './steps';

export type MapObject = THREE.Group<THREE.Object3DEventMap>;
export type PinObject = THREE.Object3D<THREE.Object3DEventMap>;
export type TrajectObjet = THREE.Object3D<THREE.Object3DEventMap>;

export type OnProgressFn = (progress: number) => void;

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

	private map?: MapObject;
	private pinsObjects: Map<string, TrajectObjet | undefined>;
	private trajectsObjects: Map<string, PinObject | undefined>;

	constructor({ canvas }: MapSceneParams) {
		this.canvas = canvas;

		this.gltfLoader = new GLTFLoader();
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('/draco/');
		dracoLoader.preload();
		this.gltfLoader.setDRACOLoader(dracoLoader);

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

		this.trajectsObjects = new Map();
		this.pinsObjects = new Map();
	}

	async init(onProgress: OnProgressFn) {
		this.camera.position.x = 4;
		this.camera.position.y = 4;
		this.camera.position.z = 4;

		this.controls.enableDamping = true;
		this.controls.enableZoom = false;
		this.controls.enablePan = false;
		this.controls.minPolarAngle = 0.5;
		this.controls.maxPolarAngle = Math.PI / 2 - 0.2;

		this.renderer.setClearColor('#FFFFFF');
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.outputColorSpace = THREE.SRGBColorSpace;
		onProgress(30);

		await this.setupObjects((percentage: number) => {
			const setupObjectsPercentage = (percentage * 60) / 100;
			onProgress(30 + setupObjectsPercentage);
		});
		onProgress(90);

		this.animate();
		onProgress(100);
	}

	private async setupObjects(onProgress: OnProgressFn) {
		const mapLoadPercentage = 60;
		this.map = (
			await this.gltfLoader.loadAsync('/assets/models/map.glb', (event) => {
				const { loaded, total } = event;

				if (total === 0) {
					return;
				}

				const advancementPercentage = (loaded * mapLoadPercentage) / total;
				onProgress(advancementPercentage);
			})
		).scene;
		this.scene.add(this.map);
		onProgress(mapLoadPercentage);

		this.trajectsObjects = new Map();
		this.pinsObjects = new Map();
		steps.map((step, index) => {
			// the first step will not have a traject
			// traject objects are named in reversed order
			const trajectObjectName = (steps.length - index).toString();
			this.trajectsObjects.set(step.targetName, this.getObjectByName(trajectObjectName));

			this.pinsObjects.set(step.targetName, this.getObjectByName(step.targetName));
		});
		onProgress(70);

		this.addSpotLight(1.77, 8.4, 3.66);
		this.addSpotLight(-2.25, 8.4, -2.76);
		this.addSpotLight(-4.83, 8.4, 4.56);
		onProgress(100);
	}

	private getObjectByName(targetName: string) {
		if (!this.map) {
			return;
		}

		return this.map.children.find((child) => child.name === targetName);
	}

	private addSpotLight(x: number, y: number, z: number) {
		const spotLight = new THREE.SpotLight(0xffffff, 80);
		this.scene.add(spotLight);
		this.scene.add(spotLight.target);

		spotLight.position.set(x, y, z);
		spotLight.target.position.set(x, 0, z);

		spotLight.shadow.mapSize.width = 1024;
		spotLight.shadow.mapSize.height = 1024;

		spotLight.shadow.camera.near = 500;
		spotLight.shadow.camera.far = 4000;
		spotLight.shadow.camera.fov = 30;
	}

	private animate() {
		const clock = new THREE.Clock();

		let oldElapsedTime = 0;
		const tick = () => {
			const elapsedTime = clock.getElapsedTime();
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const delta = oldElapsedTime - elapsedTime;
			oldElapsedTime = elapsedTime;

			this.controls.update();

			this.renderer.render(this.scene, this.camera);

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

		this.showTrajectsUntilStep(step);
		this.showPinsUntilStep(step);

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

	private showTrajectsUntilStep(step: Step) {
		let stepHasTraject = false;

		// hide all trajects
		for (const [key, traject] of this.trajectsObjects.entries()) {
			if (!traject) {
				continue;
			}

			if (key === step.targetName) {
				stepHasTraject = true;
			}

			traject.visible = false;
		}

		if (!stepHasTraject) {
			return;
		}

		for (const [key, traject] of this.trajectsObjects.entries()) {
			if (!traject) {
				continue;
			}

			traject.visible = true;

			if (key === step.targetName) {
				return;
			}
		}
	}

	private showPinsUntilStep(step: Step) {
		let stepHasTraject = false;

		// hide all trajects
		for (const [key, traject] of this.pinsObjects.entries()) {
			if (!traject) {
				continue;
			}

			if (key === step.targetName) {
				stepHasTraject = true;
			}

			traject.visible = false;
		}

		if (!stepHasTraject) {
			return;
		}

		for (const [key, traject] of this.pinsObjects.entries()) {
			if (!traject) {
				continue;
			}

			traject.visible = true;

			if (key === step.targetName) {
				return;
			}
		}
	}
}
