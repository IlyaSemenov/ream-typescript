# ream-typescript

Typescript support for [Ream.js](https://ream.js.org/).

## Installation

Install Node packages:

```bash
yarn add typescript ream-typescript
```

Add plugin to `ream.config.js`:

```js
module.exports = {
	plugins: [
		require('ream-typescript')(),
	],
}
```

## Usage

Your Ream app will now import `*.ts` files, and will support `<script lang="ts">` section in `*.vue` files.

Development server will do background type checks with [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin).

## Plugin options

You may override plugin defaults by passing `options` objects:

```js
module.exports = {
	plugins: [
		require('ream-typescript')({
			extensions: ['.ts', '.tsx'],
			...
		}),
	],
}
```

Available options:

* *extensions*: `['.js', '.json', '.ts']`.
* *serverTypeChecks*: `true` — whether to run type checks in server webpack build.
* *clientTypeChecks*: `false` — whether to run type checks in client webpack build (disabled by default as client and server builds typically run on the same set of files and this is mostly double work and duplicate errors output).
* *tsLoaderOptions* — override [ts-loader](https://github.com/TypeStrong/ts-loader) options.