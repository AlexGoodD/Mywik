<template>
  <div>
    <h1>Bienvenido, {{ userName }}</h1>
    <Calendar />
  </div>
</template>

<script setup lang="ts">
import { useUser } from "../composables/useUser";
import Calendar from "../components/Schedule/tableCalendar.vue";

const { userName } = useUser();
</script>
