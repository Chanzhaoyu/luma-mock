<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Empty from '$lib/components/Empty.svelte';
	import { mockCreations } from '$lib/constant/mock';

	let list = $state<Creations[]>(mockCreations);
</script>

<svelte:head>
	<title>发现 | Luma Mock</title>
</svelte:head>

<div class="py-5">
	<div>
		<div class="container m-auto">
			<h2 class="mb-4 text-3xl font-bold tracking-tight">发现</h2>
			{#if list.length > 0}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					{#each list as item}
						<Card data={item} raw />
					{/each}
				</div>
			{:else}
				<Empty />
			{/if}
		</div>
	</div>
</div>
