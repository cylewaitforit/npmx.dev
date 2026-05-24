import LikesLeaderboard from './likes.vue'
import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { http, HttpResponse } from 'msw'
import { pageDecorator } from '../../../.storybook/decorators'
import { likesLeaderboardHandler } from '../../storybook/mocks/handlers/leaderboard-likes'

const meta = {
  component: LikesLeaderboard,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [likesLeaderboardHandler],
    },
  },
  decorators: [pageDecorator],
} satisfies Meta<typeof LikesLeaderboard>

export default meta
type Story = StoryObj<typeof meta>

/** Full leaderboard with 10 entries. The top three are displayed in a podium layout, with the remaining seven rendered as a ranked list below. */
export const Default: Story = {}

/** Exactly three entries returned — only the podium section is rendered, no remaining list below. */
export const PodiumOnly: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/leaderboard/likes', () =>
          HttpResponse.json([
            {
              rank: 1,
              packageName: 'vite',
              subjectRef: 'at://did:plc:mock0001/dev.npmx.like/3jui7kd452c2a',
              totalLikes: 4821,
              packageDescription: 'Next generation frontend tooling. It is fast!',
              weeklyDownloads: 12500000,
              repositoryStars: 68000,
              homepagePreviewUrl: 'https://placehold.co/1200x628/png',
              homepagePreviewWidth: 1200,
              homepagePreviewHeight: 628,
              homepageLogoUrl: null,
              homepageLogoWidth: null,
              homepageLogoHeight: null,
            },
            {
              rank: 2,
              packageName: 'react',
              subjectRef: 'at://did:plc:mock0001/dev.npmx.like/3jui7kd452c2b',
              totalLikes: 3204,
              packageDescription: 'React is a JavaScript library for building user interfaces.',
              weeklyDownloads: 55000000,
              repositoryStars: 228000,
              homepagePreviewUrl: null,
              homepagePreviewWidth: null,
              homepagePreviewHeight: null,
              homepageLogoUrl: null,
              homepageLogoWidth: null,
              homepageLogoHeight: null,
            },
            {
              rank: 3,
              packageName: '@nuxt/kit',
              subjectRef: 'at://did:plc:mock0001/dev.npmx.like/3jui7kd452c2c',
              totalLikes: 2187,
              packageDescription:
                'Nuxt Kit provides composables and utilities for Nuxt module authors.',
              weeklyDownloads: 3200000,
              repositoryStars: 55000,
              homepagePreviewUrl: null,
              homepagePreviewWidth: null,
              homepagePreviewHeight: null,
              homepageLogoUrl: null,
              homepageLogoWidth: null,
              homepageLogoHeight: null,
            },
          ]),
        ),
      ],
    },
  },
}

/** No API response — `useFetch` falls back to its `default: () => []`, showing the "unavailable" card. */
export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [],
    },
  },
}
