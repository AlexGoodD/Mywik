<template>
  <div class="dashboard-container">
    <div class="app-navbar">
      <topNavbar
        title="Horarios"
        :menuOptions="menuOptions"
        @selectOption="handleMenuOption"
      />
      <secondTopNavbar
        @createSchedule="$emit('createSchedule')"
        @toggleView="toggleView"
      />
    </div>
    <div class="schedule-container">
      <component
        :is="isGridView ? gridSchedule : listSchedule"
        class="schedule-view"
        @error="handleComponentError"
        @editSchedule="$emit('editSchedule', $event)"
        @deleteSchedule="$emit('deleteSchedule', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import gridSchedule from "../../components/schedule/gridSchedule.vue";
import listSchedule from "../../components/schedule/listSchedule.vue";
import topNavbar from "../../components/utils/firstTopNavbar.vue";
import secondTopNavbar from "./dashboardNavbar.vue";

const isGridView = ref(true);

const menuOptions = [
  { text: "Option 1", action: "option1" },
  { text: "Option 2", action: "option2" },
  { text: "Option 3", action: "option3" },
];

function toggleView(viewType: string) {
  isGridView.value = viewType === "grid";
}

function handleComponentError(error: Error) {
  console.error("Error loading component:", error);
}

function handleMenuOption(option: { text: string; action: string }) {
  console.log(`Selected: ${option.text}`);
}
</script>

<style scoped>
.app-navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 218px;
  background-color: white;
  z-index: 2;
  padding: 0 15px 0 0;
}
.schedule-container {
  position: fixed;
  top: 125px;
  left: 218px;
  right: 0;
  bottom: 0;
  overflow: hidden;
  padding: 0 15px 0 0;
  background-color: white;
  width: calc(100vw - 249px);
  height: calc(100vh - 156px);
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-radius: 0 0 1rem 0;
}
</style>
