<template>
  <div class="form-container">
    <h2>Crear Nuevo Evento</h2>
    <form @submit.prevent="handleSubmit">
      <div class="input-group">
        <label for="title">Título</label>
        <input v-model="title" type="text" id="title" required />
      </div>
      <div class="input-group">
        <label for="description">Descripción</label>
        <textarea v-model="description" id="description" required></textarea>
      </div>
      <div class="input-group">
        <label for="start_time">Hora de Inicio</label>
        <input v-model="start_time" type="time" id="start_time" required />
      </div>
      <div class="input-group">
        <label for="end_time">Hora de Fin</label>
        <input v-model="end_time" type="time" id="end_time" required />
      </div>
      <div class="input-group">
        <label for="color">Color</label>
        <input v-model="color" type="color" id="color" required />
      </div>
      <div class="input-group">
        <label>Días de la Semana</label>
        <div v-for="day in daysOfWeek" :key="day">
          <input type="checkbox" :id="day" v-model="selectedDays" :value="day" />
          <label :for="day">{{ day }}</label>
        </div>
      </div>
      <button type="submit">Crear Evento</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createEvent } from "../../services/events";
import { useRoute } from "vue-router";

const title = ref("");
const description = ref("");
const start_time = ref("");
const end_time = ref("");
const color = ref("#000000");
const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
const selectedDays = ref<string[]>([]); // Estado reactivo para los días seleccionados
const route = useRoute();
const schedule_id = route.params.scheduleId as string;
const emits = defineEmits(["close"]);

const handleSubmit = async () => {
  const event = {
    schedule_id,
    title: title.value,
    description: description.value,
    start_time: start_time.value,
    end_time: end_time.value,
    color: color.value,
    day_of_week: selectedDays.value, // Agregar los días seleccionados al objeto event
    created_at: new Date().toISOString(),
  };

  try {
    await createEvent(event);
    alert("Evento creado exitosamente");
    emits("close");
  } catch (error) {
    alert("Error al crear el evento: " + (error as Error).message);
  }
};
</script>

<style scoped>
.form-container {
  width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.input-group input,
.input-group textarea,
.input-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #42b883;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #38a169;
}
</style>
