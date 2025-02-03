<template>
  <div class="navbar">
    <div class="title">{{ title }}</div>
    <div class="menu">
      <i class="fas fa-ellipsis-v" @click="toggleMenu"></i>
      <div v-if="showMenu" class="dropdown">
        <p v-for="option in menuOptions" :key="option.text" @click="selectOption(option)">
          {{ option.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  title: string;
  menuOptions: { text: string; action: string }[];
}>();
const emits = defineEmits(["selectOption"]);

const showMenu = ref(false);

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function selectOption(option: { text: string; action: string }) {
  emits("selectOption", option);
  showMenu.value = false;
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  background-color: white;
  border-bottom: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  border-radius: 0 1rem 0 0;
}

.title {
  font-size: 1.3rem;
  font-weight: 600;
  color: black;
}

.menu {
  position: relative;
  color: black;
}

.menu i {
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 150px;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown p {
  margin: 0;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.dropdown p:hover {
  background-color: #f0f0f0;
}
</style>
