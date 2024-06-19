import type { RequestHandler, RequestEvent } from './$types';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const access_token = env.ACCESS_TOKEN;
const baseUrl = 'https://internal-api.virginia.labs.lumalabs.ai/api/photon/v1/user/generations/';

export const GET = (async (req: RequestEvent) => {
	if (!access_token) return json({ message: 'Missing access token' }, { status: 400 });

	const offset = req.url.searchParams.get('offset') || '0';
	const limit = req.url.searchParams.get('limit') || '10';

	const url = new URL(baseUrl);
	url.searchParams.append('offset', offset);
	url.searchParams.append('limit', limit);

	try {
		const res = await fetch(`${url.toString()}`, {
			method: 'GET',
			headers: {
				Cookie: `access_token=${access_token}`
			}
		});
		
		if (!res.ok) {
			const error = await res.json();
			throw new Error(error?.detail?.reason ?? 'Failed to fetch data');
		}

		const data = await res.json();
		return json({ data }, { status: 200 });
	} catch (error: any) {
		return json({ message: error?.message || 'Inter Server Error' }, { status: 500 });
	}
}) satisfies RequestHandler;
