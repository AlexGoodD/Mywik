<template>
  <div>
    <table-schedule :schedule-id="scheduleId" />
    <ButtonCreate @click="showFormEvent = true" />
    <formEvents v-if="showFormEvent" @close="showFormEvent = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import TableSchedule from "./tableSchedule.vue";

import ButtonCreate from "../../components/items/createButton.vue";
import formEvents from "../events/formEvents.vue";
const showFormEvent = ref(false);

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
