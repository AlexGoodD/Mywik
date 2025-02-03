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
  border: 1px solid #d9d9d9;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: white;
  font-size: 0.7rem;
  padding: 0.5rem 1rem;
}

/*.create-button:hover {
}*/

#icon-create_button {
  margin-right: 0.5rem;
}
</style>
