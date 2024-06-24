import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue: Theme = 'system';
const initialValue = browser
	? (window.localStorage.getItem('theme') as Theme) ?? defaultValue
	: defaultValue;

const theme = writable<Theme>(initialValue);

theme.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('theme', value);
	}
});

export default theme;
