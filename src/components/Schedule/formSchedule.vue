<template>
  <div class="form-container">
    <h2>Crear Nueva Tabla</h2>
    <form @submit.prevent="handleSubmit">
      <div class="input-group">
        <label for="name">Nombre de la Tabla</label>
        <input v-model="name" type="text" id="name" required />
      </div>
      <div class="input-group">
        <label for="start_date">Hora de Inicio</label>
        <input v-model="start_date" type="time" id="start_date" required />
      </div>
      <div class="input-group">
        <label for="end_date">Hora de Fin</label>
        <input v-model="end_date" type="time" id="end_date" required />
      </div>
      <div class="input-group">
        <label for="interval">Intervalo</label>
        <input v-model="interval" type="number" id="interval" required />
      </div>
      <button type="submit">Crear Tabla</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createSchedule } from "../../services/schedule";
import { useUser } from "../../composables/useUser";

const name = ref("");
const start_date = ref();
const end_date = ref();
const interval = ref("");
const { userId } = useUser();
const emits = defineEmits(["close"]);

const handleSubmit = async () => {
  const schedule = {
    user_id: userId.value,
    name: name.value,
    start_date: start_date.value,
    end_date: end_date.value,
    interval: Number(interval.value),
  };

  try {
    await createSchedule(schedule);
    alert("Tabla creada exitosamente");
    emits("close");
  } catch (error) {
    alert("Error al crear la tabla: " + (error as Error).message);
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

.input-group input {
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
