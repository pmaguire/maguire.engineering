export async function load({ params }) {
	const post = await import(`../../../posts/${params.post}.md`)
	const { title, order } = post.metadata
	const content = post.default

	return {
		content,
		title,
		order,
	}
}
