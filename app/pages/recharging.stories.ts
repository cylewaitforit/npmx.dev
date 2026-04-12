import Recharging from './recharging.vue'
import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { pageDecorator } from '../../.storybook/decorators'
import { repoStatsHandler } from '../../.storybook/handlers'

const meta = {
  component: Recharging,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [pageDecorator],
} satisfies Meta<typeof Recharging>

export default meta
type Story = StoryObj<typeof meta>

/** The stats grid is hidden when there is no API response but the rest of the page renders. */
export const Default: Story = {}

/**
 * WithStats — the `/api/repo-stats` endpoint is intercepted by MSW so the
 * three-column stats grid (contributors, commits, pull requests) becomes visible.
 */
export const WithStats: Story = {
  parameters: {
    msw: {
      handlers: [repoStatsHandler],
    },
  },
}
