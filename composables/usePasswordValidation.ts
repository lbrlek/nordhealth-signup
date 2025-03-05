import { ref, computed, type Ref } from "vue";
import { useI18n } from "vue-i18n";

export function usePasswordValidation(password: Ref<string>) {
  const { t } = useI18n();
  const passwordError = ref<string | undefined>(undefined);

  const passwordStrengthMessage = computed(() => {
    const value = password.value || "";

    if (!value) return ""; 

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);
    const isLongEnough = value.length >= 8;

    if (isLongEnough && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar) {
      return t("signup.password_strength_strong");
    }

    if (isLongEnough && hasLowerCase && hasUpperCase && hasNumbers) {
      return t("signup.password_strength_moderate");
    }

    return t("signup.password_strength_weak");
  });

  function validatePassword() {
    const value = password.value || "";
    
    if (!value) {
      passwordError.value = t("signup.error_password_required");
    } else if (value.length < 8) {
      passwordError.value = t("signup.error_password_short");
    } else if (!/[A-Z]/.test(value)) {
      passwordError.value = t("signup.error_password_uppercase");
    } else if (!/[a-z]/.test(value)) {
      passwordError.value = t("signup.error_password_lowercase");
    } else if (!/\d/.test(value)) {
      passwordError.value = t("signup.error_password_number");
    } 
    else if (/[^A-Za-z0-9@$!%*?&]/.test(value)) {
      passwordError.value = t("signup.error_password_complexity");
    } 
    else if (!/[@$!%*?&]/.test(value)) {
      passwordError.value = t("signup.error_password_special");
    } else {
      passwordError.value = undefined;
    }
  }

  return {
    passwordError,
    passwordStrengthMessage,
    validatePassword,
  };
}
