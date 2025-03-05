import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SignupForm from '../../components/SignupForm.vue'
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import type { Mock } from 'vitest'

// Create a minimal i18n instance with all required keys.
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      signup: {
        error_email_required: 'signup.error_email_required',
        error_email_invalid: 'signup.error_email_invalid',
        error_email_exists: 'signup.error_email_exists',
        email_placeholder: 'Email placeholder',
        password_placeholder: 'Password placeholder',
        password_requirements: 'Password requirements',
        receive_updates: 'Receive updates',
        hide_password: 'Hide password',
        show_password: 'Show password',
        loading: 'Loading',
        signup_button: 'Signup',
        password_strength_strong: 'signup.password_strength_strong',
        password_strength_moderate: 'signup.password_strength_moderate',
        password_strength_weak: 'signup.password_strength_weak'
      },
    },
  },
})

const stubs = {
  'provet-input': {
    name: 'ProvetInput',
    props: {
      modelValue: { type: String, default: '' },
      error: { type: String, default: '' },
      name: { type: String, default: '' }
    },
    template: `<div :data-name="name">
      <input v-bind="$attrs" v-model="internalValue" @blur="$emit('blur')" />
      <span class="error" v-if="error">{{ error }}</span>
      <slot></slot>
    </div>`,
    computed: {
      internalValue: {
        get() { return this.modelValue },
        set(val: any) { this.$emit('update:modelValue', val) }
      }
    }
  },
  'provet-icon': { template: '<div></div>' },
  'provet-button': {
    name: 'ProvetButton',
    template: `<button v-bind="$attrs" @click="$emit('click')">
      <slot></slot>
    </button>`
  },
  'provet-tooltip': { template: '<div><slot></slot></div>' },
  'provet-checkbox': {
    name: 'ProvetCheckbox',
    props: {
      modelValue: { type: Boolean, default: false },
      name: { type: String, default: '' }
    },
    template: `<div :data-name="name">
      <input type="checkbox" :name="name" v-model="internalValue" @change="$emit('update:modelValue', internalValue)" />
    </div>`,
    computed: {
      internalValue: {
        get() { return this.modelValue },
        set(val: any) { this.$emit('update:modelValue', val) }
      }
    }
  },
  'provet-stack': { template: '<div><slot /></div>' },
}

// Mock external dependencies.
vi.mock('~/composables/useMockApi', () => ({
  useMockApi: () => ({
    checkEmailExists: vi.fn(),
  }),
}))

vi.mock('nuxt/app', () => ({
  navigateTo: vi.fn(),
}))

describe('SignupForm Component', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(SignupForm, {
      global: {
        plugins: [i18n],
        stubs,
        config: {
          compilerOptions: {
            isCustomElement: (tag: string) => tag.startsWith('provet-'),
          },
        },
      },
    })
  })

  it('displays an email error when the email field is empty', async () => {
    const emailInputWrapper = wrapper.find('[data-name="email"]')
    if (!emailInputWrapper.exists()) throw new Error('Email input stub not found')
    const input = emailInputWrapper.find('input')
    await input.setValue('')
    await input.trigger('blur')
    await nextTick()
    const errorSpan = emailInputWrapper.find('.error')
    expect(errorSpan.exists()).toBe(true)
    expect(errorSpan.text()).toBe('signup.error_email_required')
  })

  it('displays an email error when an invalid email is entered', async () => {
    const emailInputWrapper = wrapper.find('[data-name="email"]')
    if (!emailInputWrapper.exists()) throw new Error('Email input stub not found')
    const input = emailInputWrapper.find('input')
    await input.setValue('invalid-email')
    await input.trigger('blur')
    await nextTick()
    const errorSpan = emailInputWrapper.find('.error')
    expect(errorSpan.exists()).toBe(true)
    expect(errorSpan.text()).toBe('signup.error_email_invalid')
  })

  it('navigates to success when the form is valid and the email is not taken', async () => {
    const emailInputWrapper = wrapper.find('[data-name="email"]')
    const passwordInputWrapper = wrapper.find('[data-name="password"]')
    if (!emailInputWrapper.exists() || !passwordInputWrapper.exists()) {
      throw new Error('Email or Password input stub not found')
    }
    const emailInput = emailInputWrapper.find('input')
    const passwordInput = passwordInputWrapper.find('input')
    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('ValidPass1!')
    await emailInput.trigger('blur')
    await passwordInput.trigger('blur')

    const { useMockApi } = await import('../../composables/useMockApi')
    const mockApi = useMockApi()
    const checkEmailExistsMock = mockApi.checkEmailExists as Mock
    checkEmailExistsMock.mockResolvedValue(false)

    const form = wrapper.find('form')
    if (!form.exists()) throw new Error('Form not found')
    await form.trigger('submit.prevent')
    await nextTick()

    const { navigateTo } = await import('nuxt/app')
    expect(navigateTo).toHaveBeenCalledWith({
      path: '/success',
      query: { updates: 'false' },
    })
  })

})
