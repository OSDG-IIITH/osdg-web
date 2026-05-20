<script lang="ts">
	import events from '../../data/events.json';
	import projects from '../../data/projects.json';
	import team from '../../data/team.json';

	const activemembers = team
		.filter((group) => group.id !== 'advisors' && group.id !== 'faculty')
		.reduce((total, group) => total + group.members.length, 0);

	const today = new Date();
	const upcomingCount = events.filter((e) => new Date(e.date) >= today).length;

	const stats = [
		{ n: String(projects.length), l: 'live projects', href: '/projects' },
		{ n: String(activemembers), l: 'active members', href: '/team' },
		{ n: '11+ yrs', l: 'been here a while', href: null },
		{ n: String(upcomingCount), l: 'events upcoming', href: '/events' }
	];
</script>

<section class="relative">
	<div class="absolute inset-0 bg-grid bg-grid-fade pointer-events-none"></div>

	<div class="relative max-w-[1200px] mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-20">
		<div class="rise" style="animation-delay:0ms">
			<div class="font-mono text-[13px] text-fg-dim mb-3">
				<span class="text-accent">$</span>
				<span class="text-fg"> whoami</span>
			</div>
		</div>

		<h1
			class="rise font-mono font-medium text-fg text-[40px] sm:text-[56px] md:text-[68px] leading-[1.05] tracking-[-0.02em] max-w-[14ch]"
			style="animation-delay:80ms"
		>
			open source<br />
			developers<br />
			<span class="text-accent cursor">group</span>
		</h1>

		<p
			class="rise mt-8 max-w-[58ch] font-mono text-[14.5px] leading-[1.7] text-fg-dim"
			style="animation-delay:260ms"
		>
			We're a student-run club at <span class="text-fg">IIIT Hyderabad</span> spreading open source culture. We host workshops, run hackathons, and maintain a handful of
			tools the campus actually uses.
		</p>

		<div
			class="rise mt-10 flex flex-wrap items-center gap-3"
			style="animation-delay:380ms"
		>
			<a
				href="/projects"
				class="group inline-flex items-center gap-2 font-mono text-[13px] px-4 py-2.5 rounded bg-accent text-bg font-semibold hover:bg-[#bcd3ff] transition-colors"
			>
				view projects
			</a>
			<a
				href="/team"
				class="inline-flex items-center gap-2 font-mono text-[13px] px-4 py-2.5 rounded border border-border-2 text-fg bg-transparent hover:bg-accent/8 hover:text-fg transition-colors duration-200"
			>
				meet the team
			</a>
			<a
				href="https://github.com/OSDG-IIITH"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 font-mono text-[13px] px-4 py-2.5 rounded text-fg-dim hover:text-fg transition-colors"
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.7"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path
						d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 5.77 5.07 5.07 0 0 0 18.91 2S17.73 1.65 15 3.48a13.38 13.38 0 0 0-7 0C5.27 1.65 4.09 2 4.09 2A5.07 5.07 0 0 0 4 5.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 19.13V23"
					/>
				</svg>
				github.com/OSDG-IIITH
			</a>
		</div>

		<div
			class="rise mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded overflow-hidden border border-border"
			style="animation-delay:500ms"
		>
			{#each stats as s (s.l)}
				{#if s.href}
					<a href={s.href} class="bg-bg px-5 py-5 hover:bg-stat-hover transition-colors duration-150">
						<div class="font-mono text-fg text-[24px] font-semibold tracking-tight">{s.n}</div>
						<div class="font-mono text-mute text-[11px] mt-1 uppercase tracking-[0.14em]">{s.l}</div>
					</a>
				{:else}
					<div class="bg-bg px-5 py-5 hover:bg-stat-hover transition-colors duration-150">
						<div class="font-mono text-fg text-[24px] font-semibold tracking-tight">{s.n}</div>
						<div class="font-mono text-mute text-[11px] mt-1 uppercase tracking-[0.14em]">{s.l}</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>
