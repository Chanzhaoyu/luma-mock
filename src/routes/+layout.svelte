<script lang="ts">
	import '../app.css';

	import { ModeWatcher, mode } from 'mode-watcher';
	import { setContext, type Snippet } from 'svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import Header from '$lib/components/Header.svelte';
	import Transition from '$lib/components/Transition.svelte';
	import ErrorBanner from '$lib/components/ErrorBanner.svelte';

	const { children, data } = $props();

	setContext('contextProvider', { prepare: data.prepare });
</script>

<svelte:head>
	<title>Luma Mock</title>
</svelte:head>

<ModeWatcher defaultMode="light" />

<div class="relative flex min-h-screen flex-col">
	<Header></Header>
	{#if !data.prepare.ACCESS_TOKEN}
		<ErrorBanner message="ACCESS_TOKEN is not set in the environment variables" />
	{/if}
	<Transition pathname={data.pathname}>
		{@render children()}
	</Transition>
	<Toaster
		position="bottom-right"
		theme={$mode}
		class="toaster group"
		toastOptions={{
			classes: {
				toast: 'group toast dark:group-[.toaster]:bg-neutral-900 group-[.toaster]:font-sans',
				description: 'group-[.toast]:text-xs font-mono'
			}
		}}
	/>
</div>
