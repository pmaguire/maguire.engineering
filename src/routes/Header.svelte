<script>
	import ThemeSelector from './ThemeSelector.svelte'
	import tooltip from '$lib/tooltip'
	import MeIcon from './MeIconSvg.svelte'
</script>

<header>
	<div class="home-link">
		<a href="/">
			<MeIcon />
			<div>
				<span class="title-a">MAGUIRE</span><span class="title-b">.ENGINEERING</span>
			</div>
		</a>
	</div>
	<div class="buttons">
		<nav>
			<a href="/contact">Contact</a>
			<a href="/blog">Blog</a>
			<a
				title="LinkedIn"
				use:tooltip
				target="_blank"
				rel="noopener"
				href="https://www.linkedin.com/in/patrick-maguire/"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					style="width: 1.25rem;"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<path
						d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
					></path>
				</svg>
			</a>
			<a
				title="Github"
				use:tooltip
				target="_blank"
				rel="noopener"
				href="https://github.com/pmaguire"
			>
				<svg xmlns="http://www.w3.org/2000/svg" style="width: 1.25rem;" viewBox="0 0 16 16">
					<path
						fill="currentColor"
						fill-rule="evenodd"
						d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584c.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076c-.343-.93-.881-1.175-.881-1.175c-.734-.489.048-.489.048-.489c.783.049 1.224.832 1.224.832c.734 1.223 1.859.88 2.3.685c.048-.538.293-.88.489-1.076c-1.762-.196-3.621-.881-3.621-3.964c0-.88.293-1.566.832-2.153c-.05-.147-.343-.978.098-2.055c0 0 .685-.196 2.201.832c.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832c.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915c.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.984 7.984 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0Z"
						clip-rule="evenodd"
					></path>
				</svg>
			</a>
		</nav>
		<ThemeSelector />
	</div>
</header>

<style>
	header {
		z-index: 2;
		height: var(--nav-height);
		display: flex;
		justify-content: space-between;
		background: var(--background-1);
		align-items: center;
		position: fixed;
		top: 0;
		width: 100%;
	}

	.buttons {
		display: inline-flex;
		align-items: center;
		vertical-align: middle;
	}

	.home-link {
		padding-left: var(--outside-padding);
		& a {
			font-weight: 300;
			letter-spacing: 0.2rem;
			display: inline-flex;
			align-items: center;
			vertical-align: middle;
		}
		& svg {
			padding-right: 1rem;
		}
	}

	nav {
		display: flex;
		padding-left: 1rem;
		& a {
			padding: 0 0.4rem;
			display: flex;
		}
	}

	svg {
		vertical-align: middle;
	}

	@media (max-width: 550px) {
		.home-link a {
			letter-spacing: 0.1rem;
			position: relative;
		}
		.home-link span {
			display: block;
		}
		nav a {
			padding: 0 0.2rem;
		}
		.title-b {
			position: relative;
			left: 0.5rem;
		}
	}
</style>
