import { ref } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { usePasswordValidation } from '../../composables/usePasswordValidation'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}))

describe('usePasswordValidation', () => {
  it('returns required error for empty password', () => {
    const password = ref('')
    const { passwordError, validatePassword } = usePasswordValidation(password)
    validatePassword()
    expect(passwordError.value).toBe('signup.error_password_required')
  })

  it('returns short error for password shorter than 8 characters', () => {
    const password = ref('Aa1!')
    const { passwordError, validatePassword } = usePasswordValidation(password)
    validatePassword()
    expect(passwordError.value).toBe('signup.error_password_short')
  })

  it('returns uppercase error when missing an uppercase letter', () => {
    const password = ref('validpass1!')
    const { passwordError, validatePassword } = usePasswordValidation(password)
    validatePassword()
    expect(passwordError.value).toBe('signup.error_password_uppercase')
  })

  it('returns lowercase error when missing a lowercase letter', () => {
    const password = ref('VALIDPASS1!')
    const { passwordError, validatePassword } = usePasswordValidation(password)
    validatePassword()
    expect(passwordError.value).toBe('signup.error_password_lowercase')
  })

  it('returns number error when missing a number', () => {
    const password = ref('ValidPass!')
    const { passwordError, validatePassword } = usePasswordValidation(password)
    validatePassword()
    expect(passwordError.value).toBe('signup.error_password_number')
  })

  it('returns special error when missing an allowed special character', () => {
    const password = ref('ValidPass1') // no allowed special character present
    const { passwordError, validatePassword } = usePasswordValidation(password)
    validatePassword()
    expect(passwordError.value).toBe('signup.error_password_special')
  })

  it('returns complexity error when containing an invalid special character', () => {
    const password = ref('ValidPass1,') // '#' is not in the allowed set [@$!%*?&]
    const { passwordError, validatePassword } = usePasswordValidation(password)
    validatePassword()
    expect(passwordError.value).toBe('signup.error_password_complexity')
  })

  it('returns no error for a valid password', () => {
    const password = ref('ValidPass1!')
    const { passwordError, validatePassword } = usePasswordValidation(password)
    validatePassword()
    expect(passwordError.value).toBeUndefined()
  })

  it('computes a strong password strength message for a valid password', () => {
    const password = ref('ValidPass1!')
    const { passwordStrengthMessage } = usePasswordValidation(password)
    expect(passwordStrengthMessage.value).toBe('signup.password_strength_strong')
  })

  it('computes a moderate password strength message when special char is missing but other conditions are met', () => {
    const password = ref('ValidPass1')
    const { passwordStrengthMessage } = usePasswordValidation(password)
    expect(passwordStrengthMessage.value).toBe('signup.password_strength_moderate')
  })
})
