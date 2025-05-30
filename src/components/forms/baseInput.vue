<template>
  <div class="tw-relative tw-border tw-border-[#6D6D6D] tw-rounded-lg tw-flex tw-items-center">
    <i :class="`tw-text-white tw-absolute tw-left-4 ${icon}`"></i>
    <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
        @blur="onBlur"
        class="tw-p-2 tw-pl-10 tw-pr-10 tw-bg-transparent tw-text-white tw-w-full tw-placeholder-[#6D6D6D] tw-rounded-lg tw-outline-none"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  icon: string;
  type?: string;
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
