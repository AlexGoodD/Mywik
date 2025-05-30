<template>
  <div class="form-container">
    <form @submit.prevent="handleFormSubmit">
      <div class="general-info-group">
        <div class="section-header">
          <i class="fa-solid fa-tag"></i>
          <h3>General</h3>
        </div>
        <div>
          <div class="input-group">
            <label for="name">Nombre del horario</label>
            <input v-model="name" type="text" id="name" required />
          </div>
          <div class="input-group">
            <label for="description">Descripción</label>
            <input v-model="description" type="text" id="description" required />
          </div>
        </div>
      </div>
      <div class="time-info-group">
        <div class="section-header">
          <i class="fa-solid fa-clock"></i>
          <h3>Horarios</h3>
        </div>
        <div>
          <div class="time-group">
            <div class="input-group">
              <label for="start_date">Hora inicio</label>
              <input v-model="start_date" type="time" id="start_date" required />
            </div>
            <div class="input-group">
              <label for="end_date">Hora fin</label>
              <input v-model="end_date" type="time" id="end_date" required />
            </div>
          </div>
          <div class="input-group">
            <label for="interval">Intervalos (minutos)</label>
            <input v-model="interval" type="number" id="interval" required />
          </div>
        </div>
      </div>
      <div class="week-info-group">
        <div class="section-header">
          <i class="fa-solid fa-calendar"></i>
          <h3>Días</h3>
        </div>
        <div>
          <div class="input-group" id="group-days">
            <div class="days-container">
              <div
                v-for="day in daysOfWeek"
                :key="day"
                :class="['day-circle', { selected: selectedDays.includes(day) }]"
                @click="toggleDay(day)"
              >
                {{ getDayLetter(day) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons-form-schedule">
        <button
          type="button"
          class="outlined-button"
          id="default-button"
          @click="resetForm"
        >
          Predeterminado
        </button>
        <button type="button" class="outlined-button" @click="closeForm(emits)">
          Cancelar
        </button>
        <button type="submit" class="fill-button">Crear</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useFormScheduleHandler } from "../../composables/useFormSchedule";

const props = defineProps<{ initialData?: any }>();
const emits = defineEmits(["close", "scheduleCreated"]);

const {
  name,
  description,
  start_date,
  end_date,
  interval,
  daysOfWeek,
  selectedDays,
  handleFormSubmit,
  toggleDay,
  resetForm,
  closeForm,
  getDayLetter,
} = useFormScheduleHandler(props, emits);
</script>

<style scoped>
@import "../../assets/form.css";
</style>
