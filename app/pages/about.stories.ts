import About from './about.vue'
import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { pageDecorator } from '../../.storybook/decorators'
import { contributorsHandler } from '../../.storybook/handlers'

const meta = {
  component: About,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [pageDecorator],
} satisfies Meta<typeof About>

export default meta
type Story = StoryObj<typeof meta>

/** Contributors section is hidden when there is no API response but the rest of the page renders. */
export const Default: Story = {}

/**
 * WithContributors — the `/api/contributors` endpoint is intercepted by MSW
 * so the governance members and community contributors sections are populated.
 */
export const WithContributors: Story = {
  parameters: {
    msw: {
      handlers: [contributorsHandler],
    },
  },
}
