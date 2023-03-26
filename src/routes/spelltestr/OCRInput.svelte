<script>
	import { toast } from '@zerodevx/svelte-toast';
	import { createEventDispatcher } from 'svelte';
	import { isWord } from './dictionary';
	import { normalizeWord } from './utils';

	let output = '';
	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col">
	<textarea class="textarea" placeholder="Newline-separated words here" bind:value={output} />
	<button
		class="btn btn-primary"
		disabled={!output}
		on:click={async () => {
			let words = output.split(/\n+/);
			dispatch(
				'submit',
				(
					await Promise.all(
						words.map(async (word) => {
							word = normalizeWord(word);
							if (await isWord(word)) {
								return word;
							} else {
								toast.push(`Error: ${word} isn't an actual word`);
							}
						})
					)
				).filter((x) => x != undefined)
			);
			output = '';
		}}>Submit</button
	>
</div>
