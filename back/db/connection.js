import pkg from "pg";

const { Pool } = pkg;

export const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log("Conexión exitosa a la base de datos:");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });
