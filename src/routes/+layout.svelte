<script lang="ts">
	import '../app.css';
	import { setContext, type Snippet } from 'svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import Header from '$lib/components/Header.svelte';
	import ErrorBanner from '$lib/components/ErrorBanner.svelte';

	const { children, data }: { children: Snippet; data: { prepare: Prepare } } = $props();

	setContext('contextProvider', { prepare: data.prepare });
</script>

<svelte:head>
	<title>Luma Mock</title>
</svelte:head>

<div class="relative flex min-h-screen flex-col">
	<Header></Header>
	{#if !data.prepare.ACCESS_TOKEN}
		<ErrorBanner message="ACCESS_TOKEN is not set in the environment variables" />
	{/if}
	{@render children()}
	<Toaster theme="light" />
</div>
