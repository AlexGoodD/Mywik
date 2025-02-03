import { ref } from "vue";
import { createSchedule } from "../services/schedule";
import { useUser } from "./useUser";

export function useFormSchedule() {
    const name = ref("");
    const description = ref("");
    const start_date = ref();
    const end_date = ref();
    const interval = ref("");
    const daysOfWeek = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];
    const selectedDays = ref([...daysOfWeek]);
    const { userId } = useUser();

    const handleSubmit = async (emits: any) => {
        const schedule = {
            user_id: userId.value,
            name: name.value,
            description: description.value,
            start_date: start_date.value,
            end_date: end_date.value,
            interval: Number(interval.value),
            days: selectedDays.value,
        };

        try {
            await createSchedule(schedule);
            alert("Tabla creada exitosamente");
            emits("close");
        } catch (error) {
            alert("Error al crear la tabla: " + (error as Error).message);
        }
    };

    const toggleDay = (day: string) => {
        if (selectedDays.value.includes(day)) {
            selectedDays.value = selectedDays.value.filter((d) => d !== day);
        } else {
            selectedDays.value.push(day);
        }
    };

    const resetForm = () => {
        name.value = "";
        description.value = "";
        start_date.value = "";
        end_date.value = "";
        interval.value = "";
        selectedDays.value = [
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
            "Domingo",
        ];
    };

    const closeForm = (emits: any) => {
        emits("close");
    };

    const getDayLetter = (day: string) => {
        if (day === "Martes") return "M";
        if (day === "Miércoles") return "MM";
        return day.charAt(0);
    };

    return {
        name,
        description,
        start_date,
        end_date,
        interval,
        daysOfWeek,
        selectedDays,
        handleSubmit,
        toggleDay,
        resetForm,
        closeForm,
        getDayLetter,
    };
}