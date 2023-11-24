/**
 * Importa la función 'writable' del paquete 'svelte/store'.
 */
import { writable } from 'svelte/store';

/**
 * Función para crear y gestionar un almacén de estado relacionado con la autenticación.
 * @function createAuthStore
 * @returns {object} - Un objeto con métodos y propiedades para gestionar el estado de autenticación.
 */
const createAuthStore = () => {
  const { subscribe, set } = writable({ token: null });

  return {
    subscribe,
    // Método para establecer el token de autenticación y almacenarlo en la sesión del navegador.
    setToken: (token) => {
        sessionStorage.setItem('jwtToken', token);
        set({ token });
    },
    // Método para limpiar el token de autenticación almacenado en la sesión del navegador cuando se cierra sesión.
    clearToken: () => {
        sessionStorage.removeItem('jwtToken');
        set({ token: null });
    },
  };
};

// Exporta el almacén de autenticación creado mediante la función 'createAuthStore'.
export const auth = createAuthStore();
