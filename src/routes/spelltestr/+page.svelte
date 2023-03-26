<script>
	import { spelltestr } from '$lib/stores';
	import Input from './Input.svelte';
</script>

<div class="flex justify-center flex-col min-h-screen bg-base-200 text-center">
	<div class="max-w-md mx-auto">
		<i class="text-gray tracking-widest font-mono my-3"
			><a href="https://github.com/ThatXliner" class="link">@ThatXliner</a> presents...</i
		>
		<h1 class="text-5xl font-bold">Spelling test</h1>
		<p class="py-6">A simple web app I built for my brother</p>
		<div class="divider" />
		<p>To get started, simply enter your testing words below:</p>
	</div>
	<div class="mx-auto mt-5">
		<Input bind:list={$spelltestr.wordlist} />
	</div>
	<ul class="menu bg-base-100 w-56 p-2 my-6 rounded-box mx-auto">
		{#each $spelltestr.wordlist as word, i}
			<li>
				<span
					class="hover:text-error-content hover:bg-error"
					on:click={() => {
						$spelltestr.wordlist = $spelltestr.wordlist.filter((_, x) => x != i);
					}}
					on:keypress={() => {
						$spelltestr.wordlist = $spelltestr.wordlist.filter((_, x) => x != i);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="w-5 h-5 inline"
					>
						<path
							fill-rule="evenodd"
							d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
							clip-rule="evenodd"
						/>
					</svg>{word}
				</span>
			</li>
		{:else}No words!{/each}
	</ul>

	<button
		on:click={() => {
			$spelltestr.responses = {};
			window.location.href = 'spelltestr/test';
		}}
		disabled={$spelltestr.wordlist.length === 0}
		class="mx-auto w-fit btn btn-primary">Start test</button
	>
</div>
