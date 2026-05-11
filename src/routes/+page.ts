import { getposts } from '$lib/posts';
import { getprojects } from '$lib/projects';

export async function load() {
	return {
		recent: getposts().slice(0, 3),
		projects: await getprojects()
	};
}
