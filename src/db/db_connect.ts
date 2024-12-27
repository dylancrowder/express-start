import mysql from "mysql2";
import dotenv from "dotenv";
import logger from "../utilities/pino.logger";

// Cargar configuración según el entorno
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "3306", 10),
  charset: "utf8mb4",
};

// Validar configuración de la base de datos
if (!dbConfig.host || !dbConfig.user || !dbConfig.password || !dbConfig.database) {
  logger.error("Faltan variables de entorno para configurar la base de datos.");
  process.exit(1);
}

// Crear el pool de conexiones
export const connection = mysql.createPool(dbConfig).promise();

// Validar la conexión
connection
  .getConnection()
  .then((conn) => {
    logger.info(
      `Conexión a la base de datos establecida en modo ${process.env.NODE_ENV || "development"}`
    );
    conn.release(); // Liberar la conexión después de verificarla
  })
  .catch((err) => {
    logger.error("Error al conectar con la base de datos:", err.message);

  });
