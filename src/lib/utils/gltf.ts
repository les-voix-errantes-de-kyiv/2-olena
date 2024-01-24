import type { Group, Object3D } from 'three';

export const enableShadows = (scene: Group): Group => {
	const clone = scene.clone();

	clone.traverse(function (node: Object3D) {
		if ('isMesh' in node && node.isMesh) {
			node.castShadow = true;
		}
	});

	return clone;
};
