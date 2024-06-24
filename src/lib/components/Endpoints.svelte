<script lang="ts">
	import { cn } from '$lib/utils';

	type methodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

	export let method: methodType;
	export let title: string;
	export let description: string;
</script>

<div class={cn('rounded-lg border-2 border-neutral-100 dark:border-neutral-800', 'mb-2 p-4')}>
	<div class="mb-4 flex items-center space-x-4">
		<p
			class={cn(
				'm-0 select-none rounded-md px-1.5 py-0.5 text-sm font-medium leading-5',
				method === 'GET' &&
					' bg-green-400/20 text-green-600 dark:bg-green-400/20 dark:text-green-500',
				method === 'POST' && ' bg-blue-400/20 text-blue-600 dark:bg-blue-400/20 dark:text-blue-500',
				method === 'PUT' &&
					' bg-yellow-400/20 text-yellow-600 dark:bg-yellow-400/20 dark:text-yellow-500',
				method === 'PATCH' &&
					' bg-yellow-400/20 text-yellow-600 dark:bg-yellow-400/20 dark:text-yellow-500',
				method === 'DELETE' && ' bg-red-400/20 text-red-600 dark:bg-red-400/20 dark:text-red-500'
			)}
		>
			{method}
		</p>
		<div class="m-0 flex flex-col space-y-0">
			<h3 class="m-0 font-medium">{title}</h3>
			<p class="mb-0 font-mono text-sm">{description}</p>
		</div>
	</div>
	<slot />
</div>
