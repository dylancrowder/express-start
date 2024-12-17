import { connection } from "../db/db_connect";

beforeAll(async () => {

  console.log("ESTA ES LA VARIABLE DE ENV", process.env.NODE_ENV);
  await connection.query('DROP TABLE IF EXISTS ARTICLE');
  
  await connection.query(`
    CREATE TABLE ARTICLE (
      ID SERIAL PRIMARY KEY,
      NOMBRE VARCHAR(80) NOT NULL,
      MARCA VARCHAR(80) NOT NULL,
      ESTADO BOOLEAN NOT NULL DEFAULT TRUE,
      FECHA_MODIFICACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
});

afterAll(async () => {

  
  await connection.end();
});
