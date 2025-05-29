<template>
  <div class="tw-bg-transparent tw-rounded-xl tw-w-full tw-h-full tw-shadow-md tw-flex tw-flex-col tw-gap-4">
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
    <div class="tw-relative tw-border tw-border-[#6D6D6D] tw-rounded-lg tw-flex tw-items-center">
      <i class="fas fa-envelope tw-text-white tw-absolute tw-left-4"></i>
      <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Enter your email"
          class="tw-p-2 tw-pl-10 tw-pr-10 tw-bg-transparent tw-text-white tw-w-full tw-placeholder-[#6D6D6D] tw-rounded-lg tw-outline-none"
      />
    </div>
    <div class="tw-relative tw-border tw-border-[#6D6D6D] tw-rounded-lg tw-flex tw-items-center">
      <i class="fas fa-lock tw-text-white tw-absolute tw-left-4"></i>
      <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          id="email"
          placeholder="Enter your password"
          class="tw-p-2 tw-pl-10 tw-pr-10 tw-bg-transparent tw-text-white tw-w-full tw-placeholder-[#6D6D6D] tw-rounded-lg tw-outline-none"
      />
      <button type="button" class="tw-absolute -tw-right-1 tw-bg-transparent tw-border-none tw-cursor-pointer" @click="showPassword = !showPassword">
        <i :class="showPassword ? 'fas fa-eye-slash tw-text-white' : 'fas fa-eye tw-text-white'"></i>
      </button>
    </div>
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
import { handleLogin } from "../../services/auth.ts";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const emits = defineEmits(["loginSuccess", "switchToRegister"]);
const router = useRouter();

async function handleLoginClick() {
  await handleLogin(email.value, password.value, router, emits);
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
