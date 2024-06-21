<script lang="ts">
	import { Moon, Sun, LaptopMinimal } from 'lucide-svelte/icons';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';

	const themes = ['light', 'dark', 'system'];

	let currentTheme = $state();

	const handleColorSchemeChange = (event: any) => {
		if (currentTheme !== 'system') return;
		if (event.matches) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	const handleChangeTheme = (theme: Theme) => {
		if (theme === 'system' || theme === 'light') {
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.add('dark');
		}
		currentTheme = theme;
		localStorage.setItem('theme', theme);
	};

	$effect(() => {
		const localTheme = localStorage.getItem('theme') as Theme;
		currentTheme = localTheme ?? 'system';

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', handleColorSchemeChange);

		return () => mediaQuery.removeEventListener('change', handleColorSchemeChange);
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button size="sm" variant="ghost">
			{#if currentTheme === 'system'}
				<LaptopMinimal class="h-4 w-4" />
			{/if}
			{#if currentTheme === 'light'}
				<Sun class="h-4 w-4" />
			{/if}
			{#if currentTheme === 'dark'}
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
