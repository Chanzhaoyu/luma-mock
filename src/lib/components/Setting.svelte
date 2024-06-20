<script lang="ts">
	import { Settings } from 'lucide-svelte/icons';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { browser } from '$app/environment';
	import { toast } from 'svelte-sonner';
	import { LS } from '$lib/storage';

	let open = $state(false);

	let setting = $state({
		secret_key: ''
	});

	if (browser) {
		const localSetting = LS.get('luma_setting');
		if (localSetting) setting = { ...localSetting };
	}

	function handleOpen() {
		open = true;
	}

	function handleSave() {
		LS.set('luma_setting', setting);
		open = false;
		toast('保存成功');
	}
</script>

<Button variant="ghost" onclick={handleOpen}>
	<Settings class="h-4 w-4" />
</Button>

<Dialog.Root {open}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>设置</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="secret" class="text-right">密钥</Label>
				<Input id="secret" bind:value={setting.secret_key} class="col-span-3" />
			</div>
		</div>
		<Dialog.Footer>
			<Button onclick={handleSave}>保存</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
