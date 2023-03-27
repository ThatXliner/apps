<script>
	import { base } from '$app/paths';
	const apps = ['spelltestr'];
</script>

<div class="hero min-h-screen bg-base-100">
	<div class="hero-content text-center">
		<div class="max-w-md space-y-6">
			<h1 class="text-5xl font-bold">Available Apps</h1>
			<ul class="menu bg-base-200">
				{#each apps as app}
					<li>
						<a href={`${base}/${app}`}>
							<span class="mr-auto">{app}</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
								/>
							</svg>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
