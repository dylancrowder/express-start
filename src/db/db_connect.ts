import mysql from "mysql2";
import dotenv from "dotenv";
import logger from "../utilities/pino.logger";

dotenv.config();


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

const configDev = {
  host: "my_mysql",
  port: 3306,
  user: "root",
  password: "12345",
  database: "db",
};

const configProd = {
  host: process.env.PROD_DB_HOST,
  port: process.env.PROD_DB_PORT ? Number(process.env.PROD_DB_PORT) : undefined,
  user: process.env.PROD_DB_USER,
  password: process.env.PROD_DB_PASSWORD,
  database: process.env.PROD_DB_NAME,
};


const git = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

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

if (!selectedConfig) {
  console.log("No se ha configurado correctamente el entorno de base de datos.");
  process.exit(1);
}

// Crear el pool de conexiones
export const connection = mysql.createPool(configProd).promise();

// Validar la conexió
connection
  .getConnection()
  .then(() =>
    logger.info(
      `Database connection established in ${process.env.NODE_ENV || "development"} mode`
    )
  )
  .catch((err) => logger.error(err));
