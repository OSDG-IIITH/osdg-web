import { error } from '@sveltejs/kit';
import type { PostMeta } from '$lib/posts';

const modules = import.meta.glob('/src/blog/*.md');

export function entries() {
	return Object.keys(modules).map((path) => ({
		slug: path.split('/').pop()!.replace('.md', '')
	}));
}

export async function load({ params }) {
	const path = `/src/blog/${params.slug}.md`;
	if (!modules[path]) error(404, 'not found');
	const mod = (await modules[path]()) as { default: unknown; metadata: PostMeta };
	return { component: mod.default, meta: mod.metadata, slug: params.slug };
}
