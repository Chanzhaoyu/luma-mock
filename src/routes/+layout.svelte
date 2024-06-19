<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import Header from '$lib/components/Header.svelte';
	import ErrorBanner from '$lib/components/ErrorBanner.svelte';
	import { isNonEmptyString } from '$lib/is';

	let { children, data }: { children: Snippet; data: { errorMessage?: string } } = $props();
</script>

<svelte:head>
	<title>Luma Mock</title>
</svelte:head>

<div class="relative flex min-h-screen flex-col">
	<Header></Header>
	{#if isNonEmptyString(data?.errorMessage)}
		<ErrorBanner message={data.errorMessage} />
	{/if}
	{@render children()}
	<Toaster theme="light" />
</div>
