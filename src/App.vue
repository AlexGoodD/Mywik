<template>
  <div class="container">
    <Navbar v-if="showNavbar" class="navbar-left" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Navbar from "./components/appNavbar.vue";
import { checkAuthStatus } from "./composables/useAuth";

const router = useRouter();
const route = useRoute();
const showNavbar = ref(true);

watch(route, (newRoute) => {
  showNavbar.value = newRoute.path !== "/";
});

router.beforeEach(async (to, from, next) => {
  await checkAuthStatus();
  next();
});
</script>

<style scoped>
.container {
  display: flex;
}
.navbar-left {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
