#!/usr/bin/env node
/**
 * Doc Node Fixture Generator Script
 *
 * Runs `@deno/doc` on real type declarations from esm.sh and saves selected nodes as JSON
 * fixtures in `test/fixtures/esm-sh/doc-nodes`, so the fixtures always reflect the real output of
 * the installed `@deno/doc` version instead of being edited by hand.
 *
 * Usage:
 *   pnpm generate:doc-node-fixtures
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { isBuiltin } from 'node:module'
import { doc } from '@deno/doc'

const FIXTURES_DIR = join(import.meta.dirname, '../test/fixtures/esm-sh/doc-nodes')

interface DocNodeFixture {
  /** Fixture file name, without the extension */
  file: string
  /** Type declaration file to document */
  url: string
  /** Name of the exported node to save */
  name: string
}

const FIXTURES: DocNodeFixture[] = [
  {
    file: 'linkdave@0.0.2-client',
    url: 'https://esm.sh/linkdave@0.0.2/dist/client.d.ts',
    name: 'LinkDaveClient',
  },
  {
    file: 'linkdave@0.0.2-send-to-shard',
    url: 'https://esm.sh/linkdave@0.0.2/dist/client.d.ts',
    name: 'SendToShardFn',
  },
  {
    file: 'linkdave@0.0.2-client-message',
    url: 'https://esm.sh/linkdave@0.0.2/dist/types.d.ts',
    name: 'ClientMessage',
  },
  {
    file: 'linkdave@0.0.2-manager-events',
    url: 'https://esm.sh/linkdave@0.0.2/dist/types.d.ts',
    name: 'ManagerEvents',
  },
  {
    file: 'linkdave@0.0.2-pick-type',
    url: 'https://esm.sh/linkdave@0.0.2/dist/player.d.ts',
    name: 'RawVoiceServerUpdate',
  },
  {
    file: 'tanstack-highlight@0.0.9-create-highlighter',
    url: 'https://esm.sh/@tanstack/highlight@0.0.9/dist/core.d.ts',
    name: 'createHighlighter',
  },
]

const IS_SOURCE_MAP = /\.(?:js|mjs|cjs|d\.[mc]?ts)\.map(?:[?#].*)?$/

// Mirrors the loader and resolver in `server/utils/docs/client.ts`
async function load(specifier: string) {
  if (IS_SOURCE_MAP.test(specifier) || !/^https?:/.test(specifier)) return undefined

  const response = await fetch(specifier, { redirect: 'follow' })
  if (response.status !== 200) return undefined

  return {
    kind: 'module' as const,
    specifier: response.url || specifier,
    headers: Object.fromEntries(response.headers),
    content: await response.text(),
  }
}

function resolve(specifier: string, referrer: string): string {
  if (IS_SOURCE_MAP.test(specifier)) return specifier
  if (specifier.startsWith('.') || specifier.startsWith('/')) {
    return new URL(specifier, referrer).toString()
  }
  if (!/^https?:/.test(specifier) && !isBuiltin(specifier)) {
    if (new URL(referrer).hostname === 'esm.sh') return `https://esm.sh/${specifier}`
  }
  return specifier
}

async function getNodes(url: string) {
  const result = await doc([url], { load, resolve })
  return Object.values(result).flat()
}

async function main() {
  mkdirSync(FIXTURES_DIR, { recursive: true })

  const nodesByUrl = new Map<string, Awaited<ReturnType<typeof getNodes>>>()

  for (const { file, url, name } of FIXTURES) {
    let nodes = nodesByUrl.get(url)
    if (!nodes) {
      nodes = await getNodes(url)
      nodesByUrl.set(url, nodes)
    }

    const node = nodes.find(candidate => candidate.name === name)
    if (!node) throw new Error(`Could not find "${name}" in ${url}`)

    writeFileSync(join(FIXTURES_DIR, `${file}.json`), `${JSON.stringify(node, null, 2)}\n`)
    process.stdout.write(`Generated ${file}.json\n`)
  }
}

main().catch(error => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`)
  process.exit(1)
})
