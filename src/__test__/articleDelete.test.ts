import request from "supertest";
import app from "../app"; // Importa tu aplicación
import { ArticleModel } from "../models/model.article";
import "./config"; // Si es necesario para la configuración

// Mock de ArticleModel
jest.mock("../models/model.article", () => ({
  ArticleModel: {
    deleteByID: jest.fn(),
  },
}));

describe("Article Controller", () => {
  describe("POST /api/delete-one", () => {
    it("should return 400 when the ID is not valid according to queryID schema", async () => {
      const invalidID = "invalid"; // ID inválido

      const response = await request(app)
        .delete("/api/delete-one")
        .send({ id: invalidID });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Todos los parámetros son requeridos");
    });

    it("should return 201 when the article is successfully deleted", async () => {
      const validID = 1; // ID válido
      const result = { message: "Artículo eliminado con éxito" };

      // Mock de la función deleteByID para devolver el resultado
      (ArticleModel.deleteByID as jest.Mock).mockResolvedValue(result);

      const response = await request(app)
        .delete("/api/delete-one")
        .send({ id: validID });

      expect(response.status).toBe(201); // Respuesta de éxito
      expect(response.body).toEqual(result); // Respuesta esperada
      expect(ArticleModel.deleteByID).toHaveBeenCalledWith(validID); // Verifica que se llamó con el ID correcto
    });

    it("should return 500 if there is an internal server error", async () => {
      const validID = 1; // ID válido

      // Simula un error en la eliminación
      (ArticleModel.deleteByID as jest.Mock).mockRejectedValue(
        new Error("Error al eliminar")
      );

      const response = await request(app)
        .delete("/api/delete-one")
        .send({ id: validID });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Error al eliminar el articulo:");
    });
  });
});
