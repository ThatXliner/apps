import { persisted } from 'svelte-local-storage-store';
import type { Writable } from 'svelte/store';
export const spelltestr: Writable<{
	wordlist: string[];
	responses: { [key: string]: string };
}> = persisted('spelltestr', {
	wordlist: [],
	responses: {}
});
