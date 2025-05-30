import { ref } from 'vue';

const message = ref('');
const visible = ref(false);
const isHiding = ref(false);
const type = ref<'success' | 'error'>('success');

let timeout: ReturnType<typeof setTimeout> | null = null;

function show(newMessage: string, alertType: 'success' | 'error' = 'success') {
    if (timeout) clearTimeout(timeout);

    message.value = newMessage;
    type.value = alertType;
    visible.value = true;
    isHiding.value = false;

    timeout = setTimeout(() => {
        isHiding.value = true;
        setTimeout(() => {
            visible.value = false;
        }, 500);
    }, 3000);
}

export function useAlert() {
    return {
        message,
        visible,
        isHiding,
        type,
        show
    };
}