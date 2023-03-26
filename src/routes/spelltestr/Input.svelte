<script lang="ts">
	import WordInput from './WordInput.svelte';
	import OCRInput from './OCRInput.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	export let list: string[];
	function add(word: string) {
		if (list.includes(word)) {
			toast.push('Error: word already exists');
			return;
		}
		list = [...list, word];
	}
	let mode: 'word' | 'ocr' = 'word';
</script>

<div class="tabs">
	<button
		class="tab tab-lifted"
		class:tab-active={mode == 'word'}
		on:click={() => {
			mode = 'word';
		}}>Word</button
	>
	<button
		class="tab tab-lifted"
		class:tab-active={mode == 'ocr'}
		on:click={() => {
			mode = 'ocr';
		}}>OCR</button
	>
</div>
<div>
	{#if mode === 'word'}
		<WordInput
			on:submit={(event) => {
				add(event.detail);
			}}
		/>
	{:else}
		<OCRInput on:submit={(event) => event.detail.forEach(add)} />
	{/if}
</div>
