<template>
  <div v-if="isLoggedIn" class="container">
    <Navbar v-if="!$route.meta.hideNavbar" class="navbar-left" />
    <div class="content">
      <router-view />
    </div>
  </div>
  <div v-else class="container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/leftNavbar.vue";
import { isLoggedIn } from "./composables/useAuth";
</script>

<style scoped>
.navbar-left {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
.content {
  overflow: none;
}
</style>
