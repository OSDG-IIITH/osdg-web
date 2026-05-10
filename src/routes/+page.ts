import { getposts } from '$lib/posts';

export function load() {
	return { recent: getposts().slice(0, 3) };
}
