<script lang="ts">
	import Avatar from '$lib/components/avatar.svelte';
	import team from '$lib/../data/team.json';

	const total = team.reduce((n, g) => n + g.members.length, 0);

	let windowWidth = $state(0);
	let avatarSize = $derived.by(() => {
		if (windowWidth < 450) {
			return Math.round(180 * (windowWidth / 450));
		}
		return 180;
	});

	function scrollto(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	$effect(() => {
		windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
		const handleResize = () => {
			windowWidth = window.innerWidth;
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<main class="mx-auto max-w-[1200px] px-6 pt-16 pb-12 lg:px-10">
	<div class="mb-10 font-mono">
		<div class="flex items-baseline gap-2">
			<span class="text-accent select-none">$</span>
			<h1 class="text-[28px] leading-none font-medium tracking-tight text-fg md:text-[34px]">
				ls team/
			</h1>
		</div>
		<p class="mt-3 max-w-2xl text-[14px] leading-relaxed text-fg-dim">
			These <span class="text-accent">{total}</span> people keep everything running.
		</p>
	</div>

	<!-- TOC -->
	<nav
		class="mb-14 max-w-[800px] rounded-lg border border-border bg-panel/40 p-5 font-mono text-[13px] leading-[1.9]"
	>
		<!--<div class="text-mute text-[11px] uppercase tracking-[0.16em] mb-3">$ ls team/</div>-->
		<div class="grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-5">
			{#each team as g (g.id)}
				<button
					onclick={() => scrollto(`team-${g.id}`)}
					class="cursor-pointer text-left text-fg-dim hover:text-accent"
				>
					<span class="text-accent">{g.id}/</span>
				</button>
			{/each}
		</div>
	</nav>

	<!-- sections -->
	{#each team as g (g.id)}
		<section id="team-{g.id}" class="mb-18" style="scroll-margin-top:5rem">
			<div class="mb-6 flex flex-wrap items-baseline gap-2 border-b border-border pb-3 font-mono">
				<span class="text-[12px] text-accent">$</span>
				<span class="text-[12px] text-fg-dim">ls team/{g.id}/</span>
				<span class="ml-auto text-[11px] text-mute">
					{g.members.length}
					{g.members.length === 1 ? 'person' : 'people'}
				</span>
			</div>
			<h2 class="mb-6 font-mono text-[20px] font-medium tracking-tight text-fg">{g.label}</h2>
			<div class="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
				{#each g.members as m (m.handle)}
					<div class="flex flex-col items-start gap-2">
						<Avatar name={m.name} handle={m.handle} size={avatarSize} image={m.image} isHead={m.isHead} />
						<div class="font-mono text-[13px] leading-tight font-medium text-fg">{m.name}</div>
					</div>
				{/each}
			</div>
		</section>
	{/each}
</main>
