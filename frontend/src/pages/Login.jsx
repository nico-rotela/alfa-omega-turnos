import { useState } from "react";
import { login } from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">ALFA & ΩMEGA</h1>

        <p className="login-subtitle">Iniciar sesión</p>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
