<template>
  <div>
    <table>
      <thead>
        <tr>
          <th class="time">Hora</th>
          <th v-for="day in selectedDays" :key="day" class="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="slot in timeSlots" :key="slot.start">
          <td class="slot-time">{{ slot.start }} - {{ slot.end }}</td>
          <td
            v-for="day in selectedDays"
            :key="day"
            class="slot-event"
            :style="getEventStyle(slot, day)"
          >
            {{ getEventTitle(slot, day) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { getSchedules } from "../../services/schedule";
import { generateTimeSlots } from "../../utils/timeSlots";
import {
  fetchEvents,
  getEventStyle,
  getEventTitle,
} from "../../composables/useEventSlots";
import type { Schedule } from "../../composables/types";

const props = defineProps<{ scheduleId: string }>();

const timeSlots = ref<{ start: string; end: string }[]>([]);
const selectedDays = ref<string[]>([]);

const schedules = ref<Schedule[]>([]);

const fetchSchedule = async (scheduleId: string) => {
  schedules.value = await getSchedules();
  const schedule = schedules.value.find((s) => s.id === scheduleId);

  if (schedule) {
    timeSlots.value = generateTimeSlots(
      schedule.start_date,
      schedule.end_date,
      schedule.interval
    );
    selectedDays.value = schedule.days;
  }
};

onMounted(() => {
  fetchSchedule(props.scheduleId);
  fetchEvents(props.scheduleId);
});

watch(
  () => props.scheduleId,
  (newId) => {
    fetchSchedule(newId);
    fetchEvents(newId);
  }
);
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #d8dadc;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f6f8fa;
}

.day,
.time {
  color: #797c87;
  font-weight: 400;
  font-size: 0.8rem;
}

.slot-time {
  font-weight: 400;
  font-size: 0.8rem;
  color: black;
  background-color: white;
}

.slot-event {
  font-weight: 400;
  font-size: 0.8rem;
  color: black;
  background-color: white;
}
</style>
