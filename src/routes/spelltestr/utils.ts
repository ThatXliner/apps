export function normalizeWord(word: string): string {
	return word
		.toLowerCase()
		.replace(/[^a-zA-Z ]+/g, '')
		.replace(/\s+/g, ' ');
}

export function htmlToText(html: string): string {
	// I COULD use DOMParser, but it's slower:
	// https://www.measurethat.net/Benchmarks/Show/24349/0/createelement-vs-dom-parser-v2
	const element = document.createElement('body');
	element.innerHTML = html;
	return element.innerText;
}
