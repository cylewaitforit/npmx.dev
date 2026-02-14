import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Component from './Base.vue'

const meta = {
  component: Component,
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    default: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    default: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Small: Story = {
  args: {
    default: 'Small Button',
    size: 'small',
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    default: 'Disabled Button',
    disabled: true,
  },
}

export const WithIcon: Story = {
  args: {
    classicon: 'i-carbon:search',
    variant: 'secondary',
  },
  render: args => ({
    components: { Component },
    setup() {
      return { args }
    },
    template: '<Component v-bind="args">{{ $t("search.button") }}</Component>',
  }),
}

export const WithKeyboardShortcut: Story = {
  args: {
    ariaKeyshortcuts: '/',
    variant: 'secondary',
  },
  render: args => ({
    components: { Component },
    setup() {
      return { args }
    },
    template: '<Component v-bind="args">{{ $t("search.button") }}</Component>',
  }),
}

export const Block: Story = {
  args: {
    block: true,
    default: 'Full Width Button',
  },
}
