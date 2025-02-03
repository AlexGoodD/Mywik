export interface Schedule {
    id: string;
    user_id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    interval: number;
    days: string[];
    created_at?: string;
}

export interface Event {
    schedule_id: string;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    color: string;
    day_of_week: string[]; // Cambiar a array de strings
    created_at: string;
}

export interface AuthResponse {
    user: any;
    error: any;
}

export interface Event {
    schedule_id: string;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    color: string;
    day_of_week: string[];
    created_at: string;
}