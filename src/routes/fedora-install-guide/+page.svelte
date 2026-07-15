<script lang="ts">
	import content from './content.html?raw';
</script>

<main class="max-w-[900px] mx-auto px-6 lg:px-10 pt-16 pb-12">
	<div class="mb-10 font-mono">
		<div class="flex items-baseline gap-2">
			<span class="text-accent select-none">$</span>
			<h1 class="text-[28px] leading-none font-medium tracking-tight text-fg md:text-[34px]">
				fedora-install-guide
			</h1>
		</div>
		<p class="mt-3 max-w-2xl text-[14px] leading-relaxed text-fg-dim">
			A step-by-step installation and post-install configuration guide for Fedora KDE.
		</p>
		<div class="mt-4 flex gap-4 text-[13px]">
			<a href="/fedora-install-guide/fedora.typ" class="text-accent hover:underline flex items-center gap-1.5" download>
				<span>↓ download original typst source (fedora.typ)</span>
			</a>
		</div>
	</div>

	<article class="guide-content">
		{@html content}
	</article>
</main>

<style>
	@font-face {
		font-family: 'Fira Sans';
		src: url('/fedora-install-guide/fonts/FiraSans-Regular.ttf') format('truetype');
		font-weight: 400;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: 'Fira Sans';
		src: url('/fedora-install-guide/fonts/FiraSans-Italic.ttf') format('truetype');
		font-weight: 400;
		font-style: italic;
		font-display: swap;
	}
	@font-face {
		font-family: 'Fira Sans';
		src: url('/fedora-install-guide/fonts/FiraSans-Medium.ttf') format('truetype');
		font-weight: 500;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: 'Fira Sans';
		src: url('/fedora-install-guide/fonts/FiraSans-SemiBold.ttf') format('truetype');
		font-weight: 600;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: 'Fira Sans';
		src: url('/fedora-install-guide/fonts/FiraSans-Bold.ttf') format('truetype');
		font-weight: 700;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: 'Fira Sans';
		src: url('/fedora-install-guide/fonts/FiraSans-BoldItalic.ttf') format('truetype');
		font-weight: 700;
		font-style: italic;
		font-display: swap;
	}

	/* Custom styles for the installation guide */
	.guide-content {
		font-family: 'Fira Sans', system-ui, -apple-system, sans-serif;
		color: var(--color-fg);
		font-size: 17px;
		line-height: 1.75;
	}

	.guide-content :global(p) {
		margin: 0 0 1.2em;
	}

	.guide-content :global(h1) {
		font-family: 'Fira Sans', system-ui, -apple-system, sans-serif;
		font-size: 32px;
		font-weight: 700;
		color: #f1f4f9;
		margin: 1.5em 0 0.8em;
		letter-spacing: -0.02em;
	}

	.guide-content :global(h2) {
		font-family: 'Fira Sans', system-ui, -apple-system, sans-serif;
		font-size: 23px;
		font-weight: 600;
		color: #f1f4f9;
		margin: 2em 0 0.8em;
		border-bottom: 1px solid var(--color-border);
		padding-bottom: 0.3em;
		scroll-margin-top: 5rem;
	}

	.guide-content :global(h3) {
		font-family: 'Fira Sans', system-ui, -apple-system, sans-serif;
		font-size: 19px;
		font-weight: 600;
		color: #f1f4f9;
		margin: 1.6em 0 0.6em;
		scroll-margin-top: 5rem;
	}

	.guide-content :global(h4) {
		font-family: 'Fira Sans', system-ui, -apple-system, sans-serif;
		font-size: 16px;
		font-weight: 600;
		color: #f1f4f9;
		margin: 1.4em 0 0.4em;
		scroll-margin-top: 5rem;
	}

	.guide-content :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-thickness: 1px;
	}

	.guide-content :global(a:hover) {
		color: var(--color-accent-d);
	}

	.guide-content :global(strong) {
		color: #f1f4f9;
		font-weight: 600;
	}

	.guide-content :global(em) {
		font-style: italic;
		color: var(--color-fg-dim);
	}

	.guide-content :global(code) {
		font-family: var(--font-mono);
		background: var(--color-panel-2);
		padding: 0.15em 0.4em;
		border-radius: 4px;
		font-size: 0.85em;
		color: #cfd9ff;
		border: 1px solid var(--color-border);
	}

	.guide-content :global(pre) {
		font-family: var(--font-mono);
		background: var(--color-panel);
		border: 1px solid var(--color-border);
		padding: 14px 16px;
		border-radius: 8px;
		overflow-x: auto;
		font-size: 14px;
		line-height: 1.6;
		margin: 1.4em 0;
	}

	.guide-content :global(ul) {
		list-style: disc;
		padding-left: 1.5em;
		margin: 0 0 1.2em;
	}

	.guide-content :global(ol) {
		list-style: decimal;
		padding-left: 1.5em;
		margin: 0 0 1.2em;
	}

	.guide-content :global(li) {
		margin: 0.4em 0;
	}

	.guide-content :global(figure) {
		margin: 2em 0;
		text-align: center;
		background: var(--color-panel)/30;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 1rem;
	}

	.guide-content :global(figure img) {
		max-width: 100%;
		height: auto !important;
		max-height: 450px;
		object-fit: contain;
		border-radius: 6px;
		border: 1px solid var(--color-border-2);
		margin: 0 auto 0.8rem;
		display: block;
	}

	.guide-content :global(figcaption) {
		font-family: 'Fira Sans', system-ui, -apple-system, sans-serif;
		font-size: 13px;
		color: var(--color-fg-dim);
	}

	.guide-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.5em 0;
		font-family: 'Fira Sans', system-ui, -apple-system, sans-serif;
		font-size: 15px;
	}

	.guide-content :global(table th), .guide-content :global(table td) {
		border: 1px solid var(--color-border);
		padding: 10px 12px;
		text-align: left;
	}

	.guide-content :global(table tr:nth-child(even)) {
		background: var(--color-panel)/30;
	}

	.guide-content :global(table p) {
		margin: 0;
	}

	.guide-content :global(.sourceCode) {
		margin: 1.2em 0;
	}
	.guide-content :global(.sourceCode pre) {
		margin: 0;
	}
	.guide-content :global(.at) { color: #f1d18a; }
	.guide-content :global(.fu) { color: #a8c5ff; }
	.guide-content :global(.st) { color: #9ee6b4; }

	/* Table of Contents styling */
	.guide-content :global(.toc-nav) {
		background: rgba(16, 20, 28, 0.4);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 1.25rem 1.5rem;
		margin: 1.5em 0 2.5em;
		backdrop-filter: blur(8px);
	}

	.guide-content :global(.toc-nav ul) {
		list-style: none !important;
		padding-left: 0 !important;
		margin: 0 !important;
	}

	.guide-content :global(.toc-nav li) {
		margin: 0.4em 0 !important;
		line-height: 1.5;
	}

	.guide-content :global(.toc-nav a) {
		color: var(--color-fg-dim);
		text-decoration: none !important;
		font-size: 15px;
		transition: color 0.2s ease, transform 0.2s ease;
		display: inline-block;
	}

	.guide-content :global(.toc-nav a:hover) {
		color: var(--color-accent);
		transform: translateX(2px);
	}

	.guide-content :global(.toc-nav .toc-level-3) {
		padding-left: 1.25rem !important;
		margin-top: 0.25em !important;
		margin-bottom: 0.25em !important;
		border-left: 1px solid var(--color-border);
	}

	.guide-content :global(.toc-nav .toc-level-4) {
		padding-left: 1.25rem !important;
		margin-top: 0.2em !important;
		margin-bottom: 0.2em !important;
		border-left: 1px dashed var(--color-border);
	}
</style>
