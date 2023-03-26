<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import { createEventDispatcher } from 'svelte';

	import { isWord } from './dictionary';
	import { normalizeWord } from './utils';
	const dispatch = createEventDispatcher();

	let addMe = '';
	async function submit() {
		addMe = normalizeWord(addMe);
		if (!(await isWord(addMe))) {
			toast.push(`Error: ${addMe} isn't an actual word`);
			return;
		}
		dispatch('submit', addMe);
		addMe = '';
	}
</script>

<div class="form-control">
	<div class="input-group">
		<input
			type="text"
			placeholder="Add a word"
			class="input input-bordered"
			bind:value={addMe}
			on:keyup={(event) => {
				if (event.key === 'Enter') {
					submit();
				}
			}}
		/>
		<button class="btn btn-square btn-primary" disabled={addMe.length === 0} on:click={submit}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
		</button>
	</div>
</div>
