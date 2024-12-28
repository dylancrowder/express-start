import { Request, Response, NextFunction } from "express";
import AppError from "../utilities/error/appError";
import { ArticleModel } from "../models/model.article";
import { articleSchema, articleSchemaCreate, queryID } from "../utilities/joi";

export class ArticleController {
  // Crear
  static async create(req: Request, res: Response, next: NextFunction) {
    const { nombre, marca } = req.body;

    const { error } = articleSchemaCreate.validate(req.body);
    if (error) {
      return next(
        new AppError(
          "ValidationError",
          400,
          `${error}`,
          "Todos los parámetros son requeridos o deben ser textos"
        )
      );
    }

    try {
      const result: any = await ArticleModel.createArticle(nombre, marca);
      const newArticle = {
        id: result.insertId,
        nombre: nombre,
        marca: marca,
        estado: true,
      };

      res.status(201).json({
        message: "Artículo creado exitosamente",
        newArticle: newArticle,
      });
    } catch (error: any) {
      return next(
        new AppError(
          "InternalServerError",
          500,
          ` ${error}`,
          "Fallo la creacion del articulo"
        )
      );
    }
  }

  // Buscar todos
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await ArticleModel.findAll();
      // agregar la validacion al traer todos
      res.status(201).json(result);
    } catch (error: any) {
      return next(
        new AppError(
          "InternalServerError",
          500,
          ` ${error.message}`,
          "Error al buscar el articulo"
        )
      );
    }
  }

  // Buscar uno
  static async findByID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;


    console.log("esto es lo que me trae el controller", id);
    
    const { error } = queryID.validate(req.body);
    if (error) {
      return next(
        new AppError(
          "ValidationError",
          400,
          error,
          "Todos los parámetros son requeridos"
        )
      );
    }

    try {
      const result: any = await ArticleModel.findByID(id);

      if (result.length === 0) {
        return next(
          new AppError(
            "no items",
            400,
            `No se encontraron productos ${result}`,
            "No hay productos"
          )
        );
      }

      const { error: resultError } = articleSchema.validate(result);
      if (resultError) {
        return next(
          new AppError(
            "ValidationError",
            500,
            `${resultError.message}`,
            "El resultado obtenido no cumple con la estructura esperada: "
          )
        );
      }

      res.status(201).json(result);
    } catch (error: any) {
      return next(
        new AppError(
          "InternalServerError",
          500,
          error,
          "Error en la base de datos, Intente de nuevo"
        )
      );
    }
  }

  // Eliminar
  static async deleteByID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;

    
    const { error } = queryID.validate(req.body);
    if (error) {
      return next(
        new AppError(
          "ValidationError",
          400,
          `${error}`,
          "Todos los parámetros son requeridos"
        )
      );
    }

    try {
      const result: any = await ArticleModel.deleteByID(id);

      if (result.affectedRows === 0) {
        return next(
          new AppError(
            "NO_EXISTE",
            404,
            `${error}`,
            "El producto no existe"
          )
        );
      }

      res.status(201).json(result);
    } catch (error: any) {
      return next(
        new AppError(
          "InternalServerError",
          500,
          ` ${error}`,
          "Error al eliminar el articulo:"
        )
      );
    }
  }


  static async updateByID(req: Request, res: Response, next: NextFunction) {
    const { ID, ...updateData } = req.body;

    if (!ID) {
      return next(
        new AppError(
          "ValidationError",
          400,
          "No se proporcionó el ID del producto",
          "Debe enviar un ID válido en el cuerpo"
        )
      );
    }

    updateData.FECHA_MODIFICACION = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Validar que se envíen datos para actualizar
    if (!updateData || Object.keys(updateData).length === 0) {
      return next(
        new AppError(
          "ValidationError",
          400,
          "No se proporcionaron datos para actualizar",
          "Debe enviar al menos un campo a modificar"
        )
      );
    }

    try {
      const result: any = await ArticleModel.updateByID(ID, updateData);

      if (result.affectedRows === 0) {
        return next(
          new AppError(
            "NotFoundError",
            404,
            `Producto con ID ${ID} no encontrado`,
            "No se pudo actualizar porque no existe"
          )
        );
      }

      res.status(200).json({
        message: "Producto actualizado correctamente",
        data: updateData,
      });
    } catch (error: any) {
      return next(
        new AppError(
          "InternalServerError",
          500,
          `${error.message}`,
          "Error al actualizar el producto"
        )
      );
    }
  }


}
