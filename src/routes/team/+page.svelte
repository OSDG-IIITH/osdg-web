<script lang="ts">
	import Avatar from '$lib/components/avatar.svelte';
	import team from '$lib/../data/team.json';

	const total = team.reduce((n, g) => n + g.members.length, 0);

	function scrollto(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<main class="max-w-[1200px] mx-auto px-6 lg:px-10 pt-16 pb-12">
	<div class="font-mono mb-10">
		<div class="flex items-baseline gap-2">
			<span class="text-accent select-none">$</span>
			<h1 class="text-fg text-[28px] md:text-[34px] font-medium tracking-tight leading-none">
				ls team/
			</h1>
		</div>
		<p class="text-fg-dim text-[14px] mt-3 max-w-2xl leading-relaxed">
			These <span class="text-accent">{total}</span> people keep everything running.
		</p>
	</div>

	<!-- TOC -->
	<nav class="max-w-[800px] mb-14 bg-panel/40 border border-border rounded-lg p-5 font-mono text-[13px] leading-[1.9]">
		<!--<div class="text-mute text-[11px] uppercase tracking-[0.16em] mb-3">$ ls team/</div>-->
		<div class="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-1">
			{#each team as g (g.id)}
				<button
					onclick={() => scrollto(`team-${g.id}`)}
					class="text-fg-dim hover:text-accent text-left"
				>
					<span class="text-accent">{g.id}/</span>
				</button>
			{/each}
		</div>
	</nav>

	<!-- sections -->
	{#each team as g (g.id)}
		<section id="team-{g.id}" class="mb-18" style="scroll-margin-top:5rem">
			<div class="font-mono mb-6 flex items-baseline gap-2 flex-wrap pb-3 border-b border-border">
				<span class="text-accent text-[12px]">$</span>
				<span class="text-fg-dim text-[12px]">ls team/{g.id}/</span>
				<span class="ml-auto text-mute text-[11px]">
					{g.members.length}
					{g.members.length === 1 ? 'person' : 'people'}
				</span>
			</div>
			<h2 class="font-mono text-fg text-[20px] font-medium tracking-tight mb-6">{g.label}</h2>
			<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-3 gap-y-8">
				{#each g.members as m (m.handle)}
					<div class="flex flex-col items-start gap-2">
						<div class="relative">
							<Avatar name={m.name} handle={m.handle} size={180} />
							{#if m.isHead}
								<span class="absolute -top-1.5 -right-1.5 bg-accent text-bg text-[9px] font-mono font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded">
									head
								</span>
							{/if}
						</div>
						<div class="font-mono text-fg text-[13px] font-medium leading-tight">{m.name}</div>
					</div>
				{/each}
			</div>
		</section>
	{/each}
</main>
