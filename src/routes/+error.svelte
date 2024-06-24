<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex items-center justify-center text-center" style="height: calc(100vh - 3.6rem)">
	<h1 class="font-bold lg:text-2xl">{$page.status}: {$page?.error?.message}</h1>
</div>
