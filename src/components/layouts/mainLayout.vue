<template>
  <div class="tw-flex tw-p-4 tw-h-screen tw-w-screen">
    <SideBar />
    <div class="tw-flex tw-flex-col tw-flex-1">
      <TopNavbar
          v-if="showTopbar"
          :title="topbarTitle"
          :menuOptions="topbarOptions"
          @selectOption="handleMenuOption"
      />
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/utils/navbar/leftNavbar.vue'
import TopNavbar from '@/components/utils/navbar/topNavbar.vue'
import { useLayout } from '@/composables/useLayout'

const { topbarTitle, topbarOptions, showTopbar } = useLayout()

function handleMenuOption(option: { text: string; action: string }) {
  console.log(`Selected: ${option.text}`)
}
</script>