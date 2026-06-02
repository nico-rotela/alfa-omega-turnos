import { useState } from "react";

const EditarTurno = ({ turno, onCancel, onSave, onDelete }) => {
  const [cliente, setCliente] = useState(turno.cliente);
  const [hora, setHora] = useState(turno.hora);
  const [fecha, setFecha] = useState(turno.fecha);

  const handleGuardar = () => {
    onSave({
      id: turno.id,
      cliente,
      fecha,
      hora,
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Editar turno</h2>

        <input
          className="modal-input"
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <input
          className="modal-input"
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />

        <input
          className="modal-input"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleGuardar}>
            Guardar
          </button>

          <button className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>

          <button className="btn-danger" onClick={() => onDelete(turno.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarTurno;
