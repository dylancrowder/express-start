import { connection } from "../db/db_connect";
import logger from "../utilities/pino.logger";

export class ArticleModel {
  // Crear
  static async createArticle(nombre: string, marca: string) {
    try {
      const [result]: any = await connection.query(
        "INSERT INTO ARTICLE (NOMBRE, MARCA, ESTADO) VALUES (?, ?, ?)",
        [nombre, marca, true]
      );

      return result;
    } catch (error: any) {
      logger.error(`Error al crear el artículo: ${error.message}`);
      throw new Error(`Error al crear el artículo: ${error}`);
    }
  }

  // Buscar todos
  static async findAll() {
    try {
      const [result]: any = await connection.query("SELECT * FROM ARTICLE");
      return result;
    } catch (error: any) {
      logger.error(`Error al buscar todos los articulos: ${error.message}`);
      throw new Error(`Error al buscar todos los articulos: ${error}`);
    }
  }

  // Buscar por id
  static async findByID(id: number) {
    try {
      const [result]: any = await connection.query(
        "SELECT * FROM ARTICLE WHERE ID = ?",
        [id]
      );
      return result;
    } catch (error: any) {
      logger.error(`Error al buscar un artículo: ${error.message}`);
      throw new Error(`Error al buscar un artículo: ${error}`);
    }
  }

  // Eliminar
  static async deleteByID(id: number) {
    try {
      const [result]: any = await connection.query(
        "DELETE FROM ARTICLE WHERE ID = ?",
        [id]
      );

      return result;
    } catch (error: any) {
      logger.error(`Error al eliminar un artículo: ${error.message}`);
      throw new Error(`Error al buscar un artículo: ${error}`);
    }
  }

  // Actualizar
  static async updateByID(id: string, updateData: Record<string, any>) {
    try {
      const keys = Object.keys(updateData);
      const values = Object.values(updateData);
  
      if (keys.length === 0) {
        throw new Error("No se proporcionaron datos para actualizar");
      }
  
      // Crear la consulta de actualización dinámica
      const fields = keys.map((key) => `${key} = ?`).join(", ");
  
      // Ejecutar la consulta
      const [result]: any = await connection.query(
        `UPDATE ARTICLE SET ${fields} WHERE ID = ?`,
        [...values, id] // Incluimos el ID al final
      );
  
      return result;
    } catch (error: any) {
      logger.error(`Error al actualizar un artículo: ${error.message}`);
      throw new Error(`Error al actualizar un artículo: ${error.message}`);
    }
  }
  
}
