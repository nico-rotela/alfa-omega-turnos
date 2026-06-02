import { horarios } from "../data/horarios_mock.js";

// get horarios
export const getHorarios = (req, res) => {
  res.json(horarios);
};
