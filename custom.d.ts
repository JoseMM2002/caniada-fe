
declare global {
    interface Window {
      axios: typeof import('axios'); // Importa el tipo de axios
    }
  }