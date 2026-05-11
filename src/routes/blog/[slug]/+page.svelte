<script lang="ts">
	import type { PageData } from './$types';
	import type { Component } from 'svelte';

	let { data }: { data: PageData } = $props();

	let PostContent = $derived(data.component as Component);

	function fmt(date: string) {
		return new Date(date)
			.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
			.toLowerCase();
	}
</script>

<main class="max-w-[760px] mx-auto px-6 lg:px-10 pt-16 pb-12">
	<a
		href="/blog"
		class="font-mono text-[12px] text-fg-dim hover:text-accent inline-flex items-center gap-1.5 mb-10"
	>
		← cd ../blog
	</a>

	<div class="font-mono text-[12px] text-mute mb-3">
		$ cat blog/{data.slug}.md
	</div>

	<h1
		class="font-serif text-fg text-[34px] md:text-[42px] font-semibold leading-[1.15] tracking-tight mb-5"
	>
		{data.meta.title}
	</h1>

	<div
		class="font-mono text-[12px] text-fg-dim flex items-center gap-3 flex-wrap mb-12 pb-8 border-b border-border"
	>
		<span>{data.meta.author}</span>
		<span class="text-mute">·</span>
		<span>{fmt(data.meta.date)}</span>
		<span class="text-mute">·</span>
		<span>{data.readtime} min read</span>
		<span class="text-mute">·</span>
		<span class="flex gap-1.5">
			{#each data.meta.tags as t (t)}
				<span>#{t}</span>
			{/each}
		</span>
	</div>

	<article class="prose-article">
		<PostContent />
	</article>

	<div
		class="mt-16 pt-8 border-t border-border font-mono text-[12px] text-fg-dim flex justify-between"
	>
		<a href="/blog" class="hover:text-accent">← all posts</a>
		<span class="text-mute">EOF</span>
	</div>
</main>
