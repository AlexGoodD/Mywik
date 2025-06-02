<template>
  <Toolbar @createSchedule="$emit('createSchedule')"
           @toggleView="toggleView"/>
  <component
      :is="isGridView ? gridSchedule : listSchedule"
      @error="handleComponentError"
      @editSchedule="$emit('editSchedule', $event)"
      @deleteSchedule="$emit('deleteSchedule', $event)"
  />
</template>

<script setup lang="ts">
import {ref} from "vue";
import Toolbar from "@/components/dashboard/dashboardToolbar.vue"
import gridSchedule from "@/components/schedule/gridSchedule.vue";
import listSchedule from "@/components/schedule/listSchedule.vue";

const isGridView = ref(true);

function toggleView(viewType: string) {
  isGridView.value = viewType === "grid";
}

function handleComponentError(error: Error) {
  console.error("Error loading component:", error);
}
</script>
<style scoped></style>
