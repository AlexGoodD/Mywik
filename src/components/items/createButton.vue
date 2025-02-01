<template>
  <button class="create-button">
    <i class="fas fa-plus"></i>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
.create-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #42b883;
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
}

.create-button:hover {
  background-color: #38a169;
}
</style>
