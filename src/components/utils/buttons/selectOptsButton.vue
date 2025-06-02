<template>
  <div class="dropdown" v-if="isDropdown" ref="dropdownRef">
    <button class="flexible-button" @click="toggleDropdown">
      <i :class="iconClass" class="icon"></i> {{ buttonText }}
    </button>
    <transition name="dropdown-expand">
      <div v-if="showDropdown" class="dropdown-content">
        <transition-group name="dropdown-item" tag="div">
          <p
              v-for="(option, index) in options"
              :key="option.value"
              @click="handleOption(option.value)"
              :style="{ transitionDelay: `${index * 50}ms` }"
          >
            {{ option.label }}
          </p>
        </transition-group>
      </div>
    </transition>
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
import {computed, ref} from 'vue'
import { useToolbar } from '@/composables/useToolbar'
import { onClickOutside } from '@vueuse/core'

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
const dropdownRef = ref(null)

function toggleDropdown() {
  toggleElement(props.id)
}

function handleOption(value: string) {
  emits('select', value)
  toggleElement(props.id)
}

onClickOutside(dropdownRef, () => {
  if (isActive(props.id)) toggleElement(props.id)
})
</script>

<style scoped>
.flexible-button {
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #d9d9d9;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: white;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  gap: 1rem;
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
  font-size: 0.8rem;
  color: black;
  cursor: pointer;
  text-align: left;
}

.dropdown-content p:hover {
  background-color: #f0f0f0;
}

/* Dropdown container animation */
.dropdown-expand-enter-active,
.dropdown-expand-leave-active {
  transition: all 0.2s ease-out;
  transform-origin: top;
}
.dropdown-expand-enter-from,
.dropdown-expand-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}
.dropdown-expand-enter-to,
.dropdown-expand-leave-from {
  opacity: 1;
  transform: scaleY(1);
}

/* Each item fade-in animation */
.dropdown-item-enter-active {
  transition: all 0.3s ease;
}
.dropdown-item-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.dropdown-item-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>