<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte/icons';
	import { Button } from '$lib/components/ui/button';
	import { toggleMode, mode } from 'mode-watcher';

	const handleChangeTheme = () => {
		toggleMode();
	};
</script>

{#if $mode}
	<Button size="sm" variant="ghost" onclick={() => handleChangeTheme()}>
		{#if $mode === 'light'}
			<Moon class="h-4 w-4" />
		{:else}
			<Sun class="h-4 w-4" />
		{/if}
	</Button>
{/if}
