import { supabase } from '../utils/supabase';
import type { Event } from "../composables/types";

// Función para la creación de eventos
export const createEvent = async (event: Event) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .insert([event]);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

// Función para obtener los eventos
export const getEvents = async (scheduleId: string) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('schedule_id', scheduleId);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};