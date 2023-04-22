<script>
	import { onMount } from 'svelte';

	let mouseX = 0,
		mouseY = 0;
	let windowWidth = 0,
		windowHeight = 0;
	onMount(() => {
		window.addEventListener('mousemove', (event) => {
			mouseX = event.clientX;
			mouseY = event.clientY;
		});
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		window.addEventListener('resize', () => {
			windowWidth = window.innerWidth;
			windowHeight = window.innerHeight;
		});
	});
</script>

<h1 class="text-3xl">Saisir: Input tracker and HTML tester</h1>
<p>Your mouse is at ({mouseX}, {mouseY})</p>
<p>window.innerWidth = {windowWidth}; window.innerHeight = {windowHeight}</p>
<button
	class="btn btn-primary"
	on:click={() => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}}>Toggle full screen</button
>
