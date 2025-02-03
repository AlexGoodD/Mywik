<template>
  <div>
    <dashboardPage
      class="dashboard-container"
      @createSchedule="showForm = true"
      @editSchedule="editSchedule"
    />
    <div v-if="showForm" class="overlay" @click="showForm = false">
      <formSchedule
        :initialData="currentSchedule"
        @close="showForm = false"
        @scheduleCreated="handleScheduleCreated"
        class="form-schedule"
        @click.stop
      />
    </div>
    <confirmAlert
      v-if="showAlert"
      :title="'Confirmar eliminación'"
      :description="'¿Estás seguro de que deseas eliminar este horario?'"
      :cancelText="'Cancelar'"
      :confirmText="'Eliminar'"
      @cancel="showAlert = false"
      @confirm="deleteSchedule"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dashboardPage from "../components/dashboard/dashboardPage.vue";
import formSchedule from "../components/schedule/formSchedule.vue";
import confirmAlert from "../components/utils/confirmAlert.vue";

const showForm = ref(false);
const showAlert = ref(false);

const currentSchedule = ref(null);
const scheduleToDelete = ref(null);

function handleScheduleCreated() {
  showForm.value = false;
  currentSchedule.value = null;
}

function editSchedule(schedule: any) {
  currentSchedule.value = schedule;
  showForm.value = true;
}

function confirmDeleteSchedule(schedule: any) {
  scheduleToDelete.value = schedule;
  showAlert.value = true;
}

function deleteSchedule() {
  console.log("Deleting schedule:", scheduleToDelete.value);
  showAlert.value = false;
  scheduleToDelete.value = null;
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-schedule {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
</style>
