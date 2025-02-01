<template>
  <div>
    <h1>Bienvenido, {{ userName }}</h1>
    <gridSchedule />
    <ButtonCreate @click="showForm = true" />
    <FormSchedule v-if="showForm" @close="showForm = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUser } from "../composables/useUser";
import gridSchedule from "../components/Schedule/gridSchedule.vue";
import ButtonCreate from "../components/items/createButton.vue";
import FormSchedule from "../components/Schedule/formSchedule.vue";

const { userName } = useUser();
const showForm = ref(false);
</script>

<style scoped></style>
