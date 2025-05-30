import { useRouter } from "vue-router";

export function useNavigation() {
    const router = useRouter();

    function navigateToSchedule(scheduleId: string) {
        const url = router.resolve({ name: "SchedulePage", params: { scheduleId } }).href;
        window.open(url, '_blank');
    }

    return {
        navigateToSchedule,
    };
}