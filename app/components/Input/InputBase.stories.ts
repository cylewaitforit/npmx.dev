import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { expect, fn, userEvent } from 'storybook/test'
import InputBase from './Base.vue'

const meta = {
  component: InputBase,
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    modelValue: {
      description: 'The model input value. Uses v-model to bind it.',
      type: 'string',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputBase>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story

export const WithModelValue = {
  args: {
    modelValue: 'Model Value',
  },
} satisfies Story

export const Small = {
  args: {
    size: 'small',
  },
} satisfies Story

export const SmallWithModelValue = {
  args: {
    size: 'small',
    modelValue: 'Small input',
  },
} satisfies Story

export const Large = {
  args: {
    size: 'large',
  },
} satisfies Story

export const LargeWithModelValue = {
  args: {
    size: 'large',
    modelValue: 'Large input',
  },
} satisfies Story

export const Disable: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox')

    await expect(input).toBeDisabled()
  },
}

export const DisabledWithModelValue = {
  args: {
    disabled: true,
    modelValue: 'Disabled input',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox')

    await expect(input).toBeDisabled()
  },
} satisfies Story

export const Event: Story = {
  args: {
    onFocus: fn(),
    onBlur: fn(),
  },
  play: async ({ args, canvas }) => {
    const input = canvas.getByRole('textbox')

    await userEvent.click(input)
    await expect(args.onFocus).toHaveBeenCalled()

    await userEvent.tab()
    await expect(args.onBlur).toHaveBeenCalled()
  },
}

export const NoCorrect: Story = {
  args: {
    noCorrect: true,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox')

    await expect(input).toHaveAttribute('autocapitalize', 'off')
    await expect(input).toHaveAttribute('autocorrect', 'off')
    await expect(input).toHaveAttribute('autocomplete', 'off')
    await expect(input).toHaveAttribute('spellcheck', 'false')
  },
}
