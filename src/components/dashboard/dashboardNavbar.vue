<template>
  <div class="navbar">
    <div class="button-container">
      <div class="left-buttons">
        <div class="dropdown" id="view-dropdown">
          <button class="view-button" @click="toggleViewMenu">
            <i :class="currentViewIcon"></i> {{ currentViewText }}
            <i class="fas fa-caret-down"></i>
          </button>
          <div v-if="showViewMenu" class="dropdown-content">
            <p v-if="currentView !== 'grid'" @click="emitToggleView('grid')">
              <i class="fas fa-th"></i> Vista cuadrícula
            </p>
            <p v-if="currentView !== 'list'" @click="emitToggleView('list')">
              <i class="fas fa-list"></i> Vista lista
            </p>
          </div>
        </div>
        <div class="dropdown" id="filter-dropdown">
          <outButton
            buttonText="Filtrar"
            iconClass="fas fa-filter"
            @click="toggleFilterMenu"
          />
          <div v-if="showFilterMenu" class="dropdown-content">
            <p @click="emitFilterBy('month')">Filtrar por mes</p>
            <p @click="emitFilterBy('year')">Filtrar por año</p>
          </div>
        </div>
        <div class="dropdown" id="sort-dropdown">
          <outButton
            buttonText="Ordenar"
            iconClass="fas fa-sort"
            @click="toggleSortMenu"
          />
          <div v-if="showSortMenu" class="dropdown-content">
            <p @click="emitSortBy('nameAsc')">Nombre Ascendente</p>
            <p @click="emitSortBy('nameDesc')">Nombre Descendente</p>
            <p @click="emitSortBy('dateAsc')">Fecha Ascendente</p>
            <p @click="emitSortBy('dateDesc')">Fecha Descendente</p>
          </div>
        </div>
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
import { ref, computed } from "vue";
import fillButton from "../../components/items/fillButton.vue";
import outButton from "../../components/items/outlinedButton.vue";

const emits = defineEmits(["createSchedule", "toggleView", "filterBy", "sortBy"]);
const showViewMenu = ref(false);
const showSortMenu = ref(false);
const showFilterMenu = ref(false);
const currentView = ref("grid");

const currentViewIcon = computed(() =>
  currentView.value === "grid" ? "fas fa-th" : "fas fa-list"
);
const currentViewText = computed(() =>
  currentView.value === "grid" ? "Vista cuadrícula" : "Vista lista"
);

function emitCreateSchedule() {
  emits("createSchedule");
}

function emitToggleView(viewType: string) {
  currentView.value = viewType;
  emits("toggleView", viewType);
  showViewMenu.value = false;
}

function emitFilterBy(criteria: string) {
  emits("filterBy", criteria);
  showFilterMenu.value = false;
}

function emitSortBy(criteria: string) {
  emits("sortBy", criteria);
  showSortMenu.value = false;
}

function toggleViewMenu() {
  showViewMenu.value = !showViewMenu.value;
}

function toggleSortMenu() {
  showSortMenu.value = !showSortMenu.value;
}

function toggleFilterMenu() {
  showFilterMenu.value = !showFilterMenu.value;
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
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

.view-button {
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  padding: 0.5rem 1rem;

  border: 1px solid #d9d9d9;
}

.view-button i {
  margin-right: 0.5rem;
}
</style>
