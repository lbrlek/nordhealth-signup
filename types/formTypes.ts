import type { Ref } from "vue";

export interface FormState {
  email: Ref<string>;
  password: Ref<string>;
  updates: Ref<boolean>;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}

export type PasswordStrength = "weak" | "moderate" | "strong" | "";

export interface UseFormValidation {
  emailError: Ref<string | undefined>;
  passwordError: Ref<string | undefined>;
  validateEmail: (email: string) => void;
  validatePassword: (password: string) => void;
  validateForm: (email: string, password: string) => boolean;
}

export interface UsePasswordValidation {
  passwordError: Ref<string | undefined>;
  passwordStrengthMessage: Ref<string>;
  validatePassword: () => void;
}

export interface SignupFormMethods {
  handleSubmit: () => void;
  togglePasswordVisibility: () => void;
}
