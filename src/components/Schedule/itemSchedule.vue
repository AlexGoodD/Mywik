<template>
  <div class="schedule-item">
    <div class="top-right-icon" @click.stop="handleNavigate">
      <i class="fa-solid fa-arrow-up-right-from-square"></i>
    </div>
    <p class="title">{{ truncateText(schedule.name, 20) }}</p>
    <p class="subtitle">{{ truncateText(schedule.description, 30) }}</p>
    <div class="info-timestamp">
      <p class="date">
        {{ formatDate(schedule.created_at || "") }}
      </p>
      <p class="time">
        {{ formatTime(schedule.start_date) }} - {{ formatTime(schedule.end_date) }}
      </p>
    </div>
    <div class="bottom-buttons">
      <p class="details-actions">Acciones</p>
      <button @click="deleteSchedule" class="button-delete">
        <i class="fa-solid fa-trash" id="icon-delete"></i>Eliminar
      </button>
      <button @click="editSchedule" class="button-edit">
        <i class="fa-solid fa-pen" id="icon-edit"></i>Editar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNavigation } from "../../composables/useNavigation";
import { truncateText, formatTime, formatDate } from "../../utils/format";
import type { Schedule } from "../../composables/types";

const props = defineProps<{ schedule: Schedule }>();
const emits = defineEmits(["navigate", "edit", "delete"]);
const { navigateToSchedule } = useNavigation();
function handleNavigate() {
  navigateToSchedule(props.schedule.id);
  emits("navigate", props.schedule.id);
}
function editSchedule() {
  console.log("Edit", props.schedule);
  emits("edit", props.schedule);
}
function deleteSchedule() {
  emits("delete", props.schedule);
  console.log("Delete", props.schedule);
}
</script>

<style scoped>
.schedule-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 1rem;
  width: 250px;
  height: 90px;
  position: relative;
  height: auto;
}
.top-right-icon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  color: grey;
}
.title,
.subtitle {
  margin: 0;
}
.title {
  color: black;
  font-weight: bold;
  font-size: 0.9rem;
}
.subtitle {
  color: grey;
  font-size: 0.8rem;
}
.date,
.time {
  color: rgb(44, 44, 44);
  font-size: 0.7rem;
  font-weight: 500;
}
.date {
  margin-right: 0.5rem;
}
.info-timestamp {
  display: flex;
}
.bottom-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 5px;
  padding: 0;
  margin-top: 5px;
}
.details-actions {
  margin: 0;
  font-size: 0.8rem;
  color: black;
  font-weight: 600;
  margin-right: auto;
}
.button-delete,
.button-edit {
  width: auto;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.6rem;
  padding: 0.3rem 0.8rem;
}
.button-delete {
  background-color: transparent;
  color: rgb(108, 108, 108);
  border: none;
  transition: color 0.5s ease-in-out;
}
.button-edit {
  border: 1px solid rgb(42, 165, 95);
  background-color: rgb(21, 136, 71);
  color: rgb(255, 255, 255);
  transition: background-color 0.5s ease-in-out;
}
#icon-delete,
#icon-edit {
  margin-right: 0.5rem;
}
#icon-delete {
  color: rgb(108, 108, 108);
}
#icon-edit {
  color: rgb(255, 255, 255);
}
.button-delete:hover {
  color: rgb(207, 207, 207);
}
.button-edit:hover {
  background-color: rgb(90, 199, 137);
}
</style>
