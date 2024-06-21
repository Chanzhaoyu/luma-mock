<script lang="ts">
	import { Loader } from 'lucide-svelte/icons';
	import { get } from '$lib/request';

	interface Usage {
		available: number;
		capacity: number;
		consumed: number;
	}

	let usage = $state<Usage | null>();

	let loading = $state(true);

	const fetchUsage = async () => {
		try {
			loading = true;
			const { data } = await get('/api/generations/usage');
			usage = data;
		} finally {
			loading = false;
		}
	};

	$effect(() => {
		fetchUsage();
	});

	export { fetchUsage };
</script>

{#if loading}
	<div class="items-center">
		<Loader class="h-4 w-4 animate-spin" />
	</div>
{:else if usage}
	<div class="flex items-center gap-1 text-sm">
		<span>用量:</span>
		<span>{usage?.available}/{usage?.capacity}</span>
	</div>
{/if}
