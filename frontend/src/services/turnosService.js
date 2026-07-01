import { API_URL } from "../config/api.js";

// fetch turnos
export const fetchTurnos = async () => {
  // Obtiene el token del localStorage para incluirlo en la solicitud
  const token = localStorage.getItem("token");

  // Si no hay token, lanza un error indicando que el usuario debe iniciar sesión
  if (!token) {
    throw new Error("No token found. Please log in.");
  }
  const response = await fetch(`${API_URL}/api/turnos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// delete turno
export const deleteTurno = async (id) => {
  // Obtiene el token del localStorage para incluirlo en la solicitud
  const token = localStorage.getItem("token");

  // Si no hay token, lanza un error indicando que el usuario debe iniciar sesión
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${API_URL}/api/turnoDelete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  // si la respuesta no es ok, lanzo un error con el mensaje del backend o un mensaje genérico
  if (!response.ok) {
    throw new Error(data.error || "Error al eliminar el turno");
  }
  return data;
};

// create turno
export const createTurno = async (turno) => {
  // Obtiene el token del localStorage para incluirlo en la solicitud
  const token = localStorage.getItem("token");

  // Si no hay token, lanza un error indicando que el usuario debe iniciar sesión
  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${API_URL}/api/turnos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(turno),
  });

  const data = await response.json();

  // si la respuesta no es ok, lanzo un error con el mensaje del backend o un mensaje genérico
  if (!response.ok) {
    throw new Error(data.error || "Error al crear el turno");
  }
  return data.nuevoTurno;
};

// update turno
export const updateTurno = async (turno) => {
  // Obtiene el token del localStorage para incluirlo en la solicitud
  const token = localStorage.getItem("token");

  // Si no hay token, lanza un error indicando que el usuario debe iniciar sesión
  if (!token) {
    throw new Error("No token found. Please log in.");
  }
  const response = await fetch(`${API_URL}/api/turnos/${turno.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(turno),
  });

  const data = await response.json();

  // si la respuesta no es ok, lanzo un error con el mensaje del backend o un mensaje genérico
  if (!response.ok) {
    throw new Error(data.error || "Error al actualizar el turno");
  }

  return data.turno;
};
