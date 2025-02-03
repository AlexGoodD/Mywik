<template>
  <button class="create-button" @click="handleClick">
    <i :class="iconClass" id="icon-create_button"></i> {{ props.buttonText }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ buttonText: string; iconClass: string }>();
const emits = defineEmits(["click"]);

function handleClick() {
  emits("click");
}
</script>

<style scoped>
.create-button {
  width: auto;
  border-radius: 0.5rem;
  background-color: #000000;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.7rem;
  padding: 0.5rem 1rem;
}

.create-button:hover {
  background-color: #4f4f4f;
}

#icon-create_button {
  margin-right: 0.5rem;
}
</style>
