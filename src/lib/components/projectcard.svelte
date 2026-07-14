<script lang="ts">
	import IconIceberg from '@tabler/icons-svelte/icons/iceberg';

	interface Project {
		slug: string;
		name: string;
		blurb: string;
		glyph: string;
		tags: string[];
		repo: string;
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

	const repoType = $derived(
		p.repo
			? p.repo.includes('github.com')
				? 'github'
				: p.repo.includes('codeberg.org')
					? 'codeberg'
					: p.repo.includes('gitlab')
						? 'gitlab'
						: 'generic'
			: null
	);

	const repoLabel = $derived(
		repoType === 'github'
			? `${p.name} on GitHub`
			: repoType === 'codeberg'
				? `${p.name} on Codeberg`
				: repoType === 'gitlab'
					? `${p.name} on GitLab`
					: `${p.name} Repository`
	);

	const repoOwner = $derived.by(() => {
		if (!p.repo) return 'OSDG-IIITH';
		try {
			const url = new URL(p.repo);
			const parts = url.pathname.split('/').filter(Boolean);
			if (parts.length >= 1) {
				return parts[0];
			}
		} catch {}
		return 'OSDG-IIITH';
	});

	$effect(() => {
		if (!p.repo) return;

		let service: 'github' | 'codeberg' | null = null;
		let repoPath = '';

		const githubMatch = p.repo.match(/github\.com\/([^/]+\/[^/]+)/);
		if (githubMatch) {
			service = 'github';
			repoPath = githubMatch[1];
		} else {
			const codebergMatch = p.repo.match(/codeberg\.org\/([^/]+\/[^/]+)/);
			if (codebergMatch) {
				service = 'codeberg';
				repoPath = codebergMatch[1];
			}
		}

		if (!service || !repoPath) return;

		const key = `stars:${service}:${repoPath}`;

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

		const url = service === 'github'
			? `https://api.github.com/repos/${repoPath}`
			: `https://codeberg.org/api/v1/repos/${repoPath}`;

		fetch(url)
			.then((r) => (r.ok ? r.json() : null))
			.then((data) => {
				const count = service === 'github' ? data?.stargazers_count : data?.stars_count;
				if (typeof count === 'number') {
					stars = count;
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
				<div class="font-mono text-mute text-[11px] mt-0.5">{repoOwner} / {p.name}</div>
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
			{#if p.repo}
				<a
					href={p.repo}
					target="_blank"
					rel="noopener noreferrer"
					class="w-8 h-8 grid place-items-center rounded border border-border text-fg-dim hover:text-accent hover:border-accent/40 transition-colors"
					aria-label={repoLabel}
				>
					{#if repoType === 'github'}
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
							<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 5.77 5.07 5.07 0 0 0 18.91 2S17.73 1.65 15 3.48a13.38 13.38 0 0 0-7 0C5.27 1.65 4.09 2 4.09 2A5.07 5.07 0 0 0 4 5.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 19.13V23" />
						</svg>
					{:else if repoType === 'codeberg'}
						<IconIceberg size={14} stroke={1.7} />
					{:else if repoType === 'gitlab'}
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
							<path d="M4.844.904a1.007 1.007 0 00-.955.692l-2.53 7.783c0 .007-.005.012-.007.02L.07 13.335a1.437 1.437 0 00.522 1.607l11.072 8.045a.566.566 0 00.67-.004l11.074-8.04a1.436 1.436 0 00.522-1.61l-1.26-3.867a.547.547 0 00-.031-.104l-2.526-7.775a1.004 1.004 0 00-.957-.684.987.987 0 00-.949.69l-2.406 7.408H8.203l-2.41-7.408a.987.987 0 00-.943-.69h-.006zm-.006 1.42l2.174 6.678H2.674l2.164-6.678zm14.328 0l2.168 6.678h-4.342l2.174-6.678zm-10.594 7.81h6.862l-2.15 6.618L12 20.693 8.572 10.135zm-5.515.005h4.322l3.086 9.5-7.408-9.5zm13.568 0h4.326l-6.703 8.588-.709.914 2.959-9.108.127-.394zM2.1 10.762l6.978 8.947-7.818-5.682a.305.305 0 01-.112-.341l.952-2.924zm19.8 0l.952 2.922a.305.305 0 01-.11.341v.002l-7.82 5.68.025-.035 6.953-8.91Z" />
						</svg>
					{:else}
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
						</svg>
					{/if}
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
