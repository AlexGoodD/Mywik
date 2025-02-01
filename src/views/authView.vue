<template>
  <div class="auth-container">
    <component
      :is="isLogin ? LoginPage : RegisterPage"
      @switchToRegister="toggleView"
      @switchToLogin="toggleView"
    />
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

<style scoped></style>
