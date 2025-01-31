<template>
  <div>
    <Navbar v-if="isLoggedIn" class="navbar-left" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/appNavbar.vue";
import { isLoggedIn, checkAuthStatus } from "./composables/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();

router.beforeEach(async (to, from, next) => {
  await checkAuthStatus();
  next();
});
</script>

<style scoped>
.navbar-left {
  position: fixed;
  top: 0.5%;
  left: 0.5%;
}
</style>
