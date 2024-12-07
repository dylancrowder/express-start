import mysql from "mysql2";
import dotenv from "dotenv";
import logger from "../utilities/pino.logger";

dotenv.config();

const configTest = {
  host: "localhost",
  port: 3309,  // Asegúrate de usar el puerto correcto (3309)
  user: "root",
  password: "12345",
  database: "db",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
};

const configDev = {
  host: "my_mysql",
  port: 3306,
  user: "root",
  password: "12345",
  database: "db",
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
