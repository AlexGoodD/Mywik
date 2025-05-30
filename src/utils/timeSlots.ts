export function generateTimeSlots(startDate: string, endDate: string, interval: number): { start: string; end: string }[] {
    const slots: { start: string; end: string }[] = [];

    // Asegurar que solo tomamos HH:mm en caso de que vengan segundos
    const startTime = startDate.substring(0, 5);
    const endTime = endDate.substring(0, 5);

    let start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);

    while (start < end) {
        const slotStart = start.toISOString().substring(11, 16);
        const nextSlot = new Date(start.getTime() + interval * 60000);
        const slotEnd = nextSlot.toISOString().substring(11, 16);

        slots.push({ start: slotStart, end: slotEnd });
        start = nextSlot;
    }

    return slots;
}