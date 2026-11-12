# API REST de inventario

API para registrar, consultar, actualizar y eliminar productos con Node.js, Express, Mongoose y MongoDB.

## Requisitos

- Node.js 20 o superior y npm.
- Una instancia de MongoDB local o MongoDB Atlas.

## Configuración

1. Instala las dependencias con `npm install`.
2. Copia `.env.example` como `.env`.
3. En `.env`, configura `MONGODB_URI` con la dirección de tu base de datos. Mantén ese archivo privado.
4. Inicia el servidor con `npm run dev` o `npm start`.
5. Importa `postman/Asignacion_III_Inventario.postman_collection.json` en Postman. La dirección base es `http://localhost:3000`.
6. Ejecuta `npm test` para correr las pruebas automatizadas.

## Rutas

| Método | Ruta | Respuesta exitosa |
|---|---|---|
| GET | `/api/productos` | 200: lista y total de productos |
| GET | `/api/productos/:id` | 200: producto encontrado |
| POST | `/api/productos` | 201: producto creado |
| PUT | `/api/productos/:id` | 200: producto actualizado |
| DELETE | `/api/productos/:id` | 200: producto eliminado |
| GET | `/health` | 200: estado del servicio |

Los identificadores o datos no válidos responden 400; los recursos inexistentes responden 404. La API devuelve JSON.

## Datos del producto

Cada producto tiene nombre, descripción, categoría, precio, cantidad y estado. El precio debe ser un número no negativo, y la cantidad un entero no negativo. El estado es `true` por defecto. Mongoose registra las fechas de creación y actualización.
