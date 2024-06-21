<script lang="ts">
	import { Loader2 } from 'lucide-svelte/icons';
	import Card from '$lib/components/Card.svelte';
	import Empty from '$lib/components/Empty.svelte';
	import { get } from '$lib/request';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	let loading = $state(true);

	let list = $state<Creations[]>([]);

	let offset = $state(0);

	let noMore = $state(false);

	async function fetchList(offset = 0) {
		try {
			loading = true;
			const res = await get(`/api/generations?limit=10&offset=${offset}`);
			const data = Array.isArray(res.data) ? res.data : [];
			return Promise.resolve(data);
		} catch {
			return Promise.reject([]);
		} finally {
			loading = false;
		}
	}

	async function handleMore() {
		const innerOffset = offset + 10;
		const data = await fetchList(innerOffset);
		if (data.length > 0) {
			offset = innerOffset;
			list = [...list, ...data];
		} else {
			noMore = true;
		}
	}

	async function onRender() {
		const data = await fetchList();
		list = [...list, ...data];
	}

	onRender();
</script>

<svelte:head>
	<title>全部 | Luma Mock</title>
</svelte:head>

<div class="py-5">
	<div>
		<div class="container m-auto">
			<h2 class="mb-4 text-3xl font-bold tracking-tight">全部</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each list as item}
					<Card data={item} />
				{/each}
			</div>
			<div class="flex justify-center py-4">
				{#if loading}
					<Loader2 class="animate-spin" />
				{:else if list.length > 0}
					{#if !noMore}
						<Button variant="ghost" onclick={() => handleMore()}>更多</Button>
					{:else}
						<p class="text-sm text-zinc-200">没有更多了</p>
					{/if}
				{:else}
					<Empty />
				{/if}
			</div>
		</div>
	</div>
</div>
