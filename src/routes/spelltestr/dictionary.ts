import { htmlToText } from './utils';
const BASE = `https://en.wiktionary.org/api/rest_v1`;
const USER_AGENT = 'spelltestr/1.0 bryan.hu.2020@gmail.com';
export async function isWord(word: string): Promise<boolean> {
	// https://en.wiktionary.org/w/api.php?action=query&prop=raw&titles=Earth&format=json
	// https://en.wiktionary.org/w/api.php?action=query&prop=info&titles=Earth&format=json
	return await fetch(`${BASE}/page/title/${word.replace(' ', '_')}`, {
		method: 'GET',
		headers: { 'Api-User-Agent': USER_AGENT }
	})
		.then((res) => res.json())
		.then(
			(obj) =>
				'items' in obj &&
				obj.items // make sure it's english words
					.filter((x: { page_language: string }) => x.page_language == 'en').length > 0
		);
}
type ApiResponse = {
	[key: string]: {
		partOfSpeech: string;
		language: string;
		definitions: {
			definition: string;
			parsedExamples?: { example: string }[];
			examples?: string[];
		}[];
	}[];
};
export async function getWord(word: string): Promise<ApiResponse> {
	return await fetch(`${BASE}/page/definition/${word.replace(' ', '_')}`, {
		method: 'GET',
		headers: { 'Api-User-Agent': USER_AGENT }
	}).then((res) => res.json());
}

export async function getExampleOrDefinition(
	word: string
): Promise<{ example?: string; definition?: string }> {
	return {
		example: (await getExamples(word).next()).value ?? undefined,
		definition: (await getDefinitions(word).next()).value ?? undefined
	};
}

async function* getExamples(word: string) {
	for await (const definition of getEnglishDefinitions(word)) {
		if (definition.examples !== undefined) {
			yield htmlToText(definition.examples[0]);
		}
		if (definition.parsedExamples !== undefined) {
			yield htmlToText(definition.parsedExamples[0]?.example);
		}
	}
}
async function* getDefinitions(word: string) {
	for await (const definition of getEnglishDefinitions(word)) {
		yield htmlToText(definition.definition);
	}
}
async function* getEnglishDefinitions(word: string) {
	const response = await getWord(word);
	console.log(response);
	if (response.en === undefined) return;
	for (const englishResponse of response.en) {
		console.assert(englishResponse.language === 'English');

		const definitions = englishResponse.definitions;
		for (const definition of definitions) {
			yield definition;
		}
	}
}
