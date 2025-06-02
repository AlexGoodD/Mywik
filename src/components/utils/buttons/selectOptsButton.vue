<template>
  <div class="dropdown" v-if="isDropdown">
    <button class="flexible-button" @click="toggleDropdown">
      <i :class="iconClass" class="icon"></i> {{ buttonText }}
    </button>
    <div v-if="showDropdown" class="dropdown-content">
      <p v-for="(option, index) in options" :key="index" @click="handleOption(option.value)">
        {{ option.label }}
      </p>
    </div>
  </div>

  <button
      v-else
      class="flexible-button"
      @click="$emit('click')"
  >
    <i :class="iconClass" class="icon"></i> {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToolbar } from '@/composables/useToolbar'

const props = defineProps<{
  buttonText: string
  iconClass: string
  options?: { label: string; value: string }[]
  id: string
}>()

const emits = defineEmits<{
  (e: 'click'): void
  (e: 'select', value: string): void
}>()

const { toggleElement, isActive } = useToolbar()

const showDropdown = computed(() => isActive(props.id))
const isDropdown = computed(() => props.options && props.options.length > 0)

function toggleDropdown() {
  toggleElement(props.id)
}

function handleOption(value: string) {
  emits('select', value)
  toggleElement(props.id)
}
</script>

<style scoped>
.flexible-button {
  width: 6rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: white;
  font-size: 0.7rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: background-color 0.5s ease;
}

.flexible-button:hover {
  background-color: #ededed;
}

.dropdown {
  position: relative;
  display: inline-block;

}

.dropdown-content {
  position: absolute;
  top: 110%;
  left: 0;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 100%;
  max-width: 100%;
  z-index: 1000000;

}

.dropdown-content p {
  margin: 0;
  padding: 0.5rem 0.75rem;
  font-size: 0.7rem;
  color: black;
  cursor: pointer;
  text-align: left;
}

.dropdown-content p:hover {
  background-color: #f0f0f0;
}
</style>