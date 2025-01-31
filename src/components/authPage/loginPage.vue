<template>
  <div class="container">
    <h2>Inicio de sesión</h2>
    <div class="input-group">
      <label for="email">Email</label>
      <div class="input-with-icon">
        <i class="fas fa-envelope"></i>
        <input v-model="email" type="email" id="email" placeholder="Ingresa tu Email" />
      </div>
    </div>
    <div class="input-group">
      <label for="password">Contraseña</label>
      <div class="password-container">
        <i class="fas fa-lock" id="icon-der"></i>
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          placeholder="Ingresa tu contraseña"
        />
        <button type="button" class="toggle-password" @click="togglePasswordVisibility">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" id="icon-izq"></i>
        </button>
      </div>
    </div>
    <button @click="handleLoginClick" class="submit-data">Iniciar sesión</button>
    <p>
      ¿No tienes una cuenta? <a @click="switchToRegister" class="switch">Regístrate</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { handleLogin } from "../../services/auth.ts";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const emits = defineEmits(["loginSuccess", "switchToRegister"]);
const router = useRouter();

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

async function handleLoginClick() {
  await handleLogin(email.value, password.value, router, emits);
}

function switchToRegister() {
  emits("switchToRegister");
}
</script>

<style scoped>
@import "@fortawesome/fontawesome-free/css/all.css";
@import "../../assets/auth.css";
</style>
