import { supabase } from '../utils/supabase';
import type { AuthResponse } from "../composables/types";

// Registro de usuario
export const signUp = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
            throw new Error(signUpError.message);
        }

        const userId = signUpData.user?.id;

        const { error: insertError } = await supabase
            .from('users')
            .insert([{ id: userId, name, email }]);

        if (insertError) {
            throw new Error(insertError.message);
        }

        return { user: signUpData.user, error: null };
    } catch (error) {
        return { user: null, error };
    }
};

// Inicio de sesión
export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const { data: user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            throw new Error(error.message);
        }
        return { user, error: null };
    } catch (error) {
        return { user: null, error };
    }
};

// Cerrar sesión
export const signOut = async (): Promise<void> => {
    try {
        await supabase.auth.signOut();
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};

// Función para manejar el inicio de sesión
export const handleLogin = async (email: string, password: string, emitCallback: (event: string, message?: string) => void) => {
    try {
        const { error } = await signIn(email, password);
        if (error) {
            throw new Error(error.message);
        }
        emitCallback("success");
    } catch (error) {
        const message = (error as Error).message;
        emitCallback("error", message);
    }
};

// Función para manejar el registro
export const handleSignUp = async (name: string, email: string, password: string, confirmPassword: string, emitCallback: (event: string, message?: string) => void) => {

    if (password !== confirmPassword) {
        emitCallback("error", "The passwords do not match.");
        return;
    }

    try {
        const { error } = await signUp(name, email, password);
        if (error) {
            throw new Error(error.message);
        }
        emitCallback("success");
    } catch (error) {
        const message = (error as Error).message;
        emitCallback("error", message);
    }
};