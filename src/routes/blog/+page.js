export const load = async () => {
	const allPosts = await fetchMarkdownPosts()

	const sortedPosts = allPosts.sort((a, b) => {
		return b.meta.order - a.meta.order
	})

	return { posts: sortedPosts }
}

const fetchMarkdownPosts = async () => {
	const posts = import.meta.glob('/src/posts/*.md')
	const iterablePostFiles = Object.entries(posts)

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver()
			const postSlug = path.replace('/src/posts/', '').replace('.md', '')
			return {
				meta: metadata,
				path: `/blog/${postSlug}`,
			}
		}),
	)

	return allPosts
}
