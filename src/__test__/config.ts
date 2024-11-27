import { connection } from "../db/db_connect";

beforeAll(async () => {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(80) NOT NULL,
      marca VARCHAR(80) NOT NULL,
      estado BOOLEAN NOT NULL DEFAULT TRUE,
      fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);
});


afterAll(async () => {
  await connection.end();
});
