<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Loader2, ArrowLeft } from 'lucide-svelte/icons';
	import { Button } from '$lib/components/ui/button';
	import { timeAgo } from '$lib/utils';
	import { page } from '$app/stores';
	import { Badge } from '$lib/components/ui/badge';

	const { id } = $page.params;

	let loading = $state(true);

	let creation = $state<Creations>();

	const fetchData = async () => {
		if (!id) return;
		try {
			loading = true;
			const res = await fetch(`/api/generations/${id}`, { method: 'GET' });
			const data = await res.json();
			if (!res.ok) throw new Error(data?.message ?? 'Failed to generate');
			creation = data?.data;
		} catch (error: any) {
			toast(error?.message);
		} finally {
			loading = false;
		}
	};

	fetchData();
</script>

<svelte:head>
	<title>{creation?.prompt} | Luma Mock</title>
</svelte:head>

<div class="py-5">
	<div class="container m-auto">
		<div class="mb-2">
			<Button class="px-0" variant="link" href="/">
				<ArrowLeft class="mr-2 h-4 w-4" />
				Back
			</Button>
		</div>
		{#if loading}
			<div class="flex justify-center p-4">
				<Loader2 class="animate-spin" />
			</div>
		{:else}
			<div class="space-y-4">
				<video
					src={creation?.video?.url}
					class="w-full overflow-hidden rounded-md"
					controls
					autoplay
					loop
				>
					<track kind="captions" src={creation?.video?.url} />
				</video>
				<h2 class="text-2xl">{creation?.prompt}</h2>
				<p>
					<Badge>{timeAgo(creation?.created_at)}</Badge>
				</p>
			</div>
		{/if}
	</div>
</div>
