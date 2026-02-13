import type { StorybookConfig } from '@nuxtjs/storybook'

const config = {
  stories: ['../app/**/*.stories.@(js|ts|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    'storybook-i18n',
  ],
  framework: '@storybook-vue/nuxt',
  features: {
    backgrounds: false,
  },
} satisfies StorybookConfig
export default config
