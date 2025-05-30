import { ref } from 'vue';

const visible = ref(false);

function show() {
    visible.value = true;
}

function hide() {
    visible.value = false;
}

export function useLoaderOverlay() {
    return {
        visible,
        show,
        hide
    };
}