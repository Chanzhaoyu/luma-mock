<script lang="ts">
	import { fade } from 'svelte/transition';

	import { Image, Loader2, ExternalLink, X } from 'lucide-svelte/icons';
	import { toast } from 'svelte-sonner';
	import { isNonEmptyString } from '$lib/is';
	import { cn } from '$lib/utils';
	import { post, get } from '$lib/request';
	import { ideas } from '$lib/constant/idea';

	import { Button } from '$lib/components/ui/button';
	import Card from '$lib/components/Card.svelte';
	import Empty from '$lib/components/Empty.svelte';
	import IdeaComponent from '$lib/components/Idea.svelte';
	import UsageComponent from '$lib/components/Usage.svelte';
	import Input from '$lib/components/Input.svelte';

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

	let usageRef: ReturnType<typeof UsageComponent>;

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
			fetchList(false);
			usageRef?.fetchUsage();
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

	async function fetchList(isLoading = true) {
		try {
			clearTimer();
			if (isLoading) loading = true;
			const res = await get('/api/generations?limit=10');
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
				fetchList(false);
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

	$effect(() => {
		fetchList();

		return () => clearTimer();
	});
</script>

{#snippet prefix()}
	<button
		tabindex="0"
		class="flex h-14 w-14 cursor-pointer items-center justify-center text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-100"
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
{/snippet}

<div class="py-10">
	<div class="container m-auto">
		<div class="pb-20 pt-10">
			<div class="relative">
				<Input
					bind:value={prompt}
					className={cn('pl-16 transition-all ', uploadFile.blob && 'pt-10')}
					loading={generateLoading}
					placeholder="输入文字或添加图片..."
					onkeypress={handleEnter}
					onSubmit={handleGenerate}
					{prefix}
				/>
				{#if uploadFile.blob}
					<div
						class="group absolute left-[25px] top-[-55px] aspect-[1/1.3] h-[100px] overflow-hidden rounded-xl"
						style="transform: translateY(0px) scale(1) rotate(-3deg) translateZ(0px); opacity: 1;"
						transition:fade={{ duration: 200 }}
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
			<div class="mt-2 flex items-center gap-4 px-5 text-zinc-400">
				<IdeaComponent onClick={() => (prompt = idea)} />
				<UsageComponent bind:this={usageRef} />
			</div>
		</div>
		<div>
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
				<div class="flex justify-center py-4">
					<Button variant="ghost" href="/all">更多</Button>
				</div>
			{:else}
				<Empty />
			{/if}
		</div>
	</div>
</div>
