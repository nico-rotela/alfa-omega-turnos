import { API_URL } from "../config/api.js";

export const login = async (email, password) => {
  try {
    // Realiza la solicitud de inicio de sesión al backend
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Si la respuesta no es exitosa, lanza un error con el mensaje del backend
    if (!response.ok) {
      throw new Error(data.message || "Error during login");
    }
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
