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

const configProd = {
  host: process.env.PROD_DB_HOST,
  port: process.env.PROD_DB_PORT ? Number(process.env.PROD_DB_PORT) : undefined,
  user: process.env.PROD_DB_USER,
  password: process.env.PROD_DB_PASSWORD,
  database: process.env.PROD_DB_NAME,
};

const enviroment = process.env.NODE_ENV;

let selectedConfig;

if (enviroment === "test") {
  selectedConfig = configTest;
} else if (enviroment === "production") {
  selectedConfig = configProd;
} else if (enviroment === "development") {
  selectedConfig = configDev;
} else {
  console.log("enviroment no válido");
}

// Si no se seleccionó ninguna configuración, puedes hacer un chequeo
if (!selectedConfig) {
  console.log("No se ha configurado correctamente el entorno de base de datos.");
  process.exit(1); 
}

// Crear el pool de conexiones
export const connection = mysql.createPool(selectedConfig).promise();

// Validar la conexión
connection
  .getConnection()
  .then(() =>
    logger.info(
      `Database connection established in ${process.env.NODE_ENV || "development"} mode`
    )
  )
  .catch((err) => logger.error(err));
