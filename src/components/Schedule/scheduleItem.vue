<template>
  <div class="schedule-item" @click="handleNavigate">
    <p>Nombre: {{ schedule.name }}</p>
    <p>Hora de Inicio: {{ schedule.start_date }}</p>
    <p>Hora de Fin: {{ schedule.end_date }}</p>
  </div>
</template>

<script setup lang="ts">
import { useNavigation } from "../../composables/useNavigation";

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
const { navigateToSchedule } = useNavigation();

function handleNavigate() {
  navigateToSchedule(props.schedule.id);
  emits("navigate", props.schedule.id);
}
</script>

<style scoped>
.schedule-item {
  display: flex;
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  cursor: pointer;
  color: black;
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
