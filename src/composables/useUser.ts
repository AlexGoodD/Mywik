import { ref, onMounted } from "vue";
import { supabase } from "../utils/supabase";

export function useUser() {
    const userId = ref("");
    const userName = ref("");
    const userEmail = ref("");

    onMounted(async () => {
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
            console.error("Error fetching authenticated user:", userError);
            return;
        }

        if (user) {
            userId.value = user.id;
            const { data, error } = await supabase
                .from("users")
                .select("name, email")
                .eq("id", user.id)
                .single();

            if (error) {
                console.error("Error fetching user data:", error);
                return;
            }

            userName.value = data.name ?? "";
            userEmail.value = data.email ?? "";
        } else {
            console.error("No authenticated user found.");
        }
    });

    return {
        userId,
        userName,
        userEmail,
    };
}