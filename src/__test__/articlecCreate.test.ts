import request from "supertest";
import app from "../app"; // Asegúrate de que app.js tenga configuradas las rutas correctamente
import { ArticleModel } from "../models/model.article";
import { connection } from "../db/db_connect";

// Mock de la conexión a la base de datos
jest.mock("../db/db_connect", () => ({
  connection: {
    query: jest.fn(),
  },
}));

// Mock de las funciones del modelo
jest.mock("../models/model.article", () => ({
  ArticleModel: {
    createArticle: jest.fn(),
    findAll: jest.fn(),
    findByID: jest.fn(),
    deleteByID: jest.fn(),
    updateByID: jest.fn(),
  },
}));

describe("Article Controller", () => {

  describe("POST /api/create-article", () => {

    it("should create a new article successfully", async () => {
      // Setup: Artículo de prueba
      const newArticle = { nombre: "Product 1", marca: "Brand 1" };
      
      // Mock de la creación exitosa del artículo
      (ArticleModel.createArticle as jest.Mock).mockResolvedValueOnce({
        insertId: 1,  // Simula la inserción en la DB con un ID
      });

      // Mock de la conexión a la base de datos (simula la ejecución de una consulta)
      (connection.query as jest.Mock).mockImplementationOnce((query, params, callback) => {
        // Simulando una consulta de éxito de la base de datos
        callback(null, { insertId: 1 });
      });

      // Acción: Hacer la solicitud POST al endpoint
      const response = await request(app)
        .post("/api/create-article")
        .send(newArticle);

      // Aserciones: Verificar que la respuesta sea la esperada
      expect(response.status).toBe(201); // Espera HTTP 201 (Creado)
      expect(response.body.message).toBe("Artículo creado exitosamente");
      expect(response.body.newArticle).toEqual({
        id: 1,
        nombre: "Product 1",
        marca: "Brand 1",
        estado: true,  // Valor por defecto de "estado" debe ser true
      });
    });

    it("should return a validation error if required fields are missing", async () => {
      // Setup: Artículo inválido (falta información)
      const invalidArticle = {};  // Sin campos requeridos

      // Acción: Hacer la solicitud POST al endpoint
      const response = await request(app)
        .post("/api/create-article")
        .send(invalidArticle);

      // Aserciones: Verificar que se reciba el error de validación
      expect(response.status).toBe(400);  // Espera HTTP 400 (Bad Request)
      expect(response.body.message).toMatch(/Todos los parámetros son requeridos/);
    });

    it("should return error when 'nombre' and 'marca' are numbers", async () => {
      // Setup: Artículo con datos inválidos (números en lugar de cadenas de texto)
      const invalidArticle = { nombre: 232, marca: 3232 };

      // Acción: Hacer la solicitud POST al endpoint
      const response = await request(app)
        .post("/api/create-article")
        .send(invalidArticle);

      // Aserciones: Verificar que se reciba el error de validación
      expect(response.status).toBe(400);  // Espera HTTP 400 (Bad Request)
      expect(response.body.message).toMatch(/Todos los parámetros son requeridos/);
    });
  });

  // Prueba para obtener todos los artículos
  describe("GET /api/find-all", () => {
    it("should return a list of articles", async () => {
      // Setup: Artículos simulados
      const articles = [
        { id: 1, nombre: "Product 1", marca: "Brand 1", estado: true },
        { id: 2, nombre: "Product 2", marca: "Brand 2", estado: true },
      ];

      // Mock de la respuesta de la base de datos (simula el método findAll)
      (ArticleModel.findAll as jest.Mock).mockResolvedValueOnce(articles);

      // Mock de la conexión a la base de datos
      (connection.query as jest.Mock).mockImplementationOnce((query, params, callback) => {
        // Simulando una consulta exitosa de selección
        callback(null, articles);
      });

      // Acción: Hacer la solicitud GET al endpoint
      const response = await request(app)
        .get("/api/find-all");

      // Aserciones: Verificar que la respuesta sea correcta
      expect(response.status).toBe(201);  // Espera HTTP 200 (OK)
      expect(response.body).toEqual(articles);
    });
  });
});
