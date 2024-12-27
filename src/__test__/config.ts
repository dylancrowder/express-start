import { connection } from "../db/db_connect";
// En el test:
afterAll(async () => {
  try {
    if (connection) {
      console.log("Cerrando el pool de conexiones...");
      await connection.end(); // Debería funcionar si es un pool directo
      console.log("Pool cerrado correctamente.");
    }
  } catch (err) {
    console.error("Error al cerrar el pool:", err);
  }
});


//HACER UNA CONEXION SEPARADA DE LA BASE DE DATOS APARTE DE LA APP 