<template>
  <div class="tw-relative tw-border tw-border-[#6D6D6D] tw-rounded-lg tw-flex tw-items-center">
    <i class="fas fa-lock tw-text-white tw-absolute tw-left-4"></i>
    <input
        :type="showPassword ? 'text' : 'password'"
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
        @blur="onBlur"
        class="tw-p-2 tw-pl-10 tw-pr-10 tw-bg-transparent tw-text-white tw-w-full tw-placeholder-[#6D6D6D] tw-rounded-lg tw-outline-none"
    />
    <button type="button" class="tw-absolute -tw-right-1 tw-bg-transparent tw-border-none tw-cursor-pointer" @click="showPassword = !showPassword">
      <i :class="showPassword ? 'fas fa-eye-slash tw-text-white' : 'fas fa-eye tw-text-white'"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showPassword = ref(false);

defineProps<{
  modelValue: string;
  id: string;
  placeholder: string;
  onBlur?: () => void;
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped>
input:-webkit-autofill {
  box-shadow: 0 0 0 1000px transparent inset !important;
  -webkit-text-fill-color: white !important;
  transition: background-color 9999s ease-in-out 0s;
}
</style>
