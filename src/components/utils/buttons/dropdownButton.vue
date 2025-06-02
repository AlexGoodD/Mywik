<template>
  <div class="dropdown" id="view-dropdown" ref="dropdownRef">
    <button class="view-button" @click="toggleViewMenu">
      <div class="button-content">
        <i :class="currentOption?.icon"></i>
        <span>{{ currentOption?.label }}</span>
      </div>
      <div class="divider"></div>
      <div class="arrow">
        <i class="fas fa-caret-down"></i>
      </div>
    </button>
    <transition name="dropdown-expand">
      <div v-if="showViewMenu" class="dropdown-content">
        <transition-group name="dropdown-item" tag="div">
      <span
          v-for="option in filteredOptions"
          :key="option.value"
          @click="selectOption(option.value)"
      >
        <i :class="option.icon"></i> {{ option.label }}
      </span>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {computed, defineEmits, defineProps, ref} from 'vue'
import { useToolbar } from '@/composables/useToolbar'
import { onClickOutside } from '@vueuse/core'

type Option = {
  value: string
  label: string
  icon: string
}

const props = defineProps<{
  modelValue: string
  options: Option[]
  id: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { toggleElement, isActive } = useToolbar()

const dropdownRef = ref(null)

const showViewMenu = computed(() => isActive(props.id))

const currentOption = computed(() =>
    props.options.find((opt) => opt.value === props.modelValue)
)

const filteredOptions = computed(() =>
    props.options.filter((opt) => opt.value !== props.modelValue)
)

function toggleViewMenu() {
  toggleElement(props.id)
}

function selectOption(value: string) {
  emits('update:modelValue', value)
  toggleElement(props.id)
}

onClickOutside(dropdownRef, () => {
  if (isActive(props.id)) toggleElement(props.id)
})
</script>

<style scoped>
.view-button {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  background: white;
  cursor: pointer;
  color: black;
  padding: 0;
  border: 1px solid #d9d9d9;
  height: 2.5rem;
  width: 10rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  justify-content: space-between;
  transition: background-color 0.5s ease;
}

.view-button:hover {
  background-color: #f0f0f0;
}

.button-content {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  gap: 0.5rem;
  flex: 1;
}

.divider {
  width: 1px;
  height: 60%;
  background-color: #d9d9d9;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
}

.arrow i {
  font-size: 0.8rem;
}

/* Rest of the styles remain unchanged */
.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  top: 110%;
  left: 0;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 10rem;
}

.dropdown-content:hover {
  background-color: #f0f0f0;
  transition: background-color 0.5s ease;
}

.dropdown-content i {
  font-size: 0.8rem;
  margin-right: 0.5rem;

}

.dropdown-content span {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  color: black;
  cursor: pointer;
  width: 100%;
  font-weight: 500;
}

.dropdown-expand-enter-active,
.dropdown-expand-leave-active {
  transition: all 0.2s ease-out;
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

/* ANIMACIÓN DE LOS ÍTEMS */
.dropdown-item-enter-active {
  transition: all 0.25s ease-out;
}
.dropdown-item-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.dropdown-item-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>