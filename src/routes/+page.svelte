<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import WhatWeDo from '$lib/components/whatwedo.svelte';
	import JoinCta from '$lib/components/joincta.svelte';
	import ProjectCard from '$lib/components/projectcard.svelte';
	import projects from '$lib/../data/projects.json';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function fmt(date: string) {
		return new Date(date)
			.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
			.toLowerCase();
	}
</script>

<main>
	<Hero />

	<!-- projects carousel -->
	<section class="border-t border-border">
		<div class="max-w-[1200px] mx-auto px-6 lg:px-10 pt-16 pb-4">
			<div class="flex items-end justify-between gap-6 mb-8">
				<div>
					<div class="font-mono text-[13px] text-fg-dim mb-2">
						<span class="text-accent">$</span>
						<span class="text-fg"> ls projects/</span>
					</div>
					<h2 class="font-mono text-fg text-[28px] md:text-[32px] tracking-tight">
						things we maintain
					</h2>
				</div>
				<a
					href="/projects"
					class="hidden sm:inline-flex items-center gap-1.5 font-mono text-[12px] text-fg-dim hover:text-accent"
				>
					all projects <span>→</span>
				</a>
			</div>
		</div>

		<div
			class="relative marquee-pause overflow-hidden"
			style="mask-image:linear-gradient(to right,transparent 0,black 6%,black 94%,transparent 100%);-webkit-mask-image:linear-gradient(to right,transparent 0,black 6%,black 94%,transparent 100%)"
		>
			<div class="marquee-track flex gap-5 py-2 pr-5" style="width:max-content">
				{#each [...projects, ...projects] as p, i (`${p.slug}-${i}`)}
					<div class="w-[340px] flex-none" style="height:220px">
						<ProjectCard {p} compact />
					</div>
				{/each}
			</div>
		</div>

		<div class="max-w-[1200px] mx-auto px-6 lg:px-10 pt-6 sm:hidden">
			<a
				href="/projects"
				class="inline-flex items-center gap-1.5 font-mono text-[12px] text-fg-dim hover:text-accent"
			>
				all projects <span>→</span>
			</a>
		</div>
	</section>

	<WhatWeDo />

	<!-- recent writing -->
	<section class="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
		<div class="flex items-end justify-between mb-8">
			<div>
				<div class="font-mono text-[13px] text-fg-dim mb-2">
					<span class="text-accent">$</span>
					<span class="text-fg"> tail -n 3 blog/</span>
				</div>
				<h2 class="font-mono text-fg text-[28px] md:text-[32px] tracking-tight">recent writing</h2>
			</div>
			<a
				href="/blog"
				class="hidden sm:inline-flex items-center gap-1.5 font-mono text-[12px] text-fg-dim hover:text-accent"
			>
				read the blog <span>→</span>
			</a>
		</div>

		<div class="grid md:grid-cols-3 gap-5">
			{#each data.recent as p (p.slug)}
				<a
					href="/blog/{p.slug}"
					class="card-hover group flex flex-col bg-panel/40 border border-border rounded-lg p-5"
				>
					<div class="font-mono text-[11px] text-mute mb-3 flex items-center gap-2">
						<span>{fmt(p.meta.date)}</span>
						<span>·</span>
						<span>{p.meta.readingTime} min</span>
					</div>
					<h3
						class="font-serif text-fg text-[19px] leading-snug font-semibold mb-2 group-hover:text-accent transition-colors"
					>
						{p.meta.title}
					</h3>
					<p
						class="font-serif text-fg-dim text-[14.5px] leading-relaxed"
						style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden"
					>
						{p.meta.excerpt}
					</p>
					<div class="mt-auto pt-4 font-mono text-[11px] text-fg-dim">{p.meta.author}</div>
				</a>
			{/each}
		</div>
	</section>

	<JoinCta />
</main>
