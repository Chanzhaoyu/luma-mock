<script lang="ts">
	import { MoonIcon, SunIcon } from 'lucide-svelte/icons';
	import { toggleMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
</script>

<Button size="sm" variant="ghost" onclick={toggleMode}>
	{#if $mode === 'light'}
		<SunIcon class="h-4 w-4" />
	{:else}
		<MoonIcon class="h-4 w-4" />
	{/if}
</Button>
