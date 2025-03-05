import { ref } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { useEmailValidation } from '../../composables/useEmailValidation'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}))

describe('useEmailValidation', () => {
  it('returns required error for empty email', () => {
    const email = ref('')
    const { emailError, validateEmail } = useEmailValidation(email)
    validateEmail()
    expect(emailError.value).toBe('signup.error_email_required')
  })

  it('returns invalid error for incorrect email format', () => {
    const email = ref('not-an-email')
    const { emailError, validateEmail } = useEmailValidation(email)
    validateEmail()
    expect(emailError.value).toBe('signup.error_email_invalid')
  })

  it('clears error for valid email', () => {
    const email = ref('test@example.com')
    const { emailError, validateEmail } = useEmailValidation(email)
    validateEmail()
    expect(emailError.value).toBeUndefined()
  })
})
