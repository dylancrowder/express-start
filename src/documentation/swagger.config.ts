import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Articulos Flexxus",
      version: "1.0.0",
      description: "Documentación de API para Flexxus",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Servidor de desarrollo",
      },
    ],
  },
  apis: ["documentation/*documentation.ts"],
};
export const swaggerDocs = swaggerJsDoc(swaggerOptions);
