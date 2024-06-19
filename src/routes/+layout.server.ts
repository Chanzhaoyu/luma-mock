import { env } from '$env/dynamic/private';
import { isNonEmptyString } from '$lib/is';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	if (!isNonEmptyString(env.ACCESS_TOKEN)) {
		return { errorMessage: 'ACCESS_TOKEN is not set in the environment variables' };
	}
	return {};
};
