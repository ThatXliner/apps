<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let value: string;
	export let placeholder = '';
	export let buttonClass = 'btn btn-primary';
	export let buttonText: string | undefined = undefined;
	export let reset = true;
	const dispatch = createEventDispatcher();
</script>

<div class="input-group">
	<input
		type="text"
		{placeholder}
		class="input input-bordered"
		bind:value
		on:keyup={(event) => {
			if (event.key === 'Enter') {
				dispatch('submit', value);
				if (reset) {
					value = '';
				}
			}
		}}
	/>
	<button
		class={buttonClass}
		disabled={!value}
		on:click={() => {
			dispatch('submit', value);
			if (reset) {
				value = '';
			}
		}}
		>{#if buttonText === undefined}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>{:else}{buttonText}{/if}
	</button>
</div>
