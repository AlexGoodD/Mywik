<template>
  <div class="navbar">
    <div class="button-container">
      <div class="left-buttons">
        <DropdownButton
            id="view"
            v-model="currentView"
            :options="[
    { value: 'grid', label: 'Grid View', icon: 'fas fa-grip' },
    { value: 'list', label: 'Table View', icon: 'fas fa-table' }
  ]"
        />
        <SelectOptsButton
            id="filter"
            buttonText="Filtrar"
            iconClass="fas fa-filter"
            :options="filterOptions"
            @select="emitFilterBy"
        />

        <SelectOptsButton
            id="sort"
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
import {ref, watch} from "vue";
import fillButton from "@/components/utils/buttons/fillButton.vue";
import DropdownButton from "@/components/utils/buttons/dropdownButton.vue";
import SelectOptsButton from "@/components/utils/buttons/selectOptsButton.vue";

const emits = defineEmits(["createSchedule", "toggleView", "filterBy", "sortBy"]);
const showSortMenu = ref(false);
const showFilterMenu = ref(false);
const currentView = ref<'grid' | 'list'>('grid')


function emitCreateSchedule() {
  emits("createSchedule");
}

watch(currentView, (newView) => {
  emits('toggleView', newView);
});

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

</style>
