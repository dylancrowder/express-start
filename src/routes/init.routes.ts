import { Request, Response, NextFunction, Router } from "express";

import { connection } from "../db/db_connect";
import AppError from "../utilities/error/appError";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [result]: any = await connection.query("SELECT NOW() AS currentTime");

    if (result && result.length > 0) {
      const currentTime = result[0].currentTime;
      res
        .status(200)
        .json({ currentTime, message: "Hola me llamo Dylan!" });
    }
  } catch (error: any) {
    return next(
      new AppError(
        "InternalServerError",
        500,
        ` ${error}`,
        "error en la ruta principal"
      )
    );
  }
});

export default router;
