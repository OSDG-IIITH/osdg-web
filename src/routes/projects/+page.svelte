<script lang="ts">
	import TagChip from '$lib/components/tagchip.svelte';
	import ProjectCard from '$lib/components/projectcard.svelte';
	import allprojects from '$lib/../data/projects.json';

	let query = $state('');
	let activetags = $state<string[]>([]);

	const tagcounts = $derived.by(() => {
		const c: Record<string, number> = {};
		for (const p of allprojects) {
			for (const t of p.tags) c[t] = (c[t] || 0) + 1;
		}
		return c;
	});

	const filtered = $derived(
		allprojects.filter((p) => {
			const q = query.trim().toLowerCase();
			const matchq = !q || p.name.toLowerCase().includes(q) || p.blurb.toLowerCase().includes(q);
			const matcht = activetags.length === 0 || activetags.every((t) => p.tags.includes(t));
			return matchq && matcht;
		})
	);

	function toggletag(t: string) {
		activetags = activetags.includes(t) ? activetags.filter((x) => x !== t) : [...activetags, t];
	}
</script>

<main class="max-w-[1200px] mx-auto px-6 lg:px-10 pt-16 pb-12">
	<!-- heading -->
	<div class="font-mono mb-10">
		<div class="flex items-baseline gap-2 flex-wrap">
			<span class="text-accent select-none">$</span>
			<h1 class="text-fg text-[28px] md:text-[34px] font-medium tracking-tight leading-none">
				ls -la projects/
			</h1>
		</div>
		<p class="text-fg-dim text-[14px] mt-3 max-w-2xl leading-relaxed">
			Everything OSDG actively maintains.
		</p>
	</div>

	<!-- filter bar -->
	<div class="flex flex-col gap-4 mb-10">
		<div
			class="flex items-center bg-panel/60 border border-border rounded overflow-hidden max-w-md focus-within:border-accent/60 transition-colors"
		>
			<span
				class="font-mono text-fg-dim text-[13px] select-none bg-border/40 border-r border-border px-3 py-2.5"
				>grep</span
			>
			<input
				type="text"
				bind:value={query}
				placeholder="search"
				class="flex-1 bg-transparent outline-none font-mono text-[13px] text-fg placeholder:text-mute px-5 py-2.5"
			/>
			{#if query}
				<button
					onclick={() => (query = '')}
					class="text-mute hover:text-fg font-mono text-[12px] transition-colors pr-3"
				>
					[x]
				</button>
			{/if}
		</div>

		<div class="flex items-center gap-2 flex-wrap">
			<span class="font-mono text-[11px] text-mute uppercase tracking-[0.16em] mr-1">filter</span>
			{#each Object.entries(tagcounts).sort() as [t, n] (t)}
				<TagChip label={t} count={n} active={activetags.includes(t)} onclick={() => toggletag(t)} />
			{/each}
			{#if activetags.length > 0}
				<button
					onclick={() => (activetags = [])}
					class="font-mono text-[12px] text-fg-dim hover:text-accent ml-2 transition-colors"
				>
					clear
				</button>
			{/if}
		</div>

		<div class="font-mono text-[12px] text-mute">
			→ showing <span class="text-fg">{filtered.length}</span> of {allprojects.length}
		</div>
	</div>

	<!-- grid -->
	{#if filtered.length === 0}
		<div
			class="font-mono text-[13px] text-fg-dim border border-border rounded-lg p-10 text-center"
		>
			<div class="text-mute mb-2">$ grep "{query}" projects/</div>
			<div>nothing matched. try a broader filter.</div>
		</div>
	{:else}
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each filtered as p (p.slug)}
				<ProjectCard {p} />
			{/each}
		</div>
	{/if}
</main>
