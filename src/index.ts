import fs from 'node:fs'
import path from 'node:path'
import child_process from 'node:child_process'
import type { Plugin } from 'vite'

interface Options {
  version?: string
  message?: string
  interval?: number
}

const getCommitHash = function () {
  try {
    return child_process.execSync('git rev-parse HEAD').toString().trim()
  } catch {
    return ''
  }
}
const getPackageVersion = function () {
  const filepath = path.resolve(process.cwd(), './package.json')
  return JSON.parse(fs.readFileSync(filepath, 'utf-8')).version
}

const generateCode = (options: Options) => `
;(function main() {
  polling()
  setInterval(polling, ${options.interval}) // 30s
}())

let currentVersion = document.head.querySelector('meta[name="__version__"]')?.getAttribute('value') ?? ''

async function polling() {
  const response = await fetch('/')
  const html = await response.text()
  
  const remoteVersion = html.match(/<meta name="__version__" value="(.*?)">/)?.[1] ?? ''

  console.log({ currentVersion, remoteVersion })
  if (currentVersion !== remoteVersion) {
    const confirmed = confirm(${options.message})
    if (confirmed) {
      location.reload()
    } else {
      currentVersion = remoteVersion
    }
  }
}
`

export default function reload({ 
  version = getCommitHash() || getPackageVersion(),
  message = 'New version is available, reload?',
  interval = 30000
}: Options = {}): Plugin {
  return {
    name: 'vite-plugin-spa-reload',
    enforce: 'post',
    transformIndexHtml(html: string) {
      return html
        .replace(
          `<head>`,
          `<head><meta name="__version__" value="${version}">`
        )
        .replace(
          '</body>',
          `<script>${generateCode({ version, message, interval })}</script></body>`
        )
    }
  }
}
