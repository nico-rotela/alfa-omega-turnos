import { useState } from "react";
import { login } from "../services/authService.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      // Almacena el token en localStorage para futuras solicitudes autenticadas
      localStorage.setItem("token", data.token);

      console.log(data);
      // Redirige al usuario a la página de inicio después del inicio de sesión exitoso
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Ingresar</button>
    </form>
  );
}

export default Login;
