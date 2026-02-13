import type { Meta, StoryObj } from '@nuxtjs/storybook'
import Component from './Base.vue'

const meta = {
  component: Component,
  tags: ['autodocs'],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    default: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    default: 'Secondary Button',
  },
}

export const Small: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    default: 'Small Button',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
    default: 'Disabled Button',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    classicon: 'i-carbon:search',
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
    variant: 'secondary',
    size: 'medium',
    ariaKeyshortcuts: '/',
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
    variant: 'primary',
    size: 'medium',
    block: true,
    default: 'Full Width Button',
  },
}
