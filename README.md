# vite-plugin-spa-reload

A Vite plugin check new version for reload in SPA.

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
import { enable as enableSpaReload } from 'virtual:spa-reload'

enableSpaReload()
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
