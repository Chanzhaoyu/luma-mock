import type { RequestHandler, RequestEvent } from './$types';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const access_token = env.ACCESS_TOKEN;
const baseUrl =
	'https://internal-api.virginia.labs.lumalabs.ai/api/photon/v1/generations/file_upload?file_type=image&filename=file.jpg';

export const POST = (async ({ request }: RequestEvent) => {
	if (!access_token) return json({ message: 'Missing access token' }, { status: 400 });

	const data = await request.formData();
	const file = data.get('file');

	if (!file) {
		return json({ message: 'No file provided' }, { status: 400 });
	}

	const formData = new FormData();
	formData.append('file', file);

	try {
		const res = await fetch(baseUrl, {
			method: 'POST',
			headers: {
				Cookie: `access_token=${access_token}`
			},
			body: formData
		});

		if (!res.ok) {
			const error = await res.json();
			throw new Error(error?.detail?.reason ?? error?.detail ?? 'Failed to fetch data');
		}
		const data = await res.json();
		return json({ data: data }, { status: 200 });
	} catch (error: any) {
		return json({ message: error?.message || 'Internal Server Error' }, { status: 500 });
	}
}) satisfies RequestHandler;
