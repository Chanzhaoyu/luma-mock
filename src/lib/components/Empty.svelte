<script lang="ts">
	import { Inbox } from 'lucide-svelte/icons';
	let { message = 'Not Data' }: { message?: string } = $props();
</script>

<div class="flex py-4">
	<div class="m-auto text-center text-zinc-300">
		<Inbox class="inline-block h-10 w-10" />
		<p>{message}</p>
	</div>
</div>
