<script lang="ts">
	import events from '$lib/../data/events.json';

	const upcoming = events.filter((e) => e.status === 'upcoming');
	const past = events.filter((e) => e.status === 'past');

	const badgeclass: Record<string, string> = {
		conference: 'bg-accent-bg/60 text-accent border-accent/30',
		workshop: 'bg-panel border-border-2 text-fg',
		hackathon: 'bg-[#3a2a1f]/40 border-[#5a3a25]/50 text-warn',
		talk: 'bg-panel border-border-2 text-fg-dim',
		program: 'bg-[#1f3a2c]/40 border-[#2a5a3e]/50 text-ok'
	};

	function day(date: string) {
		return date.split('-').length === 3 ? new Date(date).getDate() : 'TBD';
	}
	function monyr(date: string) {
		if (date.split('-').length === 1) return new Date(date).getFullYear().toString();
		return new Date(date)
			.toLocaleString('en-US', { month: 'short', year: 'numeric' })
			.toLowerCase();
	}
</script>

<main class="max-w-[1200px] mx-auto px-6 lg:px-10 pt-16 pb-12">
	<div class="font-mono mb-10">
		<div class="flex items-baseline gap-2">
			<span class="text-accent select-none">$</span>
			<h1 class="text-fg text-[28px] md:text-[34px] font-medium tracking-tight leading-none">
				ls events/
			</h1>
		</div>
		<p class="text-fg-dim text-[14px] mt-3 max-w-2xl leading-relaxed">
			Sometimes there's food.
		</p>
	</div>

	<!-- upcoming -->
	<div class="flex items-baseline justify-between font-mono mb-5">
		<h2 class="text-fg text-[13px] font-semibold tracking-[0.18em] uppercase">upcoming/</h2>
		<span class="text-mute text-[11px]">{upcoming.length} entries</span>
	</div>
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
		{#each upcoming as e (e.slug)}
			<div class="card-hover relative bg-panel/50 border border-border rounded-lg p-5 flex flex-col gap-4 min-h-[220px]">
				<div class="flex items-start justify-between gap-3">
					<div class="font-mono">
						<div class="text-fg text-[28px] font-semibold leading-none">{day(e.date)}</div>
						<div class="text-mute text-[11px] mt-1 uppercase tracking-[0.16em]">{monyr(e.date)}</div>
					</div>
					<span class="font-mono text-[10.5px] uppercase tracking-[0.14em] px-2 py-0.5 rounded border {badgeclass[e.type] ?? badgeclass.talk}">
						{e.type}
					</span>
				</div>
				<div class="flex-1">
					<h3 class="font-mono text-fg text-[16px] font-semibold leading-tight tracking-tight mb-2">
						{e.name}
					</h3>
					<p class="font-mono text-[12.5px] text-fg-dim leading-relaxed">{e.blurb}</p>
				</div>
				<div class="font-mono text-[11px] text-mute pt-3 border-t border-border flex items-center gap-3 flex-wrap">
					<span>{e.time}</span>
					<span>·</span>
					<span class="text-fg-dim">@ {e.venue}</span>
				</div>
			</div>
		{/each}
	</div>

	<!-- past -->
	<div class="flex items-baseline justify-between font-mono mb-5">
		<h2 class="text-fg text-[13px] font-semibold tracking-[0.18em] uppercase">past/</h2>
		<span class="text-mute text-[11px]">{past.length} entries</span>
	</div>
	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
		{#each past as e (e.slug)}
			<div class="card-hover relative bg-panel/50 border border-border rounded-lg p-5 flex flex-col gap-4 min-h-[220px] opacity-70">
				<div class="flex items-start justify-between gap-3">
					<div class="font-mono">
						<div class="text-fg text-[28px] font-semibold leading-none">{day(e.date)}</div>
						<div class="text-mute text-[11px] mt-1 uppercase tracking-[0.16em]">{monyr(e.date)}</div>
					</div>
					<span class="font-mono text-[10.5px] uppercase tracking-[0.14em] px-2 py-0.5 rounded border {badgeclass[e.type] ?? badgeclass.talk}">
						{e.type}
					</span>
				</div>
				<div class="flex-1">
					<h3 class="font-mono text-fg text-[16px] font-semibold leading-tight tracking-tight mb-2">
						{e.name}
					</h3>
					<p class="font-mono text-[12.5px] text-fg-dim leading-relaxed">{e.blurb}</p>
				</div>
				<div class="font-mono text-[11px] text-mute pt-3 border-t border-border flex items-center gap-3 flex-wrap">
					<span>{e.time}</span>
					<span>·</span>
					<span class="text-fg-dim">@ {e.venue}</span>
				</div>
			</div>
		{/each}
	</div>
</main>
