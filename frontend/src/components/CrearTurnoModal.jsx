import { useState } from "react";
import "../styles/Modal.css";

const CrearTurnoModal = ({ hora, fecha, onCancel, onCreate }) => {
  const [cliente, setCliente] = useState("");

  const handleGuardar = () => {
    onCreate({
      cliente,
      fecha,
      hora,
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Crear turno</h2>

        <p className="modal-info">
          Hora: <strong>{hora}</strong>
        </p>

        <input
          className="modal-input"
          type="text"
          placeholder="Nombre del cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleGuardar}>
            Guardar
          </button>

          <button className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearTurnoModal;
