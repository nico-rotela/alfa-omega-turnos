// fetch turnos
export const fetchTurnos = async () => {
  const response = await fetch("http://localhost:3000/api/turnos");
  return response.json();
};

// delete turno
export const deleteTurno = async (id) => {
  const response = await fetch(`http://localhost:3000/api/turnoDelete/${id}`, {
    method: "DELETE",
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
  const response = await fetch("http://localhost:3000/api/turnos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(turno),
  });

  const data = await response.json();

  return data.nuevoTurno;
};

// update turno
export const updateTurno = async (turno) => {
  const response = await fetch(`http://localhost:3000/api/turnos/${turno.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(turno),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al actualizar el turno");
  }

  return data.turno;
};
