// Comprobaciones rápidas de las respuestas principales y de las reglas del producto.
const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');
const Producto = require('../src/models/producto');

test('GET /health responde con estado 200 y JSON', async () => {
  const response = await request(app).get('/health').expect('Content-Type', /json/).expect(200);
  assert.equal(response.body.estado, 'ok');
});

test('ruta desconocida responde 404 en JSON', async () => {
  const response = await request(app).get('/ruta-inexistente').expect('Content-Type', /json/).expect(404);
  assert.equal(response.body.error, 'Ruta no encontrada.');
});

test('JSON mal formado responde 400 en JSON', async () => {
  const response = await request(app)
    .post('/api/productos')
    .set('Content-Type', 'application/json')
    .send('{"nombre":')
    .expect('Content-Type', /json/)
    .expect(400);
  assert.match(response.body.error, /JSON válido/);
});

test('identificador no válido responde 400 antes de consultar MongoDB', async () => {
  const response = await request(app).get('/api/productos/no-es-un-object-id').expect(400);
  assert.match(response.body.error, /identificador/);
});

test('esquema rechaza precio negativo, cantidad fraccionaria y nombre vacío', async () => {
  const producto = new Producto({ nombre: ' ', descripcion: 'Prueba', categoria: 'Prueba', precio: -1, cantidad: 1.5 });
  const error = producto.validateSync();
  assert.ok(error);
  assert.ok(error.errors.nombre);
  assert.ok(error.errors.precio);
  assert.ok(error.errors.cantidad);
});

test('estado activo se aplica por defecto y campos tienen nombres en español', () => {
  const producto = new Producto({ nombre: 'Teclado', descripcion: 'USB', categoria: 'Accesorios', precio: 20, cantidad: 4 });
  assert.equal(producto.estado, true);
  assert.equal(producto.collection.name, 'Productos');
});
