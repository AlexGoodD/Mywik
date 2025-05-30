<template>
  <div class="dropdown" id="view-dropdown">
    <button class="view-button" @click="toggleViewMenu">
      <i :class="currentViewIcon"></i> {{ currentViewText }}
      <i class="fas fa-caret-down"></i>
    </button>
    <div v-if="showViewMenu" class="dropdown-content">
      <p v-if="currentView !== 'grid'" @click="emitToggleView('grid')">
        <i class="fas fa-grip"></i> Grid View
      </p>
      <p v-if="currentView !== 'list'" @click="emitToggleView('list')">
        <i class="fas fa-table"></i> Table View
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineProps } from 'vue'

const props = defineProps<{
  modelValue: 'grid' | 'list'
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: 'grid' | 'list'): void
}>()

const showViewMenu = ref(false)
const currentView = computed(() => props.modelValue)

const currentViewIcon = computed(() =>
    currentView.value === 'grid' ? 'fas fa-grip' : 'fas fa-table'
)

const currentViewText = computed(() =>
    currentView.value === 'grid' ? 'Grid View' : 'Table View'
)

function toggleViewMenu() {
  showViewMenu.value = !showViewMenu.value
}

function emitToggleView(viewType: 'grid' | 'list') {
  emits('update:modelValue', viewType)
  showViewMenu.value = false
}
</script>

<style scoped>
.view-button {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  background: none;
  cursor: pointer;
  color: black;
  padding: 0.5rem 1rem;
  border: 1px solid #d9d9d9;
  height: 2.5rem;
  width: 10rem;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.view-button i {
  margin-right: 0.5rem;
  font-size: 1rem;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  display: flex;
  left: 0;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 10rem;
  align-items: center;

}

.dropdown-content i {
  margin-right: 1.2rem;
  font-size: 1rem;
}

.dropdown-content p {
  display: flex;
  margin: 0;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  color: black;
  cursor: pointer;
  width: 10rem;
  align-items: center;
}

.dropdown-content p:hover {
  background-color: #f0f0f0;
}
</style>