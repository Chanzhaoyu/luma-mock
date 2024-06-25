<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { isNonEmptyString } from '../is';
	import { isImageUrl } from '../utils';

	interface Props {
		open: boolean;
		onConfirm?: (value: string) => void;
	}

	let { open = $bindable(), onConfirm }: Props = $props();

	let value = $state('');

	const handleOpenChange = () => {
		if (open) value = '';
		open = !open;
	};

	const handleConfirm = () => {
		if (!isNonEmptyString(value) || !isImageUrl(value)) {
			return toast('请输入正确的图片链接');
		}
		onConfirm?.(value.trim());
		value = '';
		open = false;
	};
</script>

<Dialog.Root {open} onOpenChange={handleOpenChange}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>网络图片</Dialog.Title>
			<Dialog.Description>请复制并粘贴您的网络图片链接</Dialog.Description>
		</Dialog.Header>
		<div class="py-4">
			<Input id="setting-secret" bind:value class="flex-1" />
		</div>
		<Dialog.Footer>
			<Button onclick={handleConfirm}>确定</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
