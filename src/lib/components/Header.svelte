<script lang="ts">
	import { Github } from 'lucide-svelte/icons';
	import { Button } from '$lib/components/ui/button';
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<div class="mr-4 flex items-center">
			<a href="/" class="mr-4 flex items-center space-x-2">
				<img src="/logo.svg" alt="Luma" class="h-10 w-10" />
				<span class="text-2xl font-bold">Luma Mock</span>
			</a>
		</div>
		<div class="flex-1"></div>
		<div class="flex items-center space-x-2">
			<Button variant="ghost" href="https://github.com/chanzhaoyu/luma-mock" target="_blank">
				<Github class="h-4 w-4" />
			</Button>
		</div>
	</div>
</header>
