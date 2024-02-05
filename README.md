# [maguire.engineering](https://maguire.engineering)

Personal website for [Patrick Maguire](https://www.linkedin.com/in/patrick-maguire/)
* ⚙️ Built with [SvelteKit](https://kit.svelte.dev/)
* 🏗️ Scaffolded via [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte)
* 🗺️ Mapping functionality via [MapBox](https://mapbox.com)

## Setup

```bash
npm install
```

## IDE Configuration

- If using VSCode:

  - Install the [Svelte for VS Code Extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
  - Install the [Prettier for VS Code Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

  - Add the following to your project configuration:

  ```json
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[svelte]": {
    "editor.defaultFormatter": "svelte.svelte-vscode"
  },
  "eslint.validate": ["javascript", "typescript", "svelte"]
  ```

## Running the App

```bash
# Start a development server and open the app in a new browser tab
npm start
```

## Linting and Syntax Checking

In the root folder of the repo, run `npm run lint` - This will run all formatting and linting checks.

Automated code formatting uses [Prettier](https://prettier.io/), linting uses [ESLint](https://eslint.org/).

Code formatting and linting will be run automatically when staging commits via [lint-staged](https://github.com/okonet/lint-staged)

For more npm commands, see [package.json](package.json)

## Building

```bash
# create a production version
npm run build

# Preview the production build
npm run preview
```

## Deploying

This app is hosted on [Netlify](https://www.netlify.com/) at https://maguire.engineering

⚠️ **Warning** ⚠️   -  Commits to the **main** branch will be *immediately* deployed to production!

