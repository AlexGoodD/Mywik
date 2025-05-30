<template>
  <v-overlay
      :model-value="overlay"
      class="tw-flex tw-items-center tw-justify-center"
      contained
      persistent
  >
    <v-progress-circular
        color="#08B783"
        size="64"
        indeterminate
    />
  </v-overlay>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

const overlay = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  overlay.value = newValue;
});
</script>