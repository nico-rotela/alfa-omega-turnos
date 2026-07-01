import "dotenv/config";
import express from "express";
import cors from "cors";
import TurnosRoutes from "../back/routes/turnos_router.js";
import HorariosRoutes from "../back/routes/horarios_router.js";
import AuthRoutes from "../back/routes/authRoutes.js";
import "./db/connection.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", TurnosRoutes);
app.use("/api", HorariosRoutes);
app.use("/api/auth", AuthRoutes);

app.get("/", (req, res) => {
  res.send("API Peluquería funcionando");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ${PORT}`);
});
