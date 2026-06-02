import "dotenv/config";
import express from "express";
import cors from "cors";
import TurnosRoutes from "../back/routes/turnos_router.js";
import HorariosRoutes from "../back/routes/horarios_router.js";
import "./db/connection.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", TurnosRoutes);
app.use("/api", HorariosRoutes);

app.get("/", (req, res) => {
  res.send("API Peluquería funcionando");
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
