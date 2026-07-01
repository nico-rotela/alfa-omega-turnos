import { useEffect, useState } from "react";
import {
  fetchTurnos,
  deleteTurno,
  createTurno,
  updateTurno,
} from "./services/turnosService";
import Horarios from "./components/Horarios.jsx";
import EditarTurno from "./components/EditarTurno.jsx";
import CrearTurnoModal from "./components/CrearTurnoModal.jsx";
import Header from "./components/Header.jsx";
import "./styles/App.css";
import { API_URL } from "./config/api.js";

function App() {
  // ======================================
  // ESTADOS
  // ======================================

  const [turnos, setTurnos] = useState([]);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [horarios, setHorarios] = useState([]);

  // estado para el turno que se está editando
  const [turnoEditando, setTurnoEditando] = useState(null);

  // estado para creación de turnos
  const [horaCreando, setHoraCreando] = useState(null);

  // ======================================
  // NAVEGACIÓN DE FECHAS
  // ======================================

  // retrocede un día
  const handlePrevDay = () => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() - 1);

    setFecha(nuevaFecha.toISOString().split("T")[0]);
  };

  // avanza un día
  const handleNextDay = () => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1);

    setFecha(nuevaFecha.toISOString().split("T")[0]);
  };

  // ======================================
  // CARGA INICIAL
  // ======================================

  // cargo turnos y horarios al iniciar la app
  useEffect(() => {
    const loadData = async () => {
      const turnosData = await fetchTurnos();

      const res = await fetch(`${API_URL}/api/horarios`);
      const horariosData = await res.json();

      setTurnos(turnosData);
      setHorarios(horariosData);
    };

    loadData();
  }, []);

  // ======================================
  // CREAR TURNO
  // ======================================

  // crear turno
  const handleCreate = async (turno) => {
    const newTurno = await createTurno(turno);

    setTurnos((prev) => [...prev, newTurno]);

    setHoraCreando(null);
  };

  // abrir modal de creación con hora preseleccionada
  const handleOpenCreateModal = (hora) => {
    console.log("Crear turno en:", hora);
    setHoraCreando(hora);
  };

  // ======================================
  // EDITAR TURNO
  // ======================================

  // editar turno
  const handleEdit = (turno) => {
    setTurnoEditando(turno);
    console.log("Editando turno:", turno);
  };

  // guardar cambios del turno editado
  const handleSave = async (turnoActualizado) => {
    try {
      const turnoEditado = await updateTurno(turnoActualizado);

      setTurnos((prev) =>
        prev.map((turno) =>
          turno.id === turnoEditado.id ? turnoEditado : turno,
        ),
      );

      setTurnoEditando(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // ======================================
  // ELIMINAR TURNO
  // ======================================

  // eliminar turno
  const handleDelete = async (id) => {
    await deleteTurno(id);
    setTurnos(turnos.filter((t) => t.id !== id));
  };

  // ======================================
  // UTILIDADES
  // ======================================

  // filtrar turnos del dia seleccionado
  const turnosDelDdia = turnos.filter((t) => {
    if (!t.fecha) return false;

    const fechaTurno = t.fecha.split("T")[0];
    return fechaTurno === fecha;
  });

  // verificar si un horario está ocupado
  const estaOcupado = (hora) => {
    return turnosDelDdia.some((t) => t.hora === hora);
  };

  // obtener el turno de una hora específica
  const getTurnoPorHora = (hora) => {
    return turnosDelDdia.find((t) => t.hora === hora);
  };

  // ======================================
  // RENDER
  // ======================================

  return (
    <div className="app-container">
      {/* <FormularioTurno
        fecha={fecha}
        setFecha={setFecha}
        onSubmit={handleSubmit}
      /> */}

      {/* header */}
      <Header
        fecha={fecha}
        onPrevDay={handlePrevDay}
        onNextDay={handleNextDay}
      />

      {/* agenda principal */}
      <Horarios
        horarios={horarios}
        estaOcupado={estaOcupado}
        onSelect={handleOpenCreateModal}
        onEdit={handleEdit}
        getTurnoPorHora={getTurnoPorHora}
      />

      {/* <ListaTurnos
        turnos={turnosDelDdia}
        onDelete={handleDelete}
        onEdit={handleEdit}
      /> */}

      {/* modal de edición */}
      {turnoEditando && (
        <EditarTurno
          turno={turnoEditando}
          onCancel={() => setTurnoEditando(null)}
          onSave={handleSave}
          onDelete={async (id) => {
            await handleDelete(id);
            setTurnoEditando(null);
          }}
        />
      )}

      {/* modal de creación */}
      {horaCreando && (
        <CrearTurnoModal
          hora={horaCreando}
          fecha={fecha}
          onCancel={() => setHoraCreando(null)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}

export default App;
