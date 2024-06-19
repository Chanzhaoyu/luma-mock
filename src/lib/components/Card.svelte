<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Download, Loader2, Copy } from 'lucide-svelte/icons';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { onCopy, onDownload, timeAgo } from '$lib/utils';

	let { data, raw }: { data: Creations; raw?: boolean } = $props();

	let videoRef = $state<HTMLVideoElement | null>(null);

	let copied = $state(false);

	const handleCopy = () => {
		onCopy(data.prompt);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	};

	const handleDownload = () => {
		if (!data.video?.url) return;
		onDownload(data.video.url, `${data.id}.mp4`);
	};

	const onVideoPlay = () => {
		if (raw) return;
		videoRef?.play();
	};

	const onVideoPause = () => {
		if (raw) return;
		videoRef?.pause();
	};
</script>

<Card.Root>
	<Card.Header class="p-4 pb-0">
		<h3 class="flex gap-1 truncate text-left">
			<div class="min-w-0 flex-1 truncate font-bold">
				{#if !raw}
					<a class="hover:text-blue-500" href={`/creation/${data.id}`} title={data.prompt}>
						{data.prompt}
					</a>
				{:else}
					<p title={data.prompt}>{data.prompt}</p>
				{/if}
			</div>
			<Badge variant="secondary">{timeAgo(data.created_at)}</Badge>
		</h3>
	</Card.Header>
	<Card.Content class="p-4">
		{#if data.state === 'completed'}
			<video
				src={data.video?.url}
				class="aspect-video min-w-full overflow-hidden rounded-md"
				bind:this={videoRef}
				onmouseenter={onVideoPlay}
				onmouseleave={onVideoPause}
				controls={raw}
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
			<Button variant="outline" size="sm" onclick={handleCopy}>
				<Copy class="mr-2 h-4 w-4" />
				{copied ? 'Copied!' : 'Copy prompt'}
			</Button>
			<Button variant="outline" size="sm" onclick={handleDownload}>
				<Download class="mr-2 h-4 w-4" /> Download
			</Button>
		{/if}
	</Card.Footer>
</Card.Root>
