<template>
  <div class="not-found">
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que estás buscando no existe.</p>
    <router-link to="/dashboard">Volver al inicio</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
