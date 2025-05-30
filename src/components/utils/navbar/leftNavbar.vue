<template>
  <div class="navbar">
    <div class="navbar-userinfo">
      <p>{{ userName }}</p>
    </div>
    <div class="navbar-searchbar">
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
    </div>
    <div class="navbar-items">
    <div class="nav-items">
      <p v-for="item in navItems" :key="item.text" @click="item.action">
        <i :class="item.icon" id="item-icon"></i> {{ item.text }}
      </p>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUser } from "@/composables/useUser.ts";
import { useRouter } from "vue-router";
const { userName } = useUser();
import { signOut } from "@/services/auth.ts";
const router = useRouter();

const navItems = [
  { text: "Dashboard", icon: "fas fa-gauge", action: toHome },
  { text: "Schedules", icon: "fas fa-table", action: toDashboard },
  { text: "Shared Schedules", icon: "fas fa-link", action: logout },
  { text: "Export History", icon: "fas fa-download", action: () => {} },
  { text: "Settings", icon: "fas fa-gear", action: () => {} },
  { text: "Help and first steps", icon: "fas fa-question-circle", action: () => {} },
  { text: "Logout", icon: "fas fa-right-from-bracket", action: () => {} },
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
  width: 14rem;
  background-color: #F3F5F7;
  border-right: 1px solid #DBDADF;
  border-left: 1px solid #DBDADF;
  border-bottom: 1px solid #DBDADF;
  border-radius: 1rem 0 0 1rem;
}

.navbar-userinfo {
  margin-bottom: 1rem;
  text-align: center;
  color: black;
  border-bottom: 1px solid #DBDADF;
  padding: 1rem;
  height: 4rem;

}

.navbar-searchbar, .navbar-items {
  padding: 0 0.5rem;
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
  flex-grow: 1;
  margin: 1rem 0 0;
}

.nav-items p {
  cursor: pointer;
  text-align: left;
  color: #000000;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: color 0.5s ease, transform 0.5s ease-in-out;
}

.nav-items p:hover {
  color: rgba(0, 0, 0, 0.5);
  transform: translateX(0.5rem);
}

#item-icon {
  margin-right: 0.5rem;
}
</style>
