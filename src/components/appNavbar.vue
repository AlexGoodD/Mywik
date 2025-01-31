<template>
  <div class="navbar">
    <div class="user-info">
      <p>{{ userName }}</p>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="Buscar..." />
    </div>
    <ul class="nav-items">
      <li @click="toHome">Inicio</li>
      <li @click="toDashboard">Dashboard</li>
      <li @click="logout">Salir</li>
    </ul>
    <ul class="nav-bottom-items">
      <li @click="">Invitar amigos</li>
      <li @click="">Ayuda y primeros pasos</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "../composables/useUser";
import { useRouter } from "vue-router";
const { userName } = useUser();
import { signOut } from "../services/auth";
const router = useRouter();

function toHome() {
  router.push("/");
}

function toDashboard() {
  router.push("/dashboard");
}

async function logout() {
  await signOut();
  router.push("/auth");
}
</script>

<style scoped>
.navbar {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 95%;
  background-color: #f7f7f7;
  border: 1px solid #d9d9d9;
  padding: 1rem;
  border-radius: 0.5rem;
}

.user-info {
  margin-bottom: 2rem;
  text-align: center;
  color: black;
}

.search-bar {
  display: flex;
}

.search-bar input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  color: #575757;
}

.nav-items li {
  padding: 0.5rem 0;
  cursor: pointer;
  text-align: center;
}

.nav-items li:hover {
  background-color: #e9ecef;
}

.nav-bottom-items {
  list-style: none;
  text-align: center;
  padding: 1rem 0;
  margin: 0;
  flex-grow: 1;
  color: #575757;
}

.nav-bottom-items li {
  cursor: pointer;
}
</style>
