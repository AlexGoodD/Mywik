<template>
  <div class="dropdown">
    <outButton
        :buttonText="buttonText"
        :iconClass="iconClass"
        @click="toggleDropdown"
    />
    <div v-if="showDropdown" class="dropdown-content">
      <p v-for="(option, index) in options" :key="index" @click="handleOption(option.value)">
        {{ option.label }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import outButton from './outlinedButton.vue'

const props = defineProps<{
  buttonText: string
  iconClass: string
  options: { label: string; value: string }[]
}>()

const emits = defineEmits<{
  (e: 'select', value: string): void
}>()

const showDropdown = ref(false)

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function handleOption(value: string) {
  emits('select', value)
  showDropdown.value = false
}
</script>

<style scoped>
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