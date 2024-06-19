<script lang="ts">
	import { AlertCircle } from 'lucide-svelte/icons';
	let { message = '' }: { message?: string } = $props();
</script>

<div class="mt-5">
	<div class="container m-auto">
		<div class="rounded-md bg-rose-100 px-4 py-2">
			<div class="text-rose-500 flex items-center gap-2">
				<AlertCircle class="inline-block h-4 w-4" />
				<span>{message}</span>
			</div>
		</div>
	</div>
</div>
