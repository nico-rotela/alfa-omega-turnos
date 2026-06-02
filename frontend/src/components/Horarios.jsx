import "../styles/Horarios.css";

function Horarios({
  horarios,
  estaOcupado,
  getTurnoPorHora,
  onSelect,
  onEdit,
}) {
  const handleHorarioClick = (hora) => {
    const ocupado = estaOcupado(hora);

    if (ocupado) {
      const turno = getTurnoPorHora(hora);
      onEdit(turno);
    } else {
      onSelect(hora);
    }
  };

  return (
    <div className="horarios-container">
      {horarios.map((h) => {
        const ocupado = estaOcupado(h);

        const turno = ocupado ? getTurnoPorHora(h) : null;

        return (
          <button
            key={h}
            type="button"
            className={`horario-card ${ocupado ? "ocupado" : "libre"}`}
            onClick={() => handleHorarioClick(h)}
          >
            <span className="hora">{h}</span>

            {ocupado ? (
              <>
                <span className="cliente">{turno.cliente}</span>

                <span className="estado-reservado">✂ Reservado</span>
              </>
            ) : (
              <span className="estado">Disponible</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
export default Horarios;
