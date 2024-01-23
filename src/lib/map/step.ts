export type Position = { x: number; y: number; z: number };
export type Step = {
	position: Position;
};

export const steps: Array<Step> = [
	{
		position: { x: 9, y: 0, z: -3 }
	},
	{
		position: { x: 8, y: 0, z: -3 }
	},
	{
		position: { x: 7, y: 0, z: -2 }
	},
	{
		position: { x: 6, y: 0, z: -2 }
	},
	{
		position: { x: 5, y: 0, z: -3 }
	},
	{
		position: { x: 4, y: 0, z: -3 }
	},
	{
		position: { x: 3.5, y: 0, z: -2 }
	}
];
