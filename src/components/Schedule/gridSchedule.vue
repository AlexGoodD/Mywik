<template>
  <div>
    <schedule-item
      v-for="schedule in userSchedules"
      :key="schedule.id"
      :schedule="schedule"
      @navigate="navigateToSchedule"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getSchedules } from "../../services/schedule";
import { useUser } from "../../composables/useUser";
import ScheduleItem from "./scheduleItem.vue";
import { useRouter } from "vue-router";

const { userId } = useUser();
const router = useRouter();

interface Schedule {
  id: string;
  user_id: string;
  name: string;
  start_date: string;
  end_date: string;
  interval: number;
}

const userSchedules = ref<Schedule[]>([]);

onMounted(async () => {
  const schedules = await getSchedules();
  userSchedules.value = schedules.filter((schedule) => schedule.user_id === userId.value);
});

function navigateToSchedule(scheduleId: string) {
  router.push({ name: "SchedulePage", params: { scheduleId } });
}
</script>

<style scoped></style>
