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
