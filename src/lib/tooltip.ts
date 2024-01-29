import Tooltip from './Tooltip.svelte'

export default function tooltip(element: HTMLElement) {
	let title = element.getAttribute('title') || undefined
	let cmp: Tooltip

	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (mutation.type === 'attributes' && mutation.attributeName === 'title') {
				const newTitle = element.getAttribute('title')
				element.removeAttribute('title')
				if (newTitle !== null) {
					title = newTitle
				}
				if (cmp) {
					cmp.$set({ title: title ?? '' })
				}
			}
		})
	})

	function mouseOver(event: MouseEvent) {
		const attrTitle = element.getAttribute('title')
		if (attrTitle !== null) {
			title = attrTitle
		}
		element.removeAttribute('title')
		observer.observe(element, {
			attributeFilter: ['title'],
			attributeOldValue: true,
		})
		cmp?.$destroy()
		if (title) {
			cmp = new Tooltip({
				props: {
					title: title,
					evt: event,
				},
				target: document.body,
			})
		}
	}

	function mouseMove(event: MouseEvent) {
		cmp.$set({ evt: event })
	}

	function mouseLeave() {
		cmp.$destroy()
		observer.disconnect()
		element.setAttribute('title', title ?? '')
		title = undefined
	}

	if (title) {
		element.addEventListener('mouseover', mouseOver)
		element.addEventListener('mouseleave', mouseLeave)
		element.addEventListener('mousemove', mouseMove)
	}

	return {
		/* istanbul ignore next */
		destroy() {
			cmp?.$destroy()
			observer.disconnect()
			element.removeEventListener('mouseover', mouseOver)
			element.removeEventListener('mouseleave', mouseLeave)
			element.removeEventListener('mousemove', mouseMove)
		},
	}
}
