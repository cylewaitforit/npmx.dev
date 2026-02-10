import type { Preview } from '@nuxtjs/storybook'
import { currentLocales } from '../config/i18n'
import { fn } from 'storybook/test'
import { ACCENT_COLORS } from '../shared/utils/constants'

// related: https://github.com/npmx-dev/npmx.dev/blob/1431d24be555bca5e1ae6264434d49ca15173c43/test/nuxt/setup.ts#L12-L26
// Stub Nuxt specific globals
// @ts-expect-error - dynamic global name
globalThis['__NUXT_COLOR_MODE__'] ??= {
  preference: 'system',
  value: 'dark',
  getColorScheme: fn(() => 'dark'),
  addColorScheme: fn(),
  removeColorScheme: fn(),
}
// @ts-expect-error - dynamic global name
globalThis.defineOgImageComponent = fn()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
