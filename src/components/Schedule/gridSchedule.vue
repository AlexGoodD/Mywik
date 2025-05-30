<template>
  <div class="grid-container">
    <div class="grid-schedule">
      <scheduleItem
        v-for="schedule in userSchedules"
        :key="schedule.id"
        :schedule="schedule"
        @navigate="navigateToSchedule"
        @edit="handleEditSchedule"
        @delete="deleteSchedule"
        class="schedule-item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNavigation } from "../../composables/useNavigation";
import { useSchedules } from "../../composables/useSchedules";
const { navigateToSchedule } = useNavigation();
const { userSchedules } = useSchedules();
import scheduleItem from "./itemSchedule.vue";
const emits = defineEmits(["editSchedule", "deleteSchedule"]);

function handleEditSchedule(schedule: any) {
  emits("editSchedule", schedule);
}

function deleteSchedule(schedule: any) {
  emits("deleteSchedule", schedule);
}
</script>

<style scoped>
.grid-container {
  width: calc(100% + 13px);
  height: calc(100% - 130px);
}
.grid-schedule {
  display: flex;
  flex-wrap: wrap;
  padding: 1.5rem;
  column-gap: 1.85rem;
  row-gap: 1.9rem;
  align-items: flex-start;
  overflow: hidden;
}
</style>
