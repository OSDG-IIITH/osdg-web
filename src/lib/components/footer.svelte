<script lang="ts">
	const socials = [
		{ kind: 'github', href: 'https://github.com/OSDG-IIITH' },
		{ kind: 'twitter', href: 'https://twitter.com/osdg_iiithyd' },
		{ kind: 'linkedin', href: 'https://linkedin.com/company/osdg' },
		{ kind: 'rss', href: '/rss.xml' }
	];
</script>

<footer class="border-t border-border mt-24">
	<div
		class="max-w-[1200px] mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[13px]"
	>
		<div class="text-fg-dim">
			<span class="text-mute">$</span> echo "made with
			<span class="text-accent" style="font-family:'Source Serif 4',serif">♥︎</span>
			by OSDG"
		</div>

		<div class="flex items-center gap-1">
			{#each socials as s (s.kind)}
				<a
					href={s.href}
					class="w-8 h-8 grid place-items-center rounded text-fg-dim hover:text-accent hover:bg-panel transition-colors"
					aria-label={s.kind}
					target="_blank"
					rel="noopener noreferrer"
				>
					{#if s.kind === 'github'}
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 5.77 5.07 5.07 0 0 0 18.91 2S17.73 1.65 15 3.48a13.38 13.38 0 0 0-7 0C5.27 1.65 4.09 2 4.09 2A5.07 5.07 0 0 0 4 5.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 19.13V23"
							/>
						</svg>
					{:else if s.kind === 'twitter'}
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M22 4s-.7 2.1-2 3.4c1.6 9.3-9.4 16.4-18 11 2.5.2 5-.6 7-2C2 14 .5 6 4 2c2 2.4 5 3.8 8 4 0-2.4 2-4 4-4s4 2 4 4c1 0 2-.4 3-1Z"
							/>
						</svg>
					{:else if s.kind === 'linkedin'}
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
							<rect x="2" y="9" width="4" height="12" />
							<circle cx="4" cy="4" r="2" />
						</svg>
					{:else if s.kind === 'rss'}
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M4 11a9 9 0 0 1 9 9" />
							<path d="M4 4a16 16 0 0 1 16 16" />
							<circle cx="5" cy="19" r="1" />
						</svg>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</footer>
