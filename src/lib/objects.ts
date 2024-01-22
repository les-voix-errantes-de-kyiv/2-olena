import { BoxGeometry, MeshStandardMaterial } from 'three';

export const geometryBox = new BoxGeometry();
export const material = new MeshStandardMaterial({
	color: 0x00ff00,
	metalness: 0.13
});
