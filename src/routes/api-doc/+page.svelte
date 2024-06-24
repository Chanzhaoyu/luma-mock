<script>
	import { cn } from '$lib/utils';
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title} - Luma Mock</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
</svelte:head>

<section
	class="bg-white bg-[url('/images/hero-pattern_light.svg')] dark:bg-slate-900 dark:bg-[url('/images/hero-pattern_dark.svg')]"
>
	<div class="relative z-10 mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-20">
		<div class="flex items-center justify-center space-x-4 text-center">
			<h1
				class="mb-4 text-4xl font-bold leading-none tracking-tight text-neutral-900 dark:text-white md:text-5xl lg:text-6xl"
			>
				API Reference
			</h1>
			<span class="relative inline-block overflow-hidden rounded-full p-[1px] shadow-sm">
				<span
					class="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f4f4f5_0%,#f4f4f5_50%,#737373_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#121212_0%,#121212_50%,#737373_100%)]"
				></span>
				<div
					class="inline-flex h-full w-full cursor-default items-center justify-center rounded-full border border-neutral-100 bg-neutral-100 px-3 py-1 font-mono text-xs font-medium backdrop-blur-3xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
				>
					beta
				</div>
			</span>
		</div>
		<p class="text-lg font-normal text-gray-500 dark:text-gray-200 sm:px-16 lg:px-48 lg:text-xl">
			RESTFul 风格的 API 接口文档
		</p>
	</div>
</section>

<article
	class={cn(
		'prose dark:prose-invert',
		'mx-auto max-w-3xl px-4 py-10',
		'prose-h2:font-medium',
		'prose-pre:m-0'
	)}
>
	<svelte:component this={data.content} />
</article>
