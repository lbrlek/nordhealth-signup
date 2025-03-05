import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";

export function useEmailValidation(email: Ref<string>) {
  const { t } = useI18n();
  const emailError = ref<string | undefined>(undefined);

  function validateEmail() {
    const value = email.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) {
      emailError.value = t("signup.error_email_required");
    } else if (!emailRegex.test(value)) {
      emailError.value = t("signup.error_email_invalid");
    } else {
      emailError.value = undefined;
    }
  }

  return {
    emailError,
    validateEmail,
  };
}
