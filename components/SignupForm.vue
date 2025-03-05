<template>
  <form @submit.prevent="handleSubmit">
    <provet-stack>
      <provet-input
        v-model="email"
        name="email"
        type="email"
        label="Email"
        :placeholder="$t('signup.email_placeholder')"
        :error="emailError || apiError"
        expand
        required
        autocomplete="email"
        @blur="() => validateEmail()"
      />

      <provet-input
        v-model="password"
        :type="passwordVisible ? 'text' : 'password'"
        name="password"
        label="Password"
        :placeholder="$t('signup.password_placeholder')"
        :error="passwordError || undefined"
        :hint="passwordStrengthMessage"
        expand
        required
        autocomplete="new-password"
        @blur="validatePassword"
        aria-describedby="password-tooltip"
      >
        <provet-icon
          slot="end"
          name="interface-info"
          size="m"
          class="info-icon"
          tabindex="0"
          aria-describedby="password-tooltip"
        />

        <provet-button
          type="button"
          slot="end"
          variant="default"
          size="m"
          class="toggle-password-button"
          :aria-pressed="passwordVisible"
          @click="togglePasswordVisibility"
        >
          <provet-icon
            :name="passwordVisible ? 'interface-edit-on' : 'interface-edit-off'"
            size="m"
            aria-hidden="true"
          />
          <span class="sr-only">
            {{
              passwordVisible ? $t("signup.hide_password") : $t("signup.show_password")
            }}
          </span>
        </provet-button>
      </provet-input>

      <provet-tooltip id="password-tooltip">
        {{ $t("signup.password_requirements") }}
      </provet-tooltip>

      <provet-checkbox
        :checked="updates"
        @change="toggleUpdates"
        name="updates"
        :label="$t('signup.receive_updates')"
      />

      <provet-button type="submit" variant="primary" :disabled="loading">
        {{ loading ? $t("signup.loading") : $t("signup.signup_button") }}
      </provet-button>
    </provet-stack>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { navigateTo } from "nuxt/app";
import { useEmailValidation } from "~/composables/useEmailValidation";
import { usePasswordValidation } from "~/composables/usePasswordValidation";
import { useMockApi } from "~/composables/useMockApi";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const email = ref("");
const password = ref("");
const updates = ref(false);
const passwordVisible = ref(false);
const loading = ref(false);
const apiError = ref<string | undefined>(undefined);

const { emailError, validateEmail } = useEmailValidation(email);
const {
  passwordError,
  passwordStrengthMessage,
  validatePassword,
} = usePasswordValidation(password);

const { checkEmailExists } = useMockApi();

function toggleUpdates(event: Event) {
  const target = event.target as HTMLInputElement;
  updates.value = target.checked;
}

async function handleSubmit() {
  validateEmail();
  validatePassword();

  if (emailError.value || passwordError.value) {
    return;
  }

  loading.value = true;
  apiError.value = undefined;

  try {
    const emailTaken = await checkEmailExists(email.value);

    if (emailTaken) {
      apiError.value = t("signup.error_email_exists");
      return;
    }

    console.log("Sending updates param:", updates.value);
    navigateTo({
      path: "/success",
      query: { updates: updates.value ? "true" : "false" },
    });
  } catch (error: any) {
    apiError.value = error.message;
  } finally {
    loading.value = false;
  }
}

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}
</script>

<style scoped lang="scss">
.info-icon {
  cursor: pointer;
  color: var(--n-color-text-secondary);
}

.toggle-password-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--n-color-text-secondary);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
