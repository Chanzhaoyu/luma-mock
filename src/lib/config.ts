import { env } from '$env/dynamic/private';

const defaultAPIUrl = 'https://internal-api.virginia.labs.lumalabs.ai';

export type Config = {
	ACCESS_TOKEN: string | null;
	API_URL: string;
};

export const config: Config = {
	ACCESS_TOKEN: getEnvVariable('ACCESS_TOKEN'),
	API_URL: getEnvVariable('API_URL') || defaultAPIUrl
};

export function getEnvVariable(key: string): string | null {
	const value = env[key];
	if (value === undefined) return null;
	return value;
}

export function getNumericEnvVariable(key: string, defaultValue: number): number {
	const value = getEnvVariable(key) ?? String(defaultValue);
	const parsedValue = parseInt(value, 10);
	if (isNaN(parsedValue)) return defaultValue;
	return parsedValue;
}

export function getBooleanEnvVariable(key: string, defaultValue: boolean): boolean {
	const value = getEnvVariable(key) ?? String(defaultValue);
	return value.toLowerCase() === 'true';
}
