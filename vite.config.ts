import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import unocss from 'unocss/vite';
import { presetUno, transformerDirectives } from 'unocss';
import { presetDaisy } from 'unocss-preset-daisy';
export default defineConfig({
	plugins: [
		sveltekit(),
		unocss({
			transformers: [transformerDirectives()],
			presets: [presetUno(), presetDaisy()]
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
