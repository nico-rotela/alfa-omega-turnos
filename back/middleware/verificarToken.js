import jwt from "jsonwebtoken";

// Middleware para verificar el token JWT en las rutas protegidas
export const verificarToken = (req, res, next) => {
  try {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers.authorization;

    // Verificar que el token esté presente
    if (!authHeader) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    // El token se espera en el formato "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verificar y decodificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar la información del usuario decodificada al objeto de solicitud
    req.user = decoded;
    next(); // Continuar con la siguiente función de middleware o ruta
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};
