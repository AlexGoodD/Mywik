<template>
  <button class="create-button" @click="handleClick">
    <i :class="iconClass" id="icon-create_button"></i> {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ buttonText: string; iconClass: string }>();
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
  transition: background-color 0.5s ease;
  font-size: 0.7rem;
  padding: 0.5rem 1rem;
  height: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.create-button:hover {
  background-color: #535353;
}

#icon-create_button {
  margin-right: 0.5rem;
}
</style>
