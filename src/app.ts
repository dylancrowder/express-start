import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import { swaggerDocs } from "./documentation/swagger.config";
import { apiLimiter } from "./utilities/apiLimiter";

//Middlewares
import errorHandler from "./middlewares/error.middleware";
import errorRoute from "./middlewares/error.route";
import monitor from "./middlewares/monitor.middeware";

// Routes
import articleRoutes from "./routes/article.routes";
import start from "./routes/init.routes";
import monitorRoute from "./routes/prometeus.routes"


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

// Middleware monitorizacion
app.use(monitor)

// Rutas específicas
app.use("/", start);
app.use("/api", articleRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/monitor", monitorRoute)

// Manejo de rutas no encontradas
app.use(errorRoute);

// Middleware de manejo de errores
app.use(errorHandler);


export default app;

