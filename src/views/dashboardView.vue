<template>
  <DashboardPage/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useLayout } from '@/composables/useLayout'
import DashboardPage from "@/components/dashboard/dashboardPage.vue";
const { topbarTitle, topbarOptions, showTopbar } = useLayout()

onMounted(() => {
  topbarTitle.value = 'Dashboard'
  topbarOptions.value = [
    { text: 'Ver reportes', action: 'reports' },
    { text: 'Crear usuario', action: 'create-user' }
  ]
  showTopbar.value = true
})
</script>

<style scoped>
</style>
