import { ref, computed } from 'vue';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

export function useFormField<T>(
    initialValue: T,
    validate: ((value: T) => boolean) | 'email' | 'password'
) {
    const value = ref(initialValue);
    const touched = ref(false);

    const validationFn = computed(() => {
        if (validate === 'email') {
            return (val: T) => emailRegex.test(val as unknown as string);
        } else if (validate === 'password') {
            return (val: T) => passwordRegex.test(val as unknown as string);
        } else if (typeof validate === 'function') {
            return validate;
        }
        throw new Error('Invalid validation type');
    });

    const error = computed(() => touched.value && !validationFn.value(value.value));

    function onBlur() {
        touched.value = true;
    }

    return {
        value,
        touched,
        error,
        onBlur,
    };
}