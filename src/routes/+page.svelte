<script lang="ts">
	import {
		Image,
		ArrowUpCircle,
		RotateCw,
		Loader2,
		Eraser,
		ExternalLink,
		X
	} from 'lucide-svelte/icons';
	import { toast } from 'svelte-sonner';
	import { ideas } from '$lib/constant/idea';
	import { isNonEmptyString } from '$lib/is';
	import { Button } from '$lib/components/ui/button';
	import Card from '$lib/components/Card.svelte';
	import Empty from '$lib/components/Empty.svelte';
	import { cn } from '$lib/utils';

	let prompt = $state('');

	let idea = $state(ideas[0]);

	let loading = $state(true);

	let uploadLoading = $state(false);

	let generateLoading = $state(false);

	let files = $state<UploadFile | null>(null);

	let list = $state<Creations[]>([]);

	let timer: number | null;

	let fileInput: HTMLInputElement;

	$effect(() => {
		fetchData();

		return () => clearTimer();
	});

	async function handleGenerate() {
		if (!isNonEmptyString(prompt) || loading) return;
		try {
			generateLoading = true;
			const payload: Record<string, string> = { prompt };
			if (files) payload['image_url'] = files?.public_url;
			const res = await fetch('/api/generations/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data?.message ?? 'Failed to generate');
			prompt = '';
			toast('Successfully generated');
			handleClearFile()
			fetchData(false);
		} catch (error: any) {
			toast(error?.message);
		} finally {
			generateLoading = false;
		}
	}

	function handleEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleGenerate();
		}
	}

	async function fetchData(isLoading = true) {
		try {
			clearTimer();
			if (isLoading) loading = true;
			const res = await fetch('/api/generations', { method: 'GET' });
			const data = await res.json();
			if (!res.ok) throw new Error(data?.message ?? 'Failed to generate');
			list = data?.data ?? [];
			checkNoCompletion();
		} catch (error: any) {
			toast(error?.message);
		} finally {
			loading = false;
		}
	}

	async function clearTimer() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}

	function checkNoCompletion() {
		const noCompletion = list.some((item) => item.state !== 'completed');
		if (noCompletion) {
			timer = setTimeout(() => {
				fetchData(false);
			}, 10 * 1000);
		} else {
			clearTimer();
		}
	}

	function handleUpload() {
		fileInput?.click();
	}

	function handleClearFile() {
		files = null;
		fileInput?.setAttribute('value', '');
	}

	async function onFileInputChange(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;
		const formData = new FormData();
		formData.append('file', file);

		try {
			uploadLoading = true;
			const res = await fetch('/api/generations/upload', {
				method: 'POST',
				body: formData
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data?.message ?? 'Failed to generate');
			files = data?.data ?? null;
		} catch (error: any) {
			toast(error?.message);
		} finally {
			uploadLoading = false;
		}
	}

	function handleRandomIdea() {
		const total = ideas.length;
		const random = Math.floor(Math.random() * total);
		idea = ideas[random];
	}
</script>

<div class="py-10">
	<div class="container m-auto">
		<div class="pb-20 pt-10">
			<div
				class={cn(
					'relative flex w-full items-end justify-between rounded-[28px] bg-zinc-100',
					files ? 'pt-10' : ''
				)}
			>
				<div class="absolute bottom-0 left-0 z-10">
					<button
						tabindex="0"
						class="flex h-14 w-14 cursor-pointer items-center justify-center text-zinc-500 hover:text-zinc-700"
						onclick={handleUpload}
					>
						<input
							accept="image/*"
							class="hidden"
							type="file"
							bind:this={fileInput}
							onchange={onFileInputChange}
						/>
						{#if uploadLoading}
							<Loader2 class="h-5 w-5 animate-spin" />
						{:else}
							<Image class="h-5 w-5" />
						{/if}
					</button>
				</div>
				<input
					class={cn(
						'h-14 w-full flex-1 resize-none overflow-hidden bg-transparent pl-16 outline-none placeholder:truncate',
						isNonEmptyString(prompt) ? 'pr-32' : 'pr-16'
					)}
					placeholder="Type some text or add an image..."
					bind:value={prompt}
					onkeypress={handleEnter}
				/>
				<div class="absolute bottom-0 right-0 z-10 flex">
					{#if isNonEmptyString(prompt)}
						<button
							class="flex h-14 w-14 cursor-pointer items-center justify-center text-zinc-400 hover:text-zinc-700"
							onclick={() => {
								prompt = '';
							}}
						>
							<Eraser class="h-4 w-4" />
						</button>
					{/if}
					<button
						class="flex h-14 w-14 cursor-pointer items-center justify-center text-zinc-500 hover:text-zinc-700"
						disabled={generateLoading}
						onclick={handleGenerate}
					>
						{#if generateLoading}
							<Loader2 class="h-5 w-5 animate-spin" />
						{:else}
							<ArrowUpCircle class="h-5 w-5" />
						{/if}
					</button>
				</div>
				{#if files}
					<div
						class="group absolute left-[25px] top-[-55px] aspect-[1/1.3] h-[100px]"
						style="transform: translateY(0px) scale(1) rotate(-3deg) translateZ(0px); opacity: 1;"
					>
						<button
							class="absolute right-0 top-0 flex h-5 w-5 rounded-full bg-black opacity-0 transition-opacity group-hover:opacity-100"
							style="transform: translateX(-3px) translateY(3px) scale(1) translateZ(0px);"
							onclick={handleClearFile}
						>
							<X class="m-auto h-4 w-4 text-white" />
						</button>
						<img
							class="size-full rounded-xl bg-slate-50 object-cover"
							src={files?.public_url}
							alt="attachment"
							style="box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 12px 0px;"
						/>
					</div>
				{/if}
			</div>
			<div class="mt-2 flex gap-2 px-5 text-zinc-400">
				<button class="hover:text-zinc-700" onclick={handleRandomIdea}>
					<RotateCw class="h-4 w-4" />
				</button>
				<div class="flex items-center gap-1 truncate text-sm">
					<b>Idea:</b>
					<button class="flex-1 hover:text-zinc-700" onclick={() => (prompt = idea)}>
						{idea}
					</button>
				</div>
			</div>
		</div>
		<div class="">
			<div class="flex items-center justify-between">
				<h2 class="mb-4 text-3xl font-bold tracking-tight">Your Creations</h2>
				<Button size="sm" variant="link" href="/discover">
					Discover
					<ExternalLink class="ml-2 h-4 w-4" />
				</Button>
			</div>
			{#if loading}
				<div class="flex justify-center p-4">
					<Loader2 class="animate-spin" />
				</div>
			{:else if list.length > 0}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					{#each list as item}
						<Card data={item} />
					{/each}
				</div>
			{:else}
				<Empty />
			{/if}
		</div>
	</div>
</div>
