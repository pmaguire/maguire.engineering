import { persisted } from 'svelte-persisted-store'
import { browser } from '$app/environment'

let themeSelection = 'dark'

if (browser) {
	themeSelection = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const theme = persisted('theme', themeSelection)
