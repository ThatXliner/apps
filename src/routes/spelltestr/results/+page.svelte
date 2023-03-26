<script lang="ts">
	import { spelltestr } from '$lib/stores';
	$: grade =
		(Object.entries($spelltestr.responses).filter(([k, v]) => k == v).length /
			Object.keys($spelltestr.responses).length) *
		100;
	$: letterGrade =
		grade >= 98
			? 'A+'
			: grade >= 93
			? 'A'
			: grade >= 90
			? 'A-'
			: grade >= 87
			? 'B+'
			: grade >= 83
			? 'B'
			: grade >= 80
			? 'B-'
			: grade >= 77
			? 'C'
			: grade >= 73
			? 'C'
			: grade >= 70
			? 'C-'
			: grade >= 67
			? 'D+'
			: grade >= 63
			? 'D'
			: grade >= 60
			? 'D-'
			: 'F';
</script>

<h1 class="text-5xl my-3 text-center">Let's see how you did</h1>
<table class="table w-full">
	<!-- head -->
	<thead>
		<tr>
			<th>Original</th>
			<th>Your answer</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries($spelltestr.responses) as [original, yours]}
			<tr class:bg-error={original != yours} class:text-error-content={original != yours}>
				<td>{original}</td>
				<td>{yours}</td>
			</tr>
		{/each}
	</tbody>
</table>
<p>
	Your grade: <span>
		{grade}%
	</span>
</p>
<p class="text-3xl">
	That's {letterGrade[0] == 'A' ? 'an' : 'a'}
	{letterGrade}
</p>
<a href="/" class="btn btn-primary">Go back to apps</a>
<a href="/spelltestr" class="btn btn-primary">Go back to spelltestr</a>
