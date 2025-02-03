<template>
  <div class="overlay">
    <div class="alert-box">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="buttons">
        <button @click="handleCancel">{{ cancelText }}</button>
        <button @click="handleConfirm">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
}>();

function handleCancel() {
  props.onCancel();
}

function handleConfirm() {
  props.onConfirm();
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-child {
  background: #ccc;
}

button:last-child {
  background: #42b883;
  color: white;
}
</style>
