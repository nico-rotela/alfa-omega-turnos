import "../styles/Header.css";
import logo from "../assets/logo.png";

function Header({ fecha, onPrevDay, onNextDay }) {
  const fechaFormateada = new Date(fecha.replace(/-/g, "/")).toLocaleDateString(
    "es-AR",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    },
  );

  const getEtiquetaFecha = () => {
    const hoy = new Date();
    const fechaActual = new Date(fecha.replace(/-/g, "/"));

    hoy.setHours(0, 0, 0, 0);
    fechaActual.setHours(0, 0, 0, 0);

    const diferencia = (fechaActual - hoy) / (1000 * 60 * 60 * 24);

    if (diferencia === 0) return "HOY";
    if (diferencia === -1) return "AYER";
    if (diferencia === 1) return "MAÑANA";

    return "";
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo-img" />

      <div className="fecha-container">
        <span className="fecha-badge">{getEtiquetaFecha()}</span>

        <p className="fecha-texto">{fechaFormateada}</p>
      </div>

      <div className="navegacion-fechas">
        <button className="nav-btn" onClick={onPrevDay}>
          ◀
        </button>

        <button className="nav-btn" onClick={onNextDay}>
          ▶
        </button>
      </div>
    </header>
  );
}

export default Header;
