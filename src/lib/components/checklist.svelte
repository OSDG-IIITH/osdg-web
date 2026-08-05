<script lang="ts">
	import { browser } from '$app/environment';

	const items = [
		'disable bitlocker encryption',
		'setup password login for windows and disable pin',
		'partition disks: 384gb/1tb, 256gb/512gb, 128gb/256gb',
		'flash iso using fedora media writer, or borrow one',
		'boot into bios, check for intel optane/raid shenanigans',
		'disable secure boot and boot into usb',
		'check if keyboard, mouse, touchscreen, wifi, bluetooth and audio works',
		'make partitions using cfdisk: 512mb efi, 2gb boot, rest root',
		'format via kde partition manager: efi = fat32, boot = ext4, root = btrfs',
		'assign mountpoints correctly in installer',
		'post install, change boot order in bios',
		'check and install drivers for nvidia',
		'check if keyboard, mouse, touchscreen, wifi, bluetooth and audio works',
		'setup rpm fusion and install vscode, etc.'
	];

	const key = 'fedora-checklist';

	function load(): boolean[] {
		if (!browser) return items.map(() => false);
		try {
			const saved = localStorage.getItem(key);
			if (saved) {
				const arr = JSON.parse(saved);
				if (Array.isArray(arr) && arr.length === items.length) return arr;
			}
		} catch {}
		return items.map(() => false);
	}

	let open = $state(false);
	let checked = $state<boolean[]>(load());

	$effect(() => {
		if (browser) localStorage.setItem(key, JSON.stringify(checked));
	});

	const done = $derived(checked.filter(Boolean).length);

	function toggle(i: number) {
		checked = checked.map((v, j) => (j === i ? !v : v));
	}

	function reset() {
		checked = items.map(() => false);
	}
</script>

<!-- trigger -->
<button
	onclick={() => (open = !open)}
	class="fixed bottom-6 right-6 z-50 flex items-center gap-2 font-mono text-[12px] px-3.5 py-2 rounded-full border border-accent/40 bg-accent/15 hover:border-accent/60 hover:bg-accent/22 text-accent transition-colors shadow-lg backdrop-blur-md"
	aria-label="toggle checklist"
>
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
		<path d="M9 11l3 3L22 4"/>
		<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
	</svg>
	<span>{done}/{items.length}</span>
</button>

<!-- panel -->
{#if open}
	<!-- backdrop: transparent on desktop (click-outside), dark on mobile -->
	<button
		onclick={() => (open = false)}
		aria-label="close checklist"
		class="fixed inset-0 z-40 bg-black/60 md:bg-transparent"
	></button>

	<!-- panel: full-screen on mobile (with top gap), floating on desktop -->
	<div class="fixed top-16 inset-x-0 bottom-0 md:inset-auto md:bottom-[4.5rem] md:right-6 z-50 md:w-[340px] md:max-h-[70vh] flex flex-col rounded-t-2xl md:rounded-xl border-0 md:border border-border-2 bg-panel shadow-2xl overflow-hidden">
		<div class="flex items-center justify-between px-4 py-3 border-b border-border">
			<span class="font-mono text-[12px] text-fg-dim">install checklist <span class="text-accent">{done}/{items.length}</span></span>
			<div class="flex items-center gap-3">
				<button onclick={reset} class="font-mono text-[11px] text-mute hover:text-fg-dim transition-colors">reset</button>
				<button onclick={() => (open = false)} class="w-7 h-7 flex items-center justify-center rounded text-mute hover:text-fg hover:bg-panel-2 transition-colors" aria-label="close">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
						<path d="M18 6L6 18M6 6l12 12"/>
					</svg>
				</button>
			</div>
		</div>

		<ol class="overflow-y-auto flex-1 px-3 py-2">
			{#each items as item, i (i)}
				<li>
					<button
						onclick={() => toggle(i)}
						class="w-full flex items-start gap-3 px-2 py-2 rounded hover:bg-panel-2 transition-colors text-left group"
					>
						<span class="mt-0.5 flex-none w-4 h-4 rounded border flex items-center justify-center transition-colors {checked[i] ? 'bg-accent/20 border-accent/60' : 'border-border-2 group-hover:border-fg-dim'}">
							{#if checked[i]}
								<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-accent">
									<path d="M20 6L9 17l-5-5"/>
								</svg>
							{/if}
						</span>
						<span class="font-mono text-[11.5px] leading-snug {checked[i] ? 'line-through text-mute' : 'text-fg-dim'}">
							<span class="text-mute mr-1">{i + 1}.</span>{item}
						</span>
					</button>
				</li>
			{/each}
		</ol>
	</div>
{/if}
