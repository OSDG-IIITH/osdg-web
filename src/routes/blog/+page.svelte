<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const pagesize = 4;
	let page = $state(0);

	const totalpages = $derived(Math.ceil(data.posts.length / pagesize));
	const slice = $derived(data.posts.slice(page * pagesize, page * pagesize + pagesize));

	function fmt(date: string) {
		return new Date(date)
			.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
			.toLowerCase();
	}
</script>

<main class="max-w-[860px] mx-auto px-6 lg:px-10 pt-16 pb-12">
	<div class="font-mono mb-10">
		<div class="flex items-baseline gap-2">
			<span class="text-accent select-none">$</span>
			<h1 class="text-fg text-[28px] md:text-[34px] font-medium tracking-tight leading-none">
				cat blog/index.md
			</h1>
		</div>
		<p class="text-fg-dim text-[14px] mt-3 max-w-2xl leading-relaxed">
			Notes, retrospectives, and the occasional rant from the OSDG team.
		</p>
	</div>

	<ol class="flex flex-col">
		{#each slice as p (p.slug)}
			<li class="border-t border-border first:border-t-0">
				<a href="/blog/{p.slug}" class="group block py-7">
					<div class="font-mono text-[11px] text-mute mb-3 flex items-center gap-2.5 flex-wrap">
						<span>{fmt(p.meta.date)}</span>
						<span class="text-border-2">·</span>
						<span>{p.readtime} min read</span>
						<span class="text-border-2">·</span>
						<span>{p.meta.author}</span>
					</div>
					<h2
						class="font-serif text-fg text-[22px] md:text-[26px] font-semibold leading-tight tracking-tight group-hover:text-accent transition-colors mb-2"
					>
						{p.meta.title}
					</h2>
					<p class="font-serif text-fg-dim text-[15.5px] leading-relaxed mb-3">{p.meta.excerpt}</p>
					<div class="flex items-center gap-1.5 font-mono text-[11px] text-fg-dim flex-wrap">
						{#each p.meta.tags as t (t)}
							<span class="text-mute">#{t}</span>
						{/each}
					</div>
				</a>
			</li>
		{/each}
	</ol>

	{#if totalpages > 1}
		<div
			class="border-t border-border mt-2 pt-8 flex items-center justify-between font-mono text-[12px]"
		>
			<button
				disabled={page === 0}
				onclick={() => (page = Math.max(0, page - 1))}
				class={[
					'px-3 py-2 rounded border transition-colors',
					page === 0
						? 'text-mute border-border cursor-not-allowed opacity-50'
						: 'text-fg-dim hover:text-accent hover:border-accent border-border'
				]}
			>
				← prev
			</button>

			<div class="flex items-center gap-1">
				{#each { length: totalpages } as _, i (i)}
					<button
						onclick={() => (page = i)}
						class={[
							'w-8 h-8 grid place-items-center rounded transition-colors',
							i === page ? 'bg-accent text-bg font-semibold' : 'text-fg-dim hover:text-fg hover:bg-panel'
						]}
					>
						{i + 1}
					</button>
				{/each}
			</div>

			<button
				disabled={page >= totalpages - 1}
				onclick={() => (page = Math.min(totalpages - 1, page + 1))}
				class={[
					'px-3 py-2 rounded border transition-colors',
					page >= totalpages - 1
						? 'text-mute border-border cursor-not-allowed opacity-50'
						: 'text-fg-dim hover:text-accent hover:border-accent border-border'
				]}
			>
				next →
			</button>
		</div>
	{/if}
</main>
