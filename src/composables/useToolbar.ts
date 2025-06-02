import { ref } from 'vue'

const activeElement = ref<string | null>(null)

export function useToolbar() {
    function toggleElement(element: string) {
        activeElement.value = activeElement.value === element ? null : element
    }

    function isActive(element: string) {
        return activeElement.value === element
    }

    return {
        activeElement,
        toggleElement,
        isActive,
    }
}