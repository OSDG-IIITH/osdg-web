<script lang="ts">
	interface Props {
		name: string;
		handle: string;
		size?: number;
		image?: string;
		isHead?: boolean;
	}

	let { name, handle, size = 400, image, isHead = false }: Props = $props();

	function hash(s: string) {
		let h = 0;
		for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
		return Math.abs(h);
	}

	const initials = $derived(
		name
			.split(/\s+/)
			.map((p) => p[0])
			.slice(0, 2)
			.join('')
			.toUpperCase()
	);

	const gradient = $derived.by(() => {
		const h = hash(handle || name);
		const hue = 200 + (h % 60);
		const bg1 = `hsl(${hue},55%,78%)`;
		const bg2 = `hsl(${hue + 20},45%,62%)`;
		return `linear-gradient(135deg,${bg1} 0%,${bg2} 100%)`;
	});

	const fs = $derived(Math.round(size * 0.35));
</script>

<div class="relative" style="width:100%;max-width:{size}px;">
	{#if image}
		<img
			src={image}
			alt="broken oops </3"
			class="block object-cover"
			style="width:100%;aspect-ratio:1/1;height:auto;border-radius:8px;"
		/>
	{:else}
		<div
			class="relative overflow-hidden rounded-lg"
			style="width:100%;aspect-ratio:1/1;height:auto;background:{gradient};color:#0a0d13;"
		>
			<div class="absolute inset-0 grid place-items-center p-2 text-center">
				<span style="font-size:{fs}px;letter-spacing:-0.02em;font-weight:600;">{initials}</span>
			</div>
		</div>
	{/if}

	{#if isHead}
		<span
			class="absolute -top-1.5 -right-1.5 rounded bg-accent px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.1em] text-bg uppercase"
		>
			head
		</span>
	{/if}
</div>
