const request = require('supertest');
const app = require('../src/index');

describe('API Tests', () => {
    describe('GET /api/operaciones', () => {
        test('debe devolver lista de operaciones disponibles', async () => {
            const response = await request(app)
                .get('/api/operaciones')
                .expect(200);

            expect(response.body).toHaveProperty('operaciones');
            expect(Array.isArray(response.body.operaciones)).toBe(true);
            expect(response.body.operaciones).toContain('sumar');
            expect(response.body.operaciones).toContain('restar');
            expect(response.body.operaciones).toContain('multiplicar');
        });
    });

    describe('POST /api/calcular', () => {
        test('debe realizar suma correctamente', async () => {
            const response = await request(app)
                .post('/api/calcular')
                .send({
                    operacion: 'sumar',
                    parametros: [5, 3]
                })
                .expect(200);

            expect(response.body).toHaveProperty('resultado');
            expect(response.body.resultado).toBe(8);
            expect(response.body).toHaveProperty('historial');
        });

        test('debe realizar resta correctamente', async () => {
            const response = await request(app)
                .post('/api/calcular')
                .send({
                    operacion: 'restar',
                    parametros: [10, 4]
                })
                .expect(200);

            expect(response.body.resultado).toBe(6);
        });

        test('debe realizar multiplicación correctamente', async () => {
            const response = await request(app)
                .post('/api/calcular')
                .send({
                    operacion: 'multiplicar',
                    parametros: [6, 7]
                })
                .expect(200);

            expect(response.body.resultado).toBe(42);
        });

        test('debe realizar división correctamente', async () => {
            const response = await request(app)
                .post('/api/calcular')
                .send({
                    operacion: 'dividir',
                    parametros: [15, 3]
                })
                .expect(200);

            expect(response.body.resultado).toBe(5);
        });

        test('debe manejar división por cero', async () => {
            const response = await request(app)
                .post('/api/calcular')
                .send({
                    operacion: 'dividir',
                    parametros: [10, 0]
                })
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('No se puede dividir por cero');
        });

        test('debe calcular media estadística', async () => {
            const response = await request(app)
                .post('/api/calcular')
                .send({
                    operacion: 'media',
                    parametros: [1, 2, 3, 4, 5]
                })
                .expect(200);

            expect(response.body.resultado).toBe(3);
        });

        test('debe evaluar expresión matemática', async () => {
            const response = await request(app)
                .post('/api/calcular')
                .send({
                    operacion: 'evaluarExpresion',
                    parametros: '2 + 3 * 4'
                })
                .expect(200);

            expect(response.body.resultado).toBe(14);
        });

        test('debe manejar operación no válida', async () => {
            const response = await request(app)
                .post('/api/calcular')
                .send({
                    operacion: 'operacionInvalida',
                    parametros: [1, 2]
                })
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Operación no válida');
        });
    });

    describe('GET /api/historial', () => {
        test('debe devolver historial de operaciones', async () => {
            const response = await request(app)
                .get('/api/historial')
                .expect(200);

            expect(response.body).toHaveProperty('historial');
            expect(Array.isArray(response.body.historial)).toBe(true);
        });
    });

    describe('DELETE /api/historial', () => {
        test('debe limpiar historial', async () => {
            const response = await request(app)
                .delete('/api/historial')
                .expect(200);

            expect(response.body).toHaveProperty('mensaje');
            expect(response.body.mensaje).toBe('Historial limpiado');
        });
    });

    describe('POST /api/memoria', () => {
        test('debe guardar valor en memoria', async () => {
            const response = await request(app)
                .post('/api/memoria')
                .send({
                    accion: 'guardar',
                    valor: 42
                })
                .expect(200);

            expect(response.body).toHaveProperty('resultado');
            expect(response.body.resultado).toBe(42);
        });

        test('debe obtener valor de memoria', async () => {
            // Primero guardar un valor
            await request(app)
                .post('/api/memoria')
                .send({
                    accion: 'guardar',
                    valor: 100
                });

            const response = await request(app)
                .post('/api/memoria')
                .send({
                    accion: 'obtener'
                })
                .expect(200);

            expect(response.body.resultado).toBe(100);
        });

        test('debe limpiar memoria', async () => {
            const response = await request(app)
                .post('/api/memoria')
                .send({
                    accion: 'limpiar'
                })
                .expect(200);

            expect(response.body.resultado).toBe(0);
        });

        test('debe manejar acción no válida', async () => {
            const response = await request(app)
                .post('/api/memoria')
                .send({
                    accion: 'accionInvalida',
                    valor: 10
                })
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toBe('Acción no válida');
        });
    });

    describe('Gráficas API', () => {
        test('debe generar gráfica de barras', async () => {
            const response = await request(app)
                .post('/api/graficas/barras')
                .send({
                    datos: [1, 2, 3, 4, 5],
                    titulo: 'Gráfica de Prueba'
                })
                .expect(200);

            expect(response.body).toHaveProperty('imagen');
            expect(typeof response.body.imagen).toBe('string');
            expect(response.body.imagen.length).toBeGreaterThan(0);
        });

        test('debe generar gráfica de líneas', async () => {
            const response = await request(app)
                .post('/api/graficas/lineas')
                .send({
                    datos: [1, 2, 3, 4, 5],
                    titulo: 'Gráfica de Líneas'
                })
                .expect(200);

            expect(response.body).toHaveProperty('imagen');
            expect(typeof response.body.imagen).toBe('string');
        });

        test('debe generar gráfica circular', async () => {
            const response = await request(app)
                .post('/api/graficas/circular')
                .send({
                    datos: [1, 2, 3, 4, 5],
                    titulo: 'Gráfica Circular'
                })
                .expect(200);

            expect(response.body).toHaveProperty('imagen');
            expect(typeof response.body.imagen).toBe('string');
        });

        test('debe generar histograma', async () => {
            const response = await request(app)
                .post('/api/graficas/histograma')
                .send({
                    datos: [1, 2, 2, 3, 3, 3, 4, 4, 5],
                    titulo: 'Histograma'
                })
                .expect(200);

            expect(response.body).toHaveProperty('imagen');
            expect(typeof response.body.imagen).toBe('string');
        });

        test('debe generar gráfica de dispersión', async () => {
            const response = await request(app)
                .post('/api/graficas/dispersion')
                .send({
                    datos: [1, 2, 3, 4, 5],
                    titulo: 'Gráfica de Dispersión'
                })
                .expect(200);

            expect(response.body).toHaveProperty('imagen');
            expect(typeof response.body.imagen).toBe('string');
        });

        test('debe generar gráfica de estadísticas', async () => {
            const response = await request(app)
                .post('/api/graficas/estadisticas')
                .send({
                    datos: [1, 2, 3, 4, 5],
                    titulo: 'Estadísticas'
                })
                .expect(200);

            expect(response.body).toHaveProperty('imagen');
            expect(typeof response.body.imagen).toBe('string');
        });
    });

    describe('Manejo de errores', () => {
        test('debe manejar datos JSON inválidos', async () => {
            const response = await request(app)
                .post('/api/calcular')
                .send({
                    operacion: 'sumar',
                    parametros: 'datos inválidos'
                })
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        test('debe manejar errores en gráficas', async () => {
            const response = await request(app)
                .post('/api/graficas/barras')
                .send({
                    datos: 'datos inválidos',
                    titulo: 'Test'
                })
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });
}); 