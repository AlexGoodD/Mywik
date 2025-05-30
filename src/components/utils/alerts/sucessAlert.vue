<template>
  <div
      v-show="visible"
      class="tw-fixed tw-border tw-border-[#2A292E] tw-bg-[#131513] tw-top-10 tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-z-[9999] tw-flex tw-flex-col tw-items-start tw-justify-center tw-gap-x-8 tw-text-white tw-text-left tw-w-[40rem] tw-h-[5rem] tw-rounded-lg tw-p-5"
      :class="animationClass"
  >
    <div class="tw-flex tw-items-center tw-justify-center tw-gap-x-4">
      <div class="tw-flex tw-bg-[#1E201E] tw-w-10 tw-h-10 tw-items-center tw-justify-center tw-rounded-md">
        <i class="fa fa-circle-check tw-text-2xl tw-text-[#08B783]"></i>
      </div>
      <p class="tw-font-bold tw-text-lg tw-text-[#08B783]">All done!</p>
      <p class="tw-text-lg tw-text-[#686868]">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  message: string;
  visible: boolean;
  isHiding: boolean;
}>();

const animationClass = computed(() => {
  return props.isHiding ? 'tw-animate-fade-out' : 'tw-animate-slide-down';
});
</script>

<style scoped>
@keyframes slideDown {
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.tw-animate-slide-down {
  animation: slideDown 0.5s ease-out;
}

.tw-animate-fade-out {
  animation: fadeOut 0.5s ease-out;
}
</style>