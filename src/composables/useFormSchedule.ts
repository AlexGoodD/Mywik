import { ref, watch } from "vue";
import { createSchedule, updateSchedule } from "../services/schedule";
import { useUser } from "./useUser";
import type { Schedule } from "./types";
import { v4 as uuidv4 } from 'uuid';

export function useFormScheduleHandler(props: any, emits: any) {
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

    watch(
        () => props.initialData,
        (newData) => {
            if (newData) {
                name.value = newData.name;
                description.value = newData.description;
                start_date.value = newData.start_date;
                end_date.value = newData.end_date;
                interval.value = newData.interval;
                selectedDays.value = newData.days;
            }
        },
        { immediate: true }
    );

    const handleFormSubmit = async () => {
        if (props.initialData) {
            // Actualizar horario existente
            await updateSchedule(props.initialData.id, {
                name: name.value,
                description: description.value,
                start_date: start_date.value,
                end_date: end_date.value,
                interval: Number(interval.value),
                days: selectedDays.value,
            });
        } else {
            // Crear nuevo horario
            const schedule: Schedule = {
                id: uuidv4(),
                user_id: userId.value,
                name: name.value,
                description: description.value,
                start_date: start_date.value!,
                end_date: end_date.value!,
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
        }
        emits("scheduleCreated", {
            id: props.initialData?.id,
            name: name.value,
            description: description.value,
            start_date: start_date.value,
            end_date: end_date.value,
            interval: interval.value,
            days: selectedDays.value,
        });
        resetForm();
        closeForm(emits);
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
        handleFormSubmit,
        toggleDay,
        resetForm,
        closeForm,
        getDayLetter,
    };
}