import { Router } from "express";
import {
  getTurnos,
  createTurno,
  deleteTurno,
  updateTurno,
} from "../controller/turnos_controller.js";
import { verificarToken } from "../middleware/verificarToken.js";

const router = Router();

// get todos los turnos
router.get("/turnos", verificarToken, getTurnos);

// crear un nuevo turno
router.post("/turnos", verificarToken, createTurno);

// eliminar un turno por id
router.delete("/turnoDelete/:id", verificarToken, deleteTurno);

// actualizar un turno por id
router.put("/turnos/:id", verificarToken, updateTurno);

export default router;
