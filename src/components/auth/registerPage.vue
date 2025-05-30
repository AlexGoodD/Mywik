<template>
  <div class="tw-bg-transparent tw-rounded-xl tw-w-full tw-h-full tw-shadow-md tw-flex tw-flex-col tw-gap-3">
    <h2 class="tw-text-white  tw-text-left tw-mt-4 tw-mb-10">Let's create your new account to get started.</h2>
    <button class="tw-relative tw-border tw-bg-[#1f1f1f] tw-border-[#6D6D6D] tw-rounded-lg tw-flex tw-justify-center tw-gap-x-4 tw-items-center tw-transition-colors tw-duration-500 hover:tw-bg-[#444444] hover:tw-border hover:tw-border-[#878787]">
      <i class="fa-brands fa-google tw-text-white"></i>
      <p class="tw-text-white">Continue with Google</p>
    </button>
    <div class="tw-flex tw-text-[#6D6D6D] tw-items-center tw-justify-between">
    <hr class="tw-w-[45%] tw-border-[#6D6D6D]"/>
      <p class="tw-text-md tw-font-bold">Or</p>
      <hr class="tw-w-[45%] tw-border-[#6D6D6D]"/>
    </div>
    <BaseInput
        v-model="usernameField.value.value"
        icon="fas fa-user"
        id="user"
        placeholder="Enter a username"
        @blur="usernameField.onBlur"
    />
    <AuthHelper :show="usernameField.error.value" message="The username must be at least 9 characters long." />
    <BaseInput
        v-model="emailField.value.value"
        icon="fas fa-user"
        id="email"
        placeholder="Enter an email address"
        @blur="emailField.onBlur"
    />
    <AuthHelper :show="emailField.error.value" message="Please enter a valid email address." />
    <PasswordInput
        v-model="passwordField.value.value"
        id="password"
        placeholder="Enter a password"
        @blur="passwordField.onBlur"
    />
    <AuthHelper :show="passwordField.error.value" message="Password must be at least 6 characters and include uppercase, lowercase, number, and special character." />
    <PasswordInput
        v-model="confirmPasswordField.value.value"
        id="confirm-password"
        placeholder="Confirm password"
        @blur="confirmPasswordField.onBlur"
    />
    <AuthHelper :show="confirmPasswordField.error.value" message="Passwords do not match." />
    <button class="tw-border tw-bg-[#1f1f1f] tw-border-[#6D6D6D] tw-rounded-lg tw-flex tw-justify-center tw-gap-x-4 tw-items-center tw-transition-colors tw-duration-500 hover:tw-bg-[#444444] hover:tw-border hover:tw-border-[#878787]" @click="handleSignUpClick">
      <p class="tw-text-white">Sign Up</p>
    </button>
    <div class="tw-flex tw-flex-col tw-text-white tw-gap-y-4 tw-text-left tw-text-sm">
      <p class="tw-text-sm tw-text-white">
        By continuing, you agree to our
        <a href="https://example.com/terms" target="_blank" class="tw-font-bold tw-underline hover:tw-text-gray-300">
          Terms of Service
        </a>
        &
        <a href="https://example.com/privacy" target="_blank" class="tw-font-bold tw-underline hover:tw-text-gray-300">
          Privacy Policy
        </a>
      </p>

      <p class="tw-text-sm tw-text-white tw-mt-2">
        Already signed up?
        <span
            @click="switchToLogin"
            class="tw-font-bold tw-underline hover:tw-text-gray-300 tw-cursor-pointer"
        >
    Sign in
  </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { handleSignUp } from "@/services/auth.ts";
import { useFormField } from '@/composables/useFormField.ts';
import { useAlert } from '@/composables/useAlert';
import AuthHelper  from "@/components/utils/authHelper.vue"
import BaseInput from "@/components/forms/baseInput.vue";
import PasswordInput from "@/components/forms/passwordInput.vue";

const usernameField = useFormField('', (val) => val.trim().length >= 9);
const emailField = useFormField('', 'email');
const passwordField = useFormField('', 'password');
const confirmPasswordField = useFormField('', (val) => val === passwordField.value.value);

const errorMessage = ref<string | null>(null);

const emits = defineEmits(["switchToLogin"]);

async function handleSignUpClick() {
  await handleSignUp(
      usernameField.value.value,
      emailField.value.value,
      passwordField.value.value,
      confirmPasswordField.value.value,
      (event: string, message?: string) => {
        if (event === "error" && message) {
          errorMessage.value = message;
          useAlert().show(errorMessage.value, 'error');
        } else if (event === "success") {
          useAlert().show('Registration successful! Please check your email to verify your account.', 'success');
        }
      }
  );
}


function switchToLogin() {
  emits("switchToLogin");
}

</script>

<style scoped>
@import "@fortawesome/fontawesome-free/css/all.css";
</style>
