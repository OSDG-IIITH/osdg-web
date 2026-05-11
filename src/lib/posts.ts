export interface PostMeta {
	title: string;
	author: string;
	date: string;
	tags: string[];
	excerpt: string;
}

export interface Post {
	slug: string;
	meta: PostMeta;
	readtime: number;
}

function calcreadtime(raw: string): number {
	const content = raw.replace(/^---[\s\S]*?---/, '').replace(/[#*`_[\]()]/g, '');
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}

/** returns all posts sorted newest first */
export function getposts(): Post[] {
	const modules = import.meta.glob('/src/blog/*.md', { eager: true });
	const raws = import.meta.glob('/src/blog/*.md', { eager: true, query: '?raw', import: 'default' });
	return Object.entries(modules)
		.map(([path, mod]) => ({
			slug: path.split('/').pop()!.replace('.md', ''),
			meta: (mod as { metadata: PostMeta }).metadata,
			readtime: calcreadtime(raws[path] as string)
		}))
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}
