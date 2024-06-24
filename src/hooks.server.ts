import { json, type Handle } from '@sveltejs/kit';
import { config } from '$lib/config';
import { isNonEmptyString } from './lib/is';

export const handle: Handle = async ({ event, resolve }) => {
	const endpoint: string[] = ['/api/generations/create', '/api/generations/upload'];
	const pathname = event.url.pathname;

	// Check if the request is for the endpoint
	if (isNonEmptyString(config.SECRET_KEY)) {
		if (endpoint.includes(pathname)) {
			const secretKey = event.request.headers.get('secret-key');

			if (!secretKey) {
				return json({ message: '没有权限，请前往设置中心填写密钥。' }, { status: 400 });
			}

			if (secretKey.trim() !== config.SECRET_KEY.trim()) {
				return json({ message: '密钥不正确，请重新填写。' }, { status: 400 });
			}
		}
	}

	const response = await resolve(event);

	//  CORS
	response.headers.set('Access-Control-Allow-Origin', config.ALLOW_ORIGIN);
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	return response;
};
