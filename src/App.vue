<!-- App.vue -->
<template>
  <component :is="layoutComponent">
    <router-view />
  </component>

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
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAlert } from './composables/useAlert'
import { useLoaderOverlay } from './composables/useLoaderOverlay'
import SuccessAlert from "./components/utils/alerts/sucessAlert.vue"
import ErrorAlert from "./components/utils/alerts/errorAlert.vue"
import LoaderOverlay from "@/components/utils/loaderOverlay.vue"
import MainLayout from "@/components/layouts/mainLayout.vue"

const route = useRoute()
const layoutComponent = computed(() =>
    route.meta.layout === 'none' ? 'div' : MainLayout
)

const { message, visible, isHiding, type } = useAlert()
const { visible: overlayVisible } = useLoaderOverlay()
</script>