<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ArrowUpCircle, Loader2, Eraser } from 'lucide-svelte/icons';
	import { isNonEmptyString } from '$lib/is';
	import { cn } from '$lib/utils';

	interface Props {
		value: string;
		loading?: boolean;
		placeholder?: string;
		className?: string;
		prefix?: Snippet;
		onSubmit?: () => void;
		[key: string]: any;
	}

	let {
		value = $bindable(),
		loading = false,
		placeholder = '请输入...',
		className = '',
		prefix,
		onSubmit,
		...rest
	}: Props = $props();

	function handleClear() {
		value = '';
	}

	function handleSubmit() {
		onSubmit?.();
	}
</script>

<div
	class={cn(
		'relative flex w-full items-end justify-between rounded-[28px] bg-zinc-100 pl-10',
		className
	)}
>
	{#if prefix}
		<div class="absolute bottom-0 left-0 z-10 flex">
			{@render prefix()}
		</div>
	{/if}
	<input
		class={cn(
			'h-14 w-full flex-1 overflow-hidden',
			'resize-none bg-transparent outline-none placeholder:truncate',
			isNonEmptyString(value) ? 'pr-32' : 'pr-16'
		)}
		bind:value
		{placeholder}
		{...rest}
	/>
	<div class="absolute bottom-0 right-0 z-10 flex">
		{#if isNonEmptyString(value)}
			<button
				class="flex h-14 w-14 cursor-pointer items-center justify-center text-zinc-400 hover:text-zinc-700"
				onclick={handleClear}
			>
				<Eraser class="h-4 w-4" />
			</button>
		{/if}
		<button
			class="flex h-14 w-14 cursor-pointer items-center justify-center text-zinc-500 hover:text-zinc-700"
			disabled={loading}
			onclick={handleSubmit}
		>
			{#if loading}
				<Loader2 class="h-5 w-5 animate-spin" />
			{:else}
				<ArrowUpCircle class="h-5 w-5" />
			{/if}
		</button>
	</div>
</div>
