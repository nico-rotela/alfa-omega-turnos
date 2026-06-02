import { Router } from "express";
import {
  getTurnos,
  createTurno,
  deleteTurno,
  updateTurno,
} from "../controller/turnos_controller.js";

const router = Router();

// get todos los turnos
router.get("/turnos", getTurnos);

// crear un nuevo turno
router.post("/turnos", createTurno);

// eliminar un turno por id
router.delete("/turnoDelete/:id", deleteTurno);

// actualizar un turno por id
router.put("/turnos/:id", updateTurno);

export default router;
