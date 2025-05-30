<template>
  <p v-if="show" class="tw-text-sm tw-text-left tw-text-red-500"><i class="fa-solid fa-circle-exclamation tw-mr-2"></i>{{ message }}</p>
</template>

<script setup lang="ts">
const { show, message } = defineProps<{
  show: boolean;
  message: string;
}>();
</script>

<style scoped>
/* Puedes agregar estilos adicionales si es necesario */
</style>