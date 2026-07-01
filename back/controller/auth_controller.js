import bcrypt from "bcrypt";
import { getUsuarioByEmail, createUsuario } from "../models/usuariosModel.js";
import jwt from "jsonwebtoken";

// Controlador para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    // datos de entrada: nombre, email, password
    const { nombre, email, password } = req.body;

    // Validar que el usuario no exista
    const usuarioExistente = await getUsuarioByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos
    const nuevoUsuario = await createUsuario(nombre, email, hashedPassword);
    // Responder con el nuevo usuario creado
    return res.status(201).json({
      message: "Usuario creado exitosamente",
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
      },
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para iniciar sesión
export const loginUser = async (req, res) => {
  try {
    // datos de entrada: email, password
    const { email, password } = req.body;

    // Validar que el usuario exista
    const usuario = await getUsuarioByEmail(email);
    if (!usuario) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña ingresada con la contraseña hasheada almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT para el usuario autenticado
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    // Responder con el token JWT y la información del usuario
    return res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
