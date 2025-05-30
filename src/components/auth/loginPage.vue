<template>
  <div class="tw-bg-transparent tw-rounded-xl tw-w-full tw-h-full tw-shadow-md tw-flex tw-flex-col tw-gap-3">
    <h2 class="tw-text-white  tw-text-left tw-mt-4 tw-mb-10">Ready to be productive? Log in to your calendar.</h2>
    <button class="tw-relative tw-border tw-bg-[#1f1f1f] tw-border-[#6D6D6D] tw-rounded-lg tw-flex tw-justify-center tw-gap-x-4 tw-items-center">
      <i class="fa-brands fa-google tw-text-white"></i>
      <p class="tw-text-white">Continue with Google</p>
    </button>
    <div class="tw-flex tw-text-[#6D6D6D] tw-items-center tw-justify-between">
      <hr class="tw-w-[45%] tw-border-[#6D6D6D]"/>
      <p class="tw-text-md tw-font-bold">Or</p>
      <hr class="tw-w-[45%] tw-border-[#6D6D6D]"/>
    </div>
    <BaseInput
        v-model="emailField.value.value"
        icon="fas fa-user"
        id="email"
        placeholder="Enter an email address"
        @blur="emailField.onBlur"
    />
    <PasswordInput
        v-model="passwordField.value.value"
        id="password"
        placeholder="Enter a password"
        @blur="passwordField.onBlur"
    />
    <button class="tw-border tw-bg-[#1f1f1f] tw-border-[#6D6D6D] tw-rounded-lg tw-flex tw-justify-center tw-gap-x-4 tw-items-center" @click="handleLoginClick">
      <p class="tw-text-white">Sign in</p>
    </button>
    <div class="tw-flex tw-flex-col tw-text-white tw-gap-y-4 tw-text-left tw-text-sm">
      <p class="tw-text-sm tw-text-white tw-mt-2">
        Don’t have an account?
        <span
            @click="switchToRegister"
            class="tw-font-bold tw-underline hover:tw-text-gray-300 tw-cursor-pointer"
        >
    Sign up
  </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {useRouter} from "vue-router";
import { handleLogin } from "@/services/auth";
import { useFormField } from '@/composables/useFormField.ts';
import { useAlert } from '@/composables/useAlert';
import { useLoaderOverlay } from '@/composables/useLoaderOverlay';
import BaseInput from "@/components/forms/baseInput.vue";
import PasswordInput from "@/components/forms/passwordInput.vue";

const emailField = useFormField('', 'email');
const passwordField = useFormField('', 'password');
const emits = defineEmits(["loginSuccess", "switchToRegister"]);
const errorMessage = ref<string | null>(null);

const { show, hide } = useLoaderOverlay();
const router = useRouter();

async function handleLoginClick() {
  show();
  await handleLogin(emailField.value.value, passwordField.value.value, (event: string, message?: string) => {
    hide();
    if (event === "error" && message) {
      errorMessage.value = message;
      useAlert().show(errorMessage.value, 'error');
    } else if (event === "success") {
      useAlert().show('Login successful!', 'success');
      setTimeout(() => {
        hide();
        router.push('/dashboard');
      }, 500);
    }
  });
}

function switchToRegister() {
  emits("switchToRegister");
}
</script>

<style scoped>
@import "@fortawesome/fontawesome-free/css/all.css";

input:-webkit-autofill {
  box-shadow: 0 0 0 1000px transparent inset !important;
  -webkit-text-fill-color: white !important;
  transition: background-color 9999s ease-in-out 0s;
}
</style>
