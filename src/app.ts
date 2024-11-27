import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

import articleRoutes from "./routes/article.routes";
import start from "./routes/init.routes";
import { swaggerDocs } from "./documentation/swagger.config";
import errorHandler from "./middlewares/error.middleware";
import { apiLimiter } from "./utilities/apiLimiter";
import errorRoute from "./middlewares/error.route";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Configuración de middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: "300kb" }));
app.use(apiLimiter);
app.use(morgan("dev"));

// Rutas específicas
app.use("/", start);
app.use("/api", articleRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware de manejo de errores
app.use(errorHandler);

// Manejo de rutas no encontradas
app.use(errorRoute);

export default app;
