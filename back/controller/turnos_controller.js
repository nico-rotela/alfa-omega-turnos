import {
  getAllTurnos,
  createTurnDb,
  deleteTurnoDb,
  getTurnosByFechaDb,
  getTurnoByFechaHoraDb,
  updateTurnoDb,
  getTurnoDuplicadoEditDb,
} from "../models/turnosModel.js";

// GET turnos
export const getTurnos = async (req, res) => {
  try {
    const turnos = await getAllTurnos();
    res.json(turnos);
  } catch (error) {
    console.error("Error al obtener turnos:", error);
    res.status(500).json({ error: "Error al obtener turnos" });
  }
};

// POST turnos
export const createTurno = async (req, res) => {
  const { fecha, hora, cliente } = req.body;

  // Validación básica
  if (!fecha || !hora || !cliente) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  // valido que no esten vacios
  if (fecha.trim() === "" || hora.trim() === "" || cliente.trim() === "") {
    return res.status(400).json({ error: "Los campos no pueden estar vacíos" });
  }

  try {
    // verifico que no exista un turno en la misma fecha y hora
    const turnoExistente = await getTurnoByFechaHoraDb(fecha, hora);

    if (turnoExistente) {
      return res
        .status(400)
        .json({ error: "Ya existe un turno en esa fecha y hora" });
    }

    // creo el turno en la base de datos
    const nuevoTurno = await createTurnDb(fecha, hora, cliente);
    res.status(201).json({ nuevoTurno, message: "Turno creado exitosamente" });
  } catch (error) {
    console.error("Error al crear el turno:", error);
    res.status(500).json({ error: "Error al crear el turno" });
  }
};

// eliminar turno
export const deleteTurno = async (req, res) => {
  const { id } = req.params;

  try {
    // elimino el turno de la base de datos
    const turnoEliminado = await deleteTurnoDb(id);

    // si no se encontró el turno para eliminar
    if (!turnoEliminado) {
      return res.status(404).json({
        error: "Turno no encontrado",
      });
    }

    res.json({
      message: "Turno eliminado exitosamente",
      turno: turnoEliminado,
    });
  } catch (error) {
    console.error("Error al eliminar el turno:", error);

    return res.status(500).json({
      error: "Error al eliminar el turno",
    });
  }
};

// actualizar turno
export const updateTurno = async (req, res) => {
  const { id } = req.params;
  const { fecha, hora, cliente } = req.body;

  // Validación básica
  if (!fecha || !hora || !cliente) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  try {
    // verificar que no exista otro turno en la misma fecha y hora
    const turnoDuplicado = await getTurnoDuplicadoEditDb(fecha, hora, id);

    if (turnoDuplicado) {
      return res.status(400).json({
        error: "Ya existe un turno en esa fecha y hora",
      });
    }

    // actualizo el turno en la base de datos
    const turnoActualizado = await updateTurnoDb(id, fecha, hora, cliente);

    // si no se encontró el turno para actualizar
    if (!turnoActualizado) {
      return res.status(404).json({
        error: "Turno no encontrado",
      });
    }

    res.json({
      message: "Turno actualizado exitosamente",
      turno: turnoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar el turno:", error);
    return res.status(500).json({
      error: "Error al actualizar el turno",
    });
  }
};
