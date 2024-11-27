import { NextFunction, Request, Response } from "express";

function errorRoute(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
 
  
  res.status(404).json({
    error: "pagina no encontrada",
    message: `No se encontró la ruta ${req.originalUrl}`,
  });
}
export default errorRoute;
