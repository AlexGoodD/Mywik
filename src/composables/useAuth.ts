// src/composables/useAuth.ts
import { ref, onMounted } from "vue";
import { supabase } from "../utils/supabase";

export const isLoggedIn = ref(false);

export async function checkAuthStatus() {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    isLoggedIn.value = !!user;
}

onMounted(checkAuthStatus);