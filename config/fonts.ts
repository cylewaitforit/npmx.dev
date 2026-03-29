interface FontVariant {
  weight: number
  /** Path relative to the public root, e.g. '/fonts/Geist-Regular.ttf' */
  file: string
}

interface FontFamily {
  name: string
  variants: FontVariant[]
  preload?: boolean
  global?: boolean
}

/**
 * Canonical font definitions for the app.
 *
 * This is the single source of truth consumed by:
 *   - nuxt.config.ts  → @nuxt/fonts `families` config
 *   - .storybook/main.ts → injects matching @font-face CSS into the preview
 */
export const fontFamilies: FontFamily[] = [
  {
    name: 'Geist',
    preload: true,
    global: true,
    variants: [
      { weight: 400, file: '/fonts/Geist-Regular.ttf' },
      { weight: 500, file: '/fonts/Geist-Medium.ttf' },
      { weight: 600, file: '/fonts/Geist-SemiBold.ttf' },
      { weight: 700, file: '/fonts/Geist-Bold.ttf' },
    ],
  },
  {
    name: 'Geist Mono',
    preload: true,
    global: true,
    variants: [
      { weight: 400, file: '/fonts/GeistMono-Regular.ttf' },
      { weight: 500, file: '/fonts/GeistMono-Medium.ttf' },
      { weight: 700, file: '/fonts/GeistMono-Bold.ttf' },
    ],
  },
]

/** Generates `@font-face` CSS for all font families and variants. */
export function generateFontFaceCSS(families: FontFamily[]): string {
  return families
    .flatMap(({ name, variants }) =>
      variants.map(
        ({ weight, file }) =>
          `@font-face {\n  font-family: '${name}';\n  font-weight: ${weight};\n  font-style: normal;\n  font-display: swap;\n  src: url('${file}') format('truetype');\n}`,
      ),
    )
    .join('\n')
}
