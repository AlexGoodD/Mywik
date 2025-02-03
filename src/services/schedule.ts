import { supabase } from '../utils/supabase';

interface Schedule {
    user_id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    interval: number;
    days: string[];
    created_at?: string;
}

// Funcion para la creación de tablas/horarios
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