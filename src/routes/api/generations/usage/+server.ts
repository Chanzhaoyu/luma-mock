import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { config } from '$lib/config';

const access_token = config.ACCESS_TOKEN;
const baseUrl = config.PROXY_URL + '/api/photon/v1/subscription/usage';

export const GET = (async () => {
	if (!access_token) return json({ message: '缺少必要参数：access_token' }, { status: 400 });

	try {
		const res = await fetch(baseUrl, {
			method: 'GET',
			headers: { Cookie: `access_token=${access_token}` }
		});

		if (!res.ok) {
			const error = await res.json();
			throw new Error(error?.detail?.reason ?? error?.detail ?? 'Failed to fetch');
		}

		const data = await res.json();
		return json({ data }, { status: 200 });
	} catch (error: any) {
		return json({ message: error?.message || 'Internal Server Error' }, { status: 500 });
	}
}) satisfies RequestHandler;
