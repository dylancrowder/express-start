import request from "supertest";
import app from "../app";
import { ArticleModel } from "../models/model.article";
import "./config";

// Mock the ArticleModel's static method findByID
jest.mock("../models/model.article", () => ({
  ArticleModel: {
    findByID: jest.fn(),
  },
}));

describe("Article Controller", () => {
  describe("POST /api/find-one", () => {
    it("should return 400 when the ID is not valid according to queryID schema", async () => {
      const invalidID = "invalid";

      const response = await request(app)
        .post("/api/find-one")
        .send({ id: invalidID }); 

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Todos los parámetros son requeridos"); // Expecting validation message
    });

    it("should return 200 and an article when the ID is valid", async () => {
        const fakeArticle = {
            ID: 1,
            NOMBRE: "Fake Article",
            MARCA: "This is a fake article.",
            ESTADO: 3,
            FECHA_MODIFICACION: new Date().toISOString(),
          };

      (ArticleModel.findByID as jest.Mock).mockResolvedValue([fakeArticle]);

      const response = await request(app).post("/api/find-one").send({ id: 1 });
  

      expect(response.status).toBe(201); 
      expect(response.body).toEqual([fakeArticle]);
      expect(ArticleModel.findByID).toHaveBeenCalledWith(1);
    });
  });
});
