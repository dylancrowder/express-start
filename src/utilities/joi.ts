import Joi from "joi";

// Query nombre
export const querySchema = Joi.object({
  nombre: Joi.string().required(),
});

// Query ID
export const queryID = Joi.object({
  id: Joi.number().required(),
});

// Estructura articulo
export const articleSchema = Joi.array().items(
  Joi.object({
    ID: Joi.number().required(),
    NOMBRE: Joi.string().required(),
    MARCA: Joi.string().required(),
    ESTADO: Joi.number().optional(),
    FECHA_MODIFICACION: Joi.date().required()
  })
);

// Query crear
export const articleSchemaCreate = Joi.object({
  nombre: Joi.string().required(),
  marca: Joi.string().required(),
});
