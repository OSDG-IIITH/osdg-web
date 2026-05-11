<script lang="ts">
	interface Project {
		slug: string;
		name: string;
		blurb: string;
		glyph: string;
		tags: string[];
		github: string;
		deploy: string | null;
		stars: number;
	}

	interface Props {
		p: Project;
		compact?: boolean;
	}

	let { p, compact = false }: Props = $props();

	let stars = $state(p.stars);

	const TTL = 3_600_000; // 1 hour

	$effect(() => {
		const match = p.github?.match(/github\.com\/([^/]+\/[^/]+)/);
		if (!match) return;
		const repo = match[1];
		const key = `stars:${repo}`;

		try {
			const cached = localStorage.getItem(key);
			if (cached) {
				const { count, ts } = JSON.parse(cached);
				if (Date.now() - ts < TTL) {
					stars = count;
					return;
				}
			}
		} catch {}

		fetch(`https://api.github.com/repos/${repo}`)
			.then((r) => (r.ok ? r.json() : null))
			.then((data) => {
				if (typeof data?.stargazers_count === 'number') {
					stars = data.stargazers_count;
					try {
						localStorage.setItem(key, JSON.stringify({ count: stars, ts: Date.now() }));
					} catch {}
				}
			})
			.catch(() => {});
	});
</script>

<div
	class={[
		'card-hover group relative bg-panel/60 border border-border rounded-lg p-5 flex flex-col gap-4',
		compact ? 'h-full' : 'min-h-[210px]'
	]}
>
	<div class="flex items-start justify-between gap-3">
		<div class="flex items-center gap-3 min-w-0">
			<div
				class="w-11 h-11 grid place-items-center rounded font-mono font-bold flex-none text-[18px]"
				style="background:linear-gradient(135deg,rgba(168,197,255,0.18) 0%,rgba(168,197,255,0.05) 100%);border:1px solid #1d2330;color:#cfe0ff"
			>
				{p.glyph}
			</div>
			<div class="min-w-0">
				<div class="font-mono text-fg text-[15px] font-semibold leading-tight truncate">{p.name}</div>
				<div class="font-mono text-mute text-[11px] mt-0.5">OSDG-IIITH / {p.name}</div>
			</div>
		</div>
		<div class="flex items-center gap-1 font-mono text-[11px] text-fg-dim flex-none mt-1">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
				<polygon points="12 2 15 9 22 10 17 15 18 22 12 18 6 22 7 15 2 10 9 9 12 2" />
			</svg>
			<span>{stars}</span>
		</div>
	</div>

	<p class="font-mono text-[12.5px] leading-relaxed text-fg-dim flex-1">{p.blurb}</p>

	<div class="flex items-end justify-between gap-3">
		<div class="flex flex-wrap gap-1.5">
			{#each p.tags as tag (tag)}
				<span class="font-mono text-[11px] text-fg-dim border border-border rounded px-1.5 py-0.5">
					<span class="text-mute">#</span>{tag}
				</span>
			{/each}
		</div>
		<div class="flex items-center gap-1 flex-none">
			{#if p.github}
				<a
					href={p.github}
					target="_blank"
					rel="noopener noreferrer"
					class="w-8 h-8 grid place-items-center rounded border border-border text-fg-dim hover:text-accent hover:border-accent/40 transition-colors"
					aria-label="{p.name} on GitHub"
				>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
						<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 5.77 5.07 5.07 0 0 0 18.91 2S17.73 1.65 15 3.48a13.38 13.38 0 0 0-7 0C5.27 1.65 4.09 2 4.09 2A5.07 5.07 0 0 0 4 5.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 19.13V23" />
					</svg>
				</a>
			{/if}
			{#if p.deploy}
				<a
					href={p.deploy}
					target="_blank"
					rel="noopener noreferrer"
					class="w-8 h-8 grid place-items-center rounded border border-border text-fg-dim hover:text-accent hover:border-accent/40 transition-colors"
					aria-label="Open {p.name}"
				>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
						<path d="M7 17 17 7" /><path d="M7 7h10v10" />
					</svg>
				</a>
			{/if}
		</div>
	</div>
</div>
