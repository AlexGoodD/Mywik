<template>
  <div>
    <table-schedule :schedule-id="scheduleId" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import TableSchedule from "./tableSchedule.vue";

const route = useRoute();
const scheduleId = ref(
  Array.isArray(route.params.scheduleId)
    ? route.params.scheduleId[0]
    : route.params.scheduleId
);

watch(
  () => route.params.scheduleId,
  (newId) => {
    scheduleId.value = Array.isArray(newId) ? newId[0] : newId;
  }
);

onMounted(() => {
  console.log("scheduleId.value", scheduleId.value);
});
</script>

<style scoped></style>
