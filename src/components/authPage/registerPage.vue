<template>
  <div class="container">
    <h2>Registro de Usuario</h2>
    <div class="input-group">
      <label for="email">Nombre de usuario</label>
      <div class="input-with-icon">
        <i class="fas fa-envelope"></i>
        <input
          v-model="user"
          type="user"
          id="user"
          placeholder="Ingresa un nombre de usuario"
        />
      </div>

      <label for="email">Correo electrónico</label>
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
    <button @click="handleSignUpClick" class="submit-data">Registrarse</button>
    <p>
      ¿Ya tienes una cuenta? <a @click="switchToLogin" class="switch">Inicia sesión</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { handleSignUp } from "../../services/auth";

const email = ref("");
const user = ref("");
const password = ref("");
const showPassword = ref(false);
const emits = defineEmits(["registerSuccess", "switchToLogin"]);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

async function handleSignUpClick() {
  await handleSignUp(user.value, email.value, password.value, emits);
}

function switchToLogin() {
  emits("switchToLogin");
}
</script>

<style scoped>
@import "@fortawesome/fontawesome-free/css/all.css";
@import "../../assets/auth.css";
</style>
