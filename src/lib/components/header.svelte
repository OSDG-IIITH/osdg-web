<script lang="ts">
	import { page } from '$app/state';
	import Logo from './logo.svelte';

	const nav = [
		{ id: 'home', label: 'home', href: '/' },
		{ id: 'blog', label: 'blog', href: '/blog' },
		{ id: 'projects', label: 'projects', href: '/projects' },
		{ id: 'events', label: 'events', href: '/events' },
		{ id: 'team', label: 'team', href: '/team' }
	];

	let open = $state(false);

	function isactive(href: string) {
		return page.url.pathname === href;
	}
</script>

<header class="sticky top-0 z-40 backdrop-blur bg-bg/80 border-b border-border">
	<div class="max-w-[1200px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
		<Logo />

		<nav class="hidden md:flex items-center gap-1 font-mono text-[13px]">
			{#each nav as item (item.id)}
				<a
					href={item.href}
					class={[
						'px-3 py-1.5 rounded transition-colors',
						isactive(item.href)
							? 'text-accent bg-accent-bg/60'
							: 'text-fg-dim hover:text-fg hover:bg-panel'
					]}
				>
					<span class={isactive(item.href) ? 'text-accent-d' : 'text-mute'}>./</span>{item.label}
				</a>
			{/each}
		</nav>

		<button
			class="md:hidden text-fg-dim hover:text-fg font-mono text-sm px-2 py-1 border border-border rounded"
			onclick={() => (open = !open)}
			aria-label="Toggle menu"
		>
			{open ? '[ x ]' : '[ ≡ ]'}
		</button>
	</div>

	{#if open}
		<div class="md:hidden border-t border-border bg-panel">
			<div class="max-w-[1200px] mx-auto px-6 py-3 flex flex-col gap-1 font-mono text-sm">
				{#each nav as item (item.id)}
					<a
						href={item.href}
						onclick={() => (open = false)}
						class={[
							'px-3 py-2 rounded transition-colors',
							isactive(item.href) ? 'text-accent bg-accent-bg/60' : 'text-fg-dim hover:text-fg'
						]}
					>
						<span class="text-mute">./</span>{item.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</header>
