# vite-plugin-spa-reload

A Vite plugin check new version for reload in SPA.

## How it works?

- First inject `<meta name="__version__" value="${options.version}">` to `index.html`
- Then you can use `virtual:spa-reload` to enable polling for new check available version

## Usage

```bash
pnpm install vite-plugin-spa-reload
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import SPAReload from 'vite-plugin-spa-reload'

export default {
  // ...
  plugins: [
    // ...
    SPAReload()
  ]
}
```

```ts
// main.ts
import { enable as enableSPAReload } from 'virtual:spa-reload'

enableSPAReload()
```

## Options

### version

- Type: `string`
- Default: `getCommitHash() || getPackageVersion()`

### message

- Type: `string`
- Default: `New version is available, reload?`

### interval

- Type: `number`
- Default: `30000`
