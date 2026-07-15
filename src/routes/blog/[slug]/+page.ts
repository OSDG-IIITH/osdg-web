import { error, redirect } from '@sveltejs/kit';
import type { PostMeta } from '$lib/posts';

const modules = import.meta.glob('/src/blog/*.md');
const raws = import.meta.glob('/src/blog/*.md', { query: '?raw', import: 'default' });

function calcreadtime(raw: string): number {
	const content = raw.replace(/^---[\s\S]*?---/, '').replace(/[#*`_[\]()]/g, '');
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}

export function entries() {
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop()!.replace('.md', '')
	}));
}

export async function load({ params }) {
	const path = `/src/blog/${params.slug}.md`;
	if (!modules[path]) error(404, 'not found');
	const [mod, raw] = await Promise.all([modules[path](), raws[path]()]);
	const { default: component, metadata: meta } = mod as { default: unknown; metadata: PostMeta };
	if (meta.link) {
		redirect(307, meta.link);
	}
	return { component, meta, slug: params.slug, readtime: calcreadtime(raw as string) };
}
