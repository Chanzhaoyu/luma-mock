import { LS } from '$lib/storage';
import { browser } from '$app/environment';

export type RequestModel = {
	params?: object;
	headers?: object;
	signal?: AbortSignal;
};

export type RequestWithBodyModel = RequestModel & {
	body?: object | FormData;
};

const handleFetch = async (url: string, request: any, signal?: AbortSignal) => {
	const requestUrl = request?.params ? `${url}${request.params}` : url;

	const requestBody = request?.body
		? request.body instanceof FormData
			? { ...request, body: request.body }
			: { ...request, body: JSON.stringify(request.body) }
		: request;

	const headers = {
		...(request?.headers
			? request.headers
			: request?.body && request.body instanceof FormData
				? {}
				: { 'Content-type': 'application/json' })
	};

	if (browser) {
		const localSetting = LS.get('luma_setting');
		if (localSetting?.secret_key) headers['Secret-Key'] = localSetting.secret_key;
	}

	return fetch(requestUrl, { ...requestBody, headers, signal })
		.then(async (response) => {
			if (!response.ok) throw response;
			return await response.json();
		})
		.catch(async (err) => {
			const errResult = await err.json();
			throw new Error(errResult?.message ?? 'Fail fetch');
		});
};

export const get = async <T = any>(url: string, request?: RequestModel): Promise<T> => {
	return handleFetch(url, { ...request, method: 'get' });
};

export const post = async <T = any>(url: string, request?: RequestWithBodyModel): Promise<T> => {
	return handleFetch(url, { ...request, method: 'post' });
};
