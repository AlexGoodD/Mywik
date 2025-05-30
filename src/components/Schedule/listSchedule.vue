<template>
  <div class="schedule-list-container">
    <table>
      <thead>
        <tr>
          <th class="name">Nombre</th>
          <th class="description">Descripción</th>
          <th class="edit">Edición</th>
          <th class="created-at">Fecha de creación</th>
          <th class="start-time">Hora de inicio</th>
          <th class="end-time">Hora de fin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="schedule in userSchedules" :key="schedule.id">
          <td class="name">{{ truncateText(schedule.name, 20) }}</td>
          <td class="description">{{ truncateText(schedule.description, 30) }}</td>
          <td class="edit">
            <button @click="editSchedule(schedule.id)">Editar</button>
          </td>
          <td class="created-at">
            {{ formatDate(schedule.created_at) }}
          </td>
          <td class="start-time">{{ formatTime(schedule.start_date) }}</td>
          <td class="end-time">{{ formatTime(schedule.end_date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { truncateText, formatTime, formatDate } from "@/utils/format.ts";
import { useNavigation } from "@/composables/useNavigation.ts";
import { useSchedules } from "@/composables/useSchedules.ts";

const { navigateToSchedule } = useNavigation();
const { userSchedules } = useSchedules();

function editSchedule(scheduleId: string) {
  navigateToSchedule(scheduleId);
}
</script>

<style scoped>
.schedule-list-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #DBDADF;
  padding: 8px;
  text-align: center;
  height: 3rem;
}

/* Eliminar borde izquierdo de la primera columna */
th:first-child,
td:first-child {
  border-left: none;
}

/* Eliminar borde derecho de la última columna */
th:last-child,
td:last-child {
  border-right: none;
}

th {
  background-color: #F6F8FA;
}

.name,
.description,
.edit,
.created-at,
.start-time,
.end-time {
  color: #797c87;
  font-weight: 400;
  font-size: 0.8rem;
}

td {
  font-weight: 400;
  font-size: 0.8rem;
  color: black;
  background-color: white;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #42b883;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #38a169;
}
</style>
