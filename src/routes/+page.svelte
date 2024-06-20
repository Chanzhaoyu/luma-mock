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
	import { post, get } from '$lib/request';

	interface UploadFileProps {
		process: boolean;
		error: boolean;
		url: string | null;
		blob: string | null;
	}

	const defaultUploadFile = (): UploadFileProps => ({
		process: false,
		error: false,
		url: null,
		blob: null
	});

	let prompt = $state('');

	let idea = $state(ideas[0]);

	let loading = $state(true);

	let generateLoading = $state(false);

	let uploadFile = $state<UploadFileProps>(defaultUploadFile());

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
			const payload: Record<string, string> = { prompt: prompt.trim() };
			if (uploadFile.url) payload['image'] = uploadFile.url;
			await post('/api/generations/create', { body: payload });
			prompt = '';
			toast('Successfully generated');
			handleClearFile();
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
			const res = await get('/api/generations?limit=30');
			list = res?.data ?? [];
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
		uploadFile = defaultUploadFile();
		fileInput?.setAttribute('value', '');
	}

	async function onFileInputChange(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => (uploadFile.blob = e.target?.result as string);
		reader.readAsDataURL(file);

		const formData = new FormData();
		formData.append('file', file);

		try {
			uploadFile.process = true;
			const res = await post<{ data: UploadFile }>('/api/generations/upload', { body: formData });
			uploadFile.url = res.data.public_url;
		} catch (error: any) {
			toast(error?.message);
		} finally {
			uploadFile.process = false;
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
					uploadFile.blob ? 'pt-10' : ''
				)}
			>
				<div class="absolute bottom-0 left-0 z-10">
					<button
						tabindex="0"
						class="flex h-14 w-14 cursor-pointer items-center justify-center text-zinc-500 hover:text-zinc-700"
						disabled={uploadFile.process}
						onclick={handleUpload}
					>
						<input
							accept="image/*"
							class="hidden"
							type="file"
							bind:this={fileInput}
							onchange={onFileInputChange}
						/>
						<Image class="h-5 w-5" />
					</button>
				</div>
				<input
					class={cn(
						'h-14 w-full flex-1 resize-none overflow-hidden bg-transparent pl-16 outline-none placeholder:truncate',
						isNonEmptyString(prompt) ? 'pr-32' : 'pr-16'
					)}
					placeholder="输入文字或添加图片..."
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
				{#if uploadFile.blob}
					<div
						class="group absolute left-[25px] top-[-55px] aspect-[1/1.3] h-[100px] overflow-hidden rounded-xl"
						style="transform: translateY(0px) scale(1) rotate(-3deg) translateZ(0px); opacity: 1;"
					>
						<button
							class="absolute right-0 top-0 z-20 flex h-5 w-5 rounded-full bg-black opacity-0 transition-opacity group-hover:opacity-100"
							style="transform: translateX(-3px) translateY(3px) scale(1) translateZ(0px);"
							onclick={handleClearFile}
						>
							<X class="m-auto h-4 w-4 text-white" />
						</button>
						<img
							class="size-full bg-zinc-200 object-cover"
							src={uploadFile?.blob}
							alt="attachment"
							style="box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 12px 0px;"
						/>
						{#if uploadFile.process}
							<div
								class="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/15 backdrop-blur-md"
							>
								<Loader2 class="h-4 w-4 animate-spin text-white" />
							</div>
						{/if}
						{#if uploadFile.error}
							<div
								class="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/15 backdrop-blur-md"
							>
								<span class="text-xs text-white">失败</span>
							</div>
						{/if}
					</div>
				{/if}
			</div>
			<div class="mt-2 flex gap-2 px-5 text-zinc-400">
				<button class="hover:text-zinc-700" onclick={handleRandomIdea} title="随机">
					<RotateCw class="h-4 w-4" />
				</button>
				<div class="flex items-center gap-1 truncate text-sm">
					<b>灵感:</b>
					<button class="flex-1 hover:text-zinc-700" onclick={() => (prompt = idea)}>
						{idea}
					</button>
				</div>
			</div>
		</div>
		<div class="">
			<div class="flex items-center justify-between">
				<h2 class="mb-4 text-3xl font-bold tracking-tight">我的创造</h2>
				<Button size="sm" variant="link" href="/discover">
					发现
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
