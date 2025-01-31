<template>
  <div class="schedule-item" @click="navigateToSchedule">
    <p>ID de la Tabla: {{ schedule.id }}</p>
    <p>ID del Usuario: {{ schedule.user_id }}</p>
    <p>Nombre: {{ schedule.name }}</p>
    <p>Hora de Inicio: {{ schedule.start_date }}</p>
    <p>Hora de Fin: {{ schedule.end_date }}</p>
    <p>Intervalo: {{ schedule.interval }} minutos</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Schedule {
  id: string;
  user_id: string;
  name: string;
  start_date: string;
  end_date: string;
  interval: number;
}

const props = defineProps<{ schedule: Schedule }>();
const emits = defineEmits(["navigate"]);

function navigateToSchedule() {
  emits("navigate", props.schedule.id);
}
</script>

<style scoped>
.schedule-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  color: black;
}
</style>
