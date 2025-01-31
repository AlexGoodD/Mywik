<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { checkAuthStatus } from "./composables/useAuth";
import { useRouter } from "vue-router";

const router = useRouter();

router.beforeEach(async (to, from, next) => {
  await checkAuthStatus();
  next();
});
</script>

<style scoped></style>
