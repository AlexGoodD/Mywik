<template>
  <div class="navbar">
    <div class="user-info">
      <p>{{ userName }}</p>
    </div>
    <div class="search-bar">
      <span class="search-icon">
        <i class="fas fa-search"></i>
      </span>
      <input
        type="text"
        :placeholder="isSearchActive ? 'Buscar' : ''"
        :class="{ active: isSearchActive }"
        @focus="isSearchActive = true"
        @blur="isSearchActive = false"
      />
    </div>
    <div class="nav-items">
      <p v-for="item in navItems" :key="item.text" @click="item.action">
        <i :class="item.icon" id="item-icon"></i> {{ item.text }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUser } from "../composables/useUser";
import { useRouter } from "vue-router";
const { userName } = useUser();
import { signOut } from "../services/auth";
const router = useRouter();

const navItems = [
  { text: "Inicio", icon: "fas fa-home", action: toHome },
  { text: "Mis horarios", icon: "fas fa-calendar-alt", action: toDashboard },
  { text: "Salir", icon: "fas fa-sign-out-alt", action: logout },
  { text: "Invitar amigos", icon: "fas fa-user-plus", action: () => {} },
  { text: "Ayuda y primeros pasos", icon: "fas fa-question-circle", action: () => {} },
];

const isSearchActive = ref(false);

function toHome() {
  router.push("/");
}

function toDashboard() {
  router.push("/dashboard");
}

async function logout() {
  await signOut();
  router.push("/");
}

// Abrir barra de búsqueda al presionar "/"
onMounted(() => {
  window.addEventListener("keydown", (event) => {
    if (event.key === "/") {
      event.preventDefault();
      isSearchActive.value = true;
      (document.querySelector(".search-bar input") as HTMLInputElement)?.focus();
    }
  });
});
</script>

<style scoped>
.navbar {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  width: 185px;
  background-color: #f3f5f7;
  border: 1px solid #d9d9d9;
  padding: 0.5rem;
  border-radius: 1rem 0 0 1rem;
  height: calc(100% - 47px);
}

.user-info {
  margin-bottom: 2rem;
  text-align: center;
  color: black;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
}

.search-bar .search-icon {
  position: absolute;
  left: 0.5rem;
  color: #ccc;
}

.search-bar input {
  width: 10%;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.search-bar input.active {
  width: 72%;
}
.nav-items {
  list-style: none;
  padding: 0 0.5rem;
  margin: 0;
  flex-grow: 1;
  margin-top: 1rem;
}

.nav-items p {
  cursor: pointer;
  text-align: left;
  color: #575757;
  font-size: 0.75rem;
  margin-bottom: 1.5rem;
  transition: color 0.5s ease, transform 0.5s ease-in-out;
}

.nav-items p:hover {
  color: #858585;
  transform: translateX(10px);
}

#item-icon {
  margin-right: 0.5rem;
}
</style>
