import { pool } from "../db/connection.js";

// Función para obtener todos los turnos desde la base de datos
export const getAllTurnos = async () => {
  const res = await pool.query("SELECT * FROM turnos");
  return res.rows;
};

// funcion para crear un nuevo turno en la base de datos
export const createTurnDb = async (fecha, hora, cliente) => {
  const res = await pool.query(
    "INSERT INTO turnos (fecha, hora, cliente) VALUES ($1, $2, $3) RETURNING *",
    [fecha, hora, cliente],
  );
  return res.rows[0];
};

// funcion para eliminar un turno de la base de datos
export const deleteTurnoDb = async (id) => {
  const res = await pool.query("DELETE FROM turnos WHERE id = $1 RETURNING *", [
    id,
  ]);
  return res.rows[0];
};

// funcion para filtrar turnos por fecha
export const getTurnosByFechaDb = async (fecha) => {
  const res = await pool.query("SELECT * FROM turnos WHERE fecha = $1", [
    fecha,
  ]);
  return res.rows;
};

// verificar si existe un turno en una fecha y hora
export const getTurnoByFechaHoraDb = async (fecha, hora) => {
  const res = await pool.query(
    "SELECT * FROM turnos WHERE fecha = $1 AND hora = $2",
    [fecha, hora],
  );

  return res.rows[0];
};

// funcion para actualizar un turno en la base de datos
export const updateTurnoDb = async (id, fecha, hora, cliente) => {
  const res = await pool.query(
    "UPDATE turnos SET fecha = $1, hora = $2, cliente = $3 WHERE id = $4 RETURNING *",
    [fecha, hora, cliente, id],
  );
  return res.rows[0];
};

// verificar si existe otro turno con la misma fecha y hora
export const getTurnoDuplicadoEditDb = async (fecha, hora, id) => {
  const res = await pool.query(
    `
    SELECT *
    FROM turnos
    WHERE fecha = $1
    AND hora = $2
    AND id <> $3
    `,
    [fecha, hora, id],
  );

  return res.rows[0];
};
