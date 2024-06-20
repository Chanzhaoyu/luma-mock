import type { RequestHandler, RequestEvent } from './$types';
import { json } from '@sveltejs/kit';
import { config } from '$lib/config';

const access_token = config.ACCESS_TOKEN;
const baseUrl = config.PROXY_URL + '/api/photon/v1/generations/';

export const POST = (async ({ request }: RequestEvent) => {
	if (!access_token) return json({ message: '缺少必要参数：access_token' }, { status: 400 });
	try {
		const { prompt, image_url } = await request.json();

		if (!prompt) return json({ message: '缺少必要参数：prompt' }, { status: 400 });

		const headers = {
			Cookie: `access_token=${access_token}`,
			Origin: 'https://lumalabs.ai',
			Referer: 'https://lumalabs.ai',
			'Content-type': 'application/json'
		};

		const payload: Record<string, any> = {
			user_prompt: prompt,
			aspect_ratio: '16:9',
			expand_prompt: true,
			image_url: image_url
		};

		const res = await fetch(baseUrl, {
			method: 'POST',
			headers,
			body: JSON.stringify(payload)
		});

		if (!res.ok) {
			const error = await res.json();
			throw new Error(error?.detail?.reason ?? error?.detail ?? 'Failed to fetch');
		}
		const data = await res.json();
		return json({ message: 'Success', data });
	} catch (error: any) {
		return json({ message: error?.message || 'Internal Server Error' }, { status: 500 });
	}
}) satisfies RequestHandler;
