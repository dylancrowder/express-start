import mysql from "mysql2";
import dotenv from "dotenv";
import logger from "../utilities/pino.logger";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});


const db: any = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "3307", 10),
}


if (!db) {
  console.log("No se ha configurado correctamente el entorno de base de datos.");
  process.exit(1);
}

// Crear el pool de conexiones
export const connection = mysql.createPool(db).promise();

// Validar la conexión
connection
  .getConnection()
  .then(() =>
    logger.info(
      `Database connection established in ${process.env.NODE_ENV || "development"} mode`
    )
  )
  .catch((err) => logger.error(err));
