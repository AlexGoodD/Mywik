<template>
  <div class="tw-flex tw-h-[100vh] tw-w-[100vw] tw-bg-gradient-to-br tw-from-[#030303] tw-to-[#1e241e] tw-p-20 tw-items-center">
    <div class=" tw-w-[25rem] tw-h-[90%]">
      <h1 class="tw-text-3xl tw-text-white tw-text-left">Welcome to <b>Mywik</b></h1>
      <component
          :is="isLogin ? LoginPage : RegisterPage"
          @switchToRegister="toggleView"
          @switchToLogin="toggleView"
      />
    </div>
    <div class="">

    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import RegisterPage from "../components/auth/registerPage.vue";
import LoginPage from "../components/auth/loginPage.vue";

const isLogin = ref(true);

const toggleView = () => {
  isLogin.value = !isLogin.value;
};
</script>
