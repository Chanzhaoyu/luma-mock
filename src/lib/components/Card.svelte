<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Download, Loader2 } from 'lucide-svelte/icons';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { onDownload } from '$lib/utils';

	let { data }: { data: Creations } = $props();

	const handleDownload = () => {
		if (!data.video?.url) return;
		onDownload(data.video.url, `${data.id}.mp4`);
	};
</script>

<Card.Root>
	<Card.Header class="p-4 pb-0">
		<div class="flex items-center justify-between">
			<h3 class="min-w-0 flex-1 truncate text-left hover:text-blue-500">
				<a href={`/creation/${data.id}`} title={data.prompt}>{data.prompt}</a>
			</h3>
			<Badge>{data.state}</Badge>
		</div>
	</Card.Header>
	<Card.Content class="p-4">
		{#if data.state === 'completed'}
			<video
				src={data.video?.url}
				class="aspect-video min-w-full overflow-hidden rounded-md"
				controls
			>
				<track kind="captions" src={data.video?.url} />
			</video>
		{:else}
			<div class="flex aspect-video overflow-hidden rounded-md bg-zinc-100">
				<div class="m-auto">
					<Loader2 class="h-5 w-5 animate-spin" />
				</div>
			</div>
		{/if}
	</Card.Content>
	<Card.Footer class="p-4 pt-0">
		{#if data.state === 'completed'}
			<Button size="sm" onclick={handleDownload}>
				<Download class="mr-2 h-4 w-4" /> Download
			</Button>
		{/if}
	</Card.Footer>
</Card.Root>
