import { ref, onMounted } from "vue";
import { getSchedules } from "../services/schedule";
import { useUser } from "./useUser";

export function useSchedules() {
    const { userId } = useUser();
    const userSchedules = ref<any[]>([]);

    onMounted(async () => {
        const schedules = await getSchedules();
        userSchedules.value = schedules.filter(schedule => schedule.user_id === userId.value);
    });

    return {
        userSchedules,
    };
}