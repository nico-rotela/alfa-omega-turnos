import { getHorarios } from "../controller/horarios_controller.js";
import { Router } from "express";

const router = Router();

// get horarios
router.get("/horarios", getHorarios);

export default router;
