import request from "supertest";
import app from "../app";
import "./config";
import { connection } from "../db/db_connect";
jest.mock("../models/model.article", () => ({
  ArticleModel: {
    createArticle: jest.fn(),
  },
}));

afterEach(async () => {
  await connection.query("DELETE FROM ARTICLE");
});

describe("Article Controller", () => {
  describe("POST /api/create-article", () => {
    it(" should create a new article successfully", async () => {
      //ajustar
      const newArticle = { nombre: "Product 1", marca: "Brand 1" };
      const mockCreateArticle = jest.fn().mockResolvedValue({ insertId: 1 });

      // actuar
      require("../models/model.article").ArticleModel.createArticle =
        mockCreateArticle;
      const response = await request(app)
        .post("/api/create-article")
        .send(newArticle);

      // afirmar
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Artículo creado exitosamente");
      expect(response.body.newArticle).toEqual({
        id: 1,
        nombre: "Product 1",
        marca: "Brand 1",
        estado: true,
      });
    });

    it("should return a validation error if required fields are missing", async () => {
      const invalidArticle = {};

      const response = await request(app)
        .post("/api/create-article")
        .send(invalidArticle);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(
        /Todos los parámetros son requeridos/
      );
    });

    it("should return error when 'nombre' and 'marca' are numbers", async () => {
      const invalidArticle = { nombre: 232, marca: 3232 };

      const response = await request(app)
        .post("/api/create-article")
        .send(invalidArticle);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(
        /Todos los parámetros son requeridos/
      );
    });
  });
});
