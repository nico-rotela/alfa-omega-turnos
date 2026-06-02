const ListaTurnos = ({ turnos, onDelete, onEdit }) => {
  return (
    <div>
      <h1>Lista de Turnos</h1>
      <ul>
        {turnos.map((turno) => (
          <li key={turno.id}>
            {/* info del turno */}
            {turno.cliente}, {turno.hora}, {turno.fecha}
            {/* eliminar turno */}
            <button onClick={() => onDelete(turno.id)}>Eliminar</button>
            {/* editar turno */}
            <button onClick={() => onEdit(turno)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTurnos;
