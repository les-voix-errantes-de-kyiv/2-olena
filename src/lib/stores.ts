import {Scene, PerspectiveCamera, Mesh, AmbientLight} from 'three'
import {writable} from "svelte/store";
import {geometryBox, material} from "$lib/objects";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const sceneStore = writable(new Scene());
export const cameraStore = writable(
    new PerspectiveCamera(
        45,
        typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 0,
        1,
        1000
    )
);
export const boxStore = writable(new Mesh(geometryBox, material))
export const ambientLightStore = writable(new AmbientLight(0xffffff))
export const gltfLoaderStore = writable(new GLTFLoader())
