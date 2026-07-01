import { pool } from "../db/connection.js";

// Función para obtener un usuario por su email
export const getUsuarioByEmail = async (email) => {
  try {
    // Consulta para obtener el usuario por email
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    // retorna el primer usuario encontrado o null si no se encuentra
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Función para crear un nuevo usuario
export const createUsuario = async (nombre, email, passwordHash) => {
  try {
    // Consulta para insertar un nuevo usuario en la base de datos
    const result = await pool.query(
      `
      INSERT INTO usuarios
      (nombre, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [nombre, email, passwordHash],
    );

    // retorna el usuario recién creado
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
