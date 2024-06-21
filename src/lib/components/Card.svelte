<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Download, Loader2, Blend } from 'lucide-svelte/icons';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { onDownload, timeAgo } from '$lib/utils';
	import { toast } from 'svelte-sonner';

	let { data, raw }: { data: Creations; raw?: boolean } = $props();

	let videoRef = $state<HTMLVideoElement | null>(null);

	const handleExtend = () => {
		toast('暂未开放');
	};

	const handleDownload = () => {
		if (!data.video?.url) return;
		onDownload(data.video.url, `${data.id}.mp4`);
	};
</script>

<Card.Root>
	<Card.Header class="p-4 pb-0">
		<h3 class="flex gap-1 text-left">
			{#if !raw}
				<a
					class="min-w-0 flex-1 truncate hover:text-blue-500"
					href={`/creation/${data.id}`}
					title={data.prompt}
				>
					{data.prompt}
				</a>
				<Badge variant="secondary">{timeAgo(data.created_at)}</Badge>
			{:else}
				<p class="min-w-0 flex-1 truncate" title={data.prompt}>{data.prompt}</p>
			{/if}
		</h3>
	</Card.Header>
	<Card.Content class="p-4">
		{#if data.state === 'completed'}
			<video
				src={data.video?.url}
				class="aspect-video min-w-full overflow-hidden rounded-md"
				bind:this={videoRef}
				controls
				loop
			>
				<track kind="captions" src={data.video?.url} />
			</video>
		{:else}
			<div class="flex aspect-video overflow-hidden rounded-md bg-zinc-100">
				<div class="m-auto text-center">
					<Loader2 class="inline-block h-5 w-5 animate-spin" />
					<p class="mt-2">{data.state}</p>
				</div>
			</div>
		{/if}
	</Card.Content>
	<Card.Footer class="gap-4 p-4 pt-0">
		{#if data.state === 'completed'}
			<Button class="hidden rounded-[20px]" variant="outline" size="sm" onclick={handleExtend}>
				<Blend class="mr-2 h-4 w-4" /> 扩展
			</Button>
			<Button class="rounded-[20px]" variant="outline" size="sm" onclick={handleDownload}>
				<Download class="mr-2 h-4 w-4" /> 下载
			</Button>
		{/if}
	</Card.Footer>
</Card.Root>
