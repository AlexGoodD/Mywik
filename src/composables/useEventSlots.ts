// src/composables/useEventSlots.ts
import { ref } from "vue";
import { getEvents } from "../services/events";
import type { Event } from "../composables/types";


const events = ref<Event[]>([]);

const fetchEvents = async (scheduleId: string) => {
    events.value = await getEvents(scheduleId);
};

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const getEventStyle = (slot: { start: string; end: string }, day: string) => {
    const slotStartMinutes = timeToMinutes(slot.start);

    const event = events.value.find(
        (e) =>
            timeToMinutes(e.start_time) <= slotStartMinutes &&
            timeToMinutes(e.end_time) > slotStartMinutes &&
            e.day_of_week && // Verificar que e.day_of_week no sea null o undefined
            e.day_of_week.includes(day) // Verificar si el día está en el array
    );
    return event ? { backgroundColor: event.color, color: "white" } : {};
};

const getEventTitle = (slot: { start: string; end: string }, day: string) => {
    const slotStartMinutes = timeToMinutes(slot.start);

    const event = events.value.find(
        (e) =>
            timeToMinutes(e.start_time) <= slotStartMinutes &&
            timeToMinutes(e.end_time) > slotStartMinutes &&
            e.day_of_week && // Verificar que e.day_of_week no sea null o undefined
            e.day_of_week.includes(day) // Verificar si el día está en el array
    );
    return event ? event.title : "";
};

export { fetchEvents, getEventStyle, getEventTitle };