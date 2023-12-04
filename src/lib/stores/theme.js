import { persisted } from 'svelte-persisted-store'

export const theme = persisted('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')