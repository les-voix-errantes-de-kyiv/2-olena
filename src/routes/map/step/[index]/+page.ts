import { isStepIndexValid, steps } from '$lib/map';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
export const load: PageLoad = ({ params }) => {
	const stepIndex = Number.parseInt(params.index);

	if (!isStepIndexValid(stepIndex)) {
		error(404, 'Not found');
	}

	return {
		stepIndex,
		step: steps[stepIndex]
	};
};
