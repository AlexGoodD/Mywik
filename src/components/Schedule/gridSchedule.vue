<template>
  <div class="grid-schedule">
    <scheduleItem
      v-for="schedule in userSchedules"
      :key="schedule.id"
      :schedule="schedule"
      @navigate="navigateToSchedule"
      class="schedule-item"
    />
  </div>
</template>

<script setup lang="ts">
import { useSchedules } from "../../composables/useSchedules";
import { useNavigation } from "../../composables/useNavigation";
const { userSchedules } = useSchedules();
const { navigateToSchedule } = useNavigation();
import scheduleItem from "./scheduleItem.vue";
</script>

<style scoped>
.grid-schedule {
  display: flex;
  gap: 2rem;
}

.schedule-item {
  transition: transform 0.5s ease-in-out;
}

.schedule-item:hover {
  transform: scale(1.1);
}
</style>
