<!-- App.vue -->
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

  <!-- Global Overlay -->
  <LoaderOverlay :model-value="overlayVisible" />

  <!-- Global Alerts -->
  <SuccessAlert
      v-if="visible && type === 'success'"
      :message="message"
      :visible="visible"
      :isHiding="isHiding"
  />
  <ErrorAlert
      v-else-if="visible && type === 'error'"
      :message="message"
      :visible="visible"
      :isHiding="isHiding"
  />
</template>

<script setup lang="ts">
import Navbar from "./components/leftNavbar.vue";
import { isLoggedIn } from "./composables/useAuth";
import { useAlert } from './composables/useAlert';
import { useLoaderOverlay } from './composables/useLoaderOverlay';
import SuccessAlert from "./components/utils/sucessAlert.vue";
import ErrorAlert from "./components/utils/errorAlert.vue";
import LoaderOverlay from "@/components/utils/loaderOverlay.vue";

const { message, visible, isHiding, type } = useAlert();
const { visible: overlayVisible } = useLoaderOverlay();
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
