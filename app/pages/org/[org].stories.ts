import Org from './[org].vue'
import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { pageDecorator } from '../../../.storybook/decorators'
import {
  mockOrgPackagesSuccess,
  mockOrgPackagesSingle,
  mockOrgPackagesEmpty,
  mockOrgPackagesNotFound,
  mockOrgPackagesLoading,
} from '../../storybook/mocks/handlers/registry-org'

const meta: Meta = {
  component: Org,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [pageDecorator],
}

export default meta
type Story = StoryObj

/**
 * Default org page showing the @npmx organization with multiple packages.
 * Displays package list with filtering, sorting, and view mode controls.
 * The MSW handler mocks both the org packages endpoint and Algolia search.
 */
export const Default: Story = {
  parameters: {
    msw: { handlers: mockOrgPackagesSuccess },
  },
  render: () => ({
    components: { Org },
    setup() {
      useRouter.push('/org/npmx')
    },
    template: '<Org />',
  }),
}

/**
 * Organization with only a single package.
 * Shows the org page layout with minimal content.
 */
export const SinglePackage: Story = {
  parameters: {
    msw: { handlers: mockOrgPackagesSingle },
  },
  render: () => ({
    components: { Org },
    setup() {
      useRouter().push('/org/single-org')
    },
    template: '<Org />',
  }),
}

/**
 * Empty organization with zero packages.
 * Shows the "This organization has no packages" message.
 */
export const EmptyOrg: Story = {
  parameters: {
    msw: { handlers: mockOrgPackagesEmpty },
  },
  render: () => ({
    components: { Org },
    setup() {
      useRouter().push('/org/empty-org')
    },
    template: '<Org />',
  }),
}

/**
 * Organization not found (404 error).
 * The org endpoint returns a 404 error and the page displays an error state.
 */
export const NotFound: Story = {
  parameters: {
    msw: { handlers: mockOrgPackagesNotFound },
  },
  render: () => ({
    components: { Org },
    setup() {
      useRouter().push('/org/nonexistent-org')
    },
    template: '<Org />',
  }),
}

/**
 * Loading state when the API request is pending.
 * MSW handlers delay responses indefinitely to show the loading spinner.
 */
export const Loading: Story = {
  parameters: {
    msw: { handlers: mockOrgPackagesLoading },
  },
  render: () => ({
    components: { Org },
    setup() {
      useRouter().push('/org/npmx')
    },
    template: '<Org />',
  }),
}
