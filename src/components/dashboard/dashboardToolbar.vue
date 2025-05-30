<template>
  <div class="navbar">
    <div class="button-container">
      <div class="left-buttons">
        <ViewButton v-model="currentView" @update:modelValue="emitToggleView" />
        <DropdownButton
            buttonText="Filtrar"
            iconClass="fas fa-filter"
            :options="filterOptions"
            @select="emitFilterBy"
        />

        <DropdownButton
            buttonText="Ordenar"
            iconClass="fas fa-sort"
            :options="sortOptions"
            @select="emitSortBy"
        />
      </div>
      <div class="right-button">
        <fillButton
          buttonText="Crear Horario"
          iconClass="fas fa-plus"
          @click="emitCreateSchedule"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import fillButton from "@/components/utils/buttons/fillButton.vue";
import ViewButton from "@/components/utils/buttons/viewButton.vue";
import DropdownButton from "@/components/utils/buttons/dropdownButton.vue";

const emits = defineEmits(["createSchedule", "toggleView", "filterBy", "sortBy"]);
const showSortMenu = ref(false);
const showFilterMenu = ref(false);
const currentView = ref<'grid' | 'list'>('grid')


function emitCreateSchedule() {
  emits("createSchedule");
}

function emitToggleView(viewType: 'grid' | 'list') {
  currentView.value = viewType
  emits('toggleView', viewType)
}

function emitFilterBy(criteria: string) {
  emits("filterBy", criteria);
  showFilterMenu.value = false;
}

function emitSortBy(criteria: string) {
  emits("sortBy", criteria);
  showSortMenu.value = false;
}

const filterOptions = [
  { label: 'Filtrar por mes', value: 'month' },
  { label: 'Filtrar por año', value: 'year' }
];

const sortOptions = [
  { label: 'Nombre Ascendente', value: 'nameAsc' },
  { label: 'Nombre Descendente', value: 'nameDesc' },
  { label: 'Fecha Ascendente', value: 'dateAsc' },
  { label: 'Fecha Descendente', value: 'dateDesc' }
];
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #d9d9d9;
  outline: 1px solid #d9d9d9;
  height: 4rem;
}

.button-container {
  display: flex;
  padding: 1rem;
  width: 100%;
}

.left-buttons {
  display: flex;
  gap: 1rem;
}

.right-button {
  margin-left: auto;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-content p {
  margin: 0;
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  color: black;
  cursor: pointer;
}

.dropdown-content p:hover {
  background-color: #f0f0f0;
}
</style>
