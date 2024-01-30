import { persisted } from 'svelte-persisted-store'
import { browser } from '$app/environment'

let themeSelection = 'dark'

if (browser) {
	themeSelection = document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light'
}

export const theme = persisted('theme', themeSelection)
