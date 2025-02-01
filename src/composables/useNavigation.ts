import { useRouter } from "vue-router";

export function useNavigation() {
    const router = useRouter();

    function navigateToSchedule(scheduleId: string) {
        router.push({ name: "SchedulePage", params: { scheduleId } });
    }

    return {
        navigateToSchedule,
    };
}