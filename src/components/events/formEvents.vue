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
        <label for="day_of_week">Día de la Semana</label>
        <select v-model="day_of_week" id="day_of_week" required>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>
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
const day_of_week = ref("Lunes");
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
    day_of_week: day_of_week.value,
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
