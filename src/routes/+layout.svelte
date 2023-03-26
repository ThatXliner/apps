<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import './app.css';
	import '@unocss/reset/tailwind.css';
	// Import `@kidonng/daisyui` **BEFORE** `uno.css`
	import '@kidonng/daisyui/index.css';
	import 'uno.css';

	const options = {};
</script>

<SvelteToast {options} />
<slot />
