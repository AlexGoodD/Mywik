import { ref } from 'vue'

export const topbarTitle = ref('')
export const topbarOptions = ref<{ text: string; action: string }[]>([])
export const showTopbar = ref(true)

export function useLayout() {
    return {
        topbarTitle,
        topbarOptions,
        showTopbar
    }
}