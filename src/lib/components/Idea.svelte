<script lang="ts">
	import { RotateCw } from 'lucide-svelte/icons';
	import { ideas } from '$lib/constant/idea';

	interface Props {
		onClick?: (idea: string) => void;
	}

	const { onClick }: Props = $props();

	const defaultIdea = ideas.length ? ideas[0] : '';

	let idea = $state<string>(defaultIdea);

	const handleRandom = () => {
		const total = ideas.length;
		const random = Math.floor(Math.random() * total);
		idea = ideas[random];
	};

	const handleClick = () => {
		onClick?.(idea);
	};
</script>

<div class="flex flex-1 gap-2 overflow-hidden">
	<button
		class="hover:text-slate-700 dark:hover:text-slate-200"
		title="随机"
		onclick={handleRandom}
	>
		<RotateCw class="h-4 w-4" />
	</button>
	<div class="flex min-w-0 items-center gap-1 text-sm">
		<b>灵感:</b>
		<button
			class="flex-1 truncate hover:text-slate-700 dark:hover:text-slate-200"
			onclick={handleClick}
		>
			{idea}
		</button>
	</div>
</div>
