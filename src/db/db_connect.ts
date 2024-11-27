import mysql from "mysql2";
import dotenv from "dotenv";
import logger from "../utilities/pino.logger";

dotenv.config();

// Configuración general para producción
const config = {
  host: process.env.DB_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: parseInt(process.env.DB_PORT || "3307"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Configuración específica para pruebas
const configTest = {
  host: "localhost",
  port: 3309,
  user: "root",
  password: "12345",
  database: "db",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
};

// Selección dinámica según el entorno
const selectedConfig = process.env.NODE_ENV === "test" ? configTest : config;

// Crear el pool de conexiones
export const connection = mysql.createPool(selectedConfig).promise();

// Validar la conexión
connection
  .getConnection()
  .then(() =>
    logger.info(
      `Database connection established in ${
        process.env.NODE_ENV || "development"
      } mode`
    )
  )
  .catch((err) => logger.error(err));
