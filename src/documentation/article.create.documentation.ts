/**
 * @swagger
 * /api/v1/articles:
 *   post:
 *     summary: Crea un nuevo artículo
 *     tags: [Artículos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del artículo a crear
 *                 example: "Laptop Gamer"
 *               marca:
 *                 type: string
 *                 description: Marca del artículo a crear
 *                 example: "ASUS"
 *             required:
 *               - nombre
 *               - marca
 *     responses:
 *       201:
 *         description: Artículo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Artículo creado exitosamente"
 *                 newArticle:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID único del artículo creado
 *                       example: 10
 *                     nombre:
 *                       type: string
 *                       description: Nombre del artículo creado
 *                       example: "Aceite"
 *                     marca:
 *                       type: string
 *                       description: Marca del artículo creado
 *                       example: "soja"
 *                     estado:
 *                       type: boolean
 *                       description: Estado del artículo (true para activo, false para inactivo)
 *                       example: true
 *       400:
 *         description: Error de validación en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Todos los parámetros son requeridos"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear el artículo"
 */
