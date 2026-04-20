import Error from './error.vue'
import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import type { NuxtError } from '#app'

const meta = {
  title: 'pages/error',
  component: Error,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Error>

export default meta
type Story = StoryObj<typeof meta>

/** Package, org, or page not found. */
export const NotFound: Story = {
  args: {
    error: {
      status: 404,
    } as NuxtError,
  },
}

/** Unauthorized access - shown when authentication is required. */
export const Unauthorized: Story = {
  args: {
    error: {
      status: 401,
    } as NuxtError,
  },
}

/** Generic server error with default message. */
export const ServerError: Story = {
  args: {
    error: {
      status: 500,
    } as NuxtError,
  },
}

/** Bad gateway - occurs when external services (jsDelivr, npm registry) fail. */
export const BadGateway: Story = {
  args: {
    error: {
      status: 502,
    } as NuxtError,
  },
}

export const Teapot: Story = {
  args: {
    error: {
      status: 418,
    } as NuxtError,
  },
}

/** Error with a message. */
export const WithMessage: Story = {
  args: {
    error: {
      status: 404,
      message: 'The page you are looking for does not exist.',
    } as NuxtError,
  },
}

/** Error with a detailed message to test text wrapping and layout. */
export const LongMessage: Story = {
  args: {
    error: {
      status: 500,
      message:
        'An unexpected error occurred while processing your request. Our team has been notified and is working to resolve the issue. Please try again in a few moments.',
    } as NuxtError,
  },
}
