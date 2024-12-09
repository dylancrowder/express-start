import mysql from "mysql2";
import dotenv from "dotenv";
import logger from "../utilities/pino.logger";

dotenv.config();

// Configuración de la base de datos usando variables de entorno
const configTest = {
  host: process.env.TEST_DB_HOST,
  port: process.env.TEST_DB_PORT ? Number(process.env.TEST_DB_PORT) : undefined, 
  user: process.env.TEST_DB_USER,
  password: process.env.TEST_DB_PASSWORD,
  database: process.env.TEST_DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
};

const configDev = {
  host: process.env.DEV_DB_HOST,
  port: process.env.DEV_DB_PORT ? Number(process.env.DEV_DB_PORT) : undefined, 
  user: process.env.DEV_DB_USER,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_NAME,
};

// Selección dinámica según el entorno
const selectedConfig = process.env.NODE_ENV === "test" ? configTest : configDev;

// Crear el pool de conexiones
export const connection = mysql.createPool(selectedConfig).promise();

// Validar la conexión
connection
  .getConnection()
  .then(() =>
    logger.info(
      `Database connection established in ${process.env.NODE_ENV || "development"
      } mode`
    )
  )
  .catch((err) => logger.error(err));
