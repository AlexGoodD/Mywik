import { supabase } from '../utils/supabase';
import type { Schedule } from "../composables/types";

// Función para la creación de tablas/horarios
export const createSchedule = async (schedule: Schedule) => {
    try {
        const { data, error } = await supabase
            .from('schedules')
            .insert([schedule]);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('Error creating schedule:', error);
        throw error;
    }
};

// Función para la visualización de tablas/horarios
export const getSchedules = async () => {
    try {
        const { data, error } = await supabase
            .from('schedules')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('Error fetching schedules:', error);
        throw error;
    }
};

// Función para actualizar un horario existente
export const updateSchedule = async (id: string, schedule: Partial<Schedule>) => {
    try {
        const { data, error } = await supabase
            .from('schedules')
            .update(schedule)
            .eq('id', id);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('Error updating schedule:', error);
        throw error;
    }
};