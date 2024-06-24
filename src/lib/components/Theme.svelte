<script lang="ts">
	import themeStore from '$lib/stores/theme';
	import { Moon, Sun, LaptopMinimal } from 'lucide-svelte/icons';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	const themes = ['light', 'dark', 'system'];

	const handleChangeTheme = (theme: Theme) => {
		if (theme === 'system' || theme === 'light') {
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.add('dark');
		}
		themeStore.update(() => theme);
	};

	const handleColorSchemeChange = (event: any) => {
		if ($themeStore !== 'system') return;
		if (event.matches) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	$effect(() => {
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', handleColorSchemeChange);

		return () =>
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.removeEventListener('change', handleColorSchemeChange);
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="sm" variant="ghost">
			{#if $themeStore === 'system'}
				<LaptopMinimal class="h-4 w-4" />
			{/if}
			{#if $themeStore === 'light'}
				<Sun class="h-4 w-4" />
			{/if}
			{#if $themeStore === 'dark'}
				<Moon class="h-4 w-4" />
			{/if}
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			{#each themes as theme}
				<DropdownMenu.Item onclick={()=>handleChangeTheme(theme as Theme)}>
					<span class="first-letter:uppercase">{theme}</span>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
