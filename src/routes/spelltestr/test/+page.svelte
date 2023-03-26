<script lang="ts">
	import { spelltestr } from '$lib/stores';
	import { getExampleOrDefinition } from '../dictionary';
	import { shuffle } from 'lodash-es';
	import InputGroup from '$lib/InputGroup.svelte';
	let words = shuffle($spelltestr.wordlist);
	function speak(message: string) {
		if ('speechSynthesis' in window) {
			window.speechSynthesis.cancel();
			// Speech Synthesis supported 🎉
			var msg = new SpeechSynthesisUtterance();
			// The ancient art of pulling numbers from my a**
			msg.rate = 0.3; // From 0.1 to 10
			msg.pitch = 1; // From 0 to 2
			msg.text = message;
			window.speechSynthesis.speak(msg);
		} else {
			// Speech Synthesis Not Supported 😣
			alert("Sorry, your browser doesn't support text to speech!");
		}
	}
	let currentWord = 0;
	$: word = words[currentWord];
</script>

{#if words.length === 0}
	<p>Ya got no words</p>
	<a class="btn btn-primary" href="/spelltestr">go home</a>
{:else}
	<p>Currently at word {currentWord + 1}/{words.length}</p>
	<button class="btn btn-primary" on:click={() => speak(word)}>Word</button>
	{#await getExampleOrDefinition(word) then { example, definition }}
		<button
			class="btn btn-primary"
			disabled={!example}
			on:click={async () => {
				if (example === undefined) return;
				speak(example);
			}}>Example</button
		>
		<button
			class="btn btn-primary"
			disabled={!definition}
			on:click={async () => {
				if (definition === undefined) return;
				speak(definition);
			}}>Definition</button
		>
	{/await}
	<InputGroup
		buttonText="Submit"
		on:submit={(event) => {
			$spelltestr.responses[word] = event.detail;
			currentWord++;
			if (currentWord == words.length) {
				window.location.href = './results';
			}
			window.speechSynthesis.cancel();
		}}
	/>
{/if}
