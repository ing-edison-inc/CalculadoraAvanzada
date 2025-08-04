const GeneradorGraficas = require('../src/graficas');

describe('GeneradorGraficas', () => {
    let generador;

    beforeEach(() => {
        generador = new GeneradorGraficas();
    });

    describe('Generación de gráficas', () => {
        test('debe generar gráfica de barras', async () => {
            const datos = [1, 2, 3, 4, 5];
            const buffer = await generador.generarGraficaBarras(datos);
            expect(buffer).toBeInstanceOf(Buffer);
            expect(buffer.length).toBeGreaterThan(0);
        });

        test('debe generar gráfica de líneas', async () => {
            const datos = [1, 2, 3, 4, 5];
            const buffer = await generador.generarGraficaLineas(datos);
            expect(buffer).toBeInstanceOf(Buffer);
            expect(buffer.length).toBeGreaterThan(0);
        });

        test('debe generar gráfica circular', async () => {
            const datos = [1, 2, 3, 4, 5];
            const buffer = await generador.generarGraficaCircular(datos);
            expect(buffer).toBeInstanceOf(Buffer);
            expect(buffer.length).toBeGreaterThan(0);
        });

        test('debe generar histograma', async () => {
            const datos = [1, 2, 2, 3, 3, 3, 4, 4, 5];
            const buffer = await generador.generarHistograma(datos);
            expect(buffer).toBeInstanceOf(Buffer);
            expect(buffer.length).toBeGreaterThan(0);
        });

        test('debe generar gráfica de dispersión', async () => {
            const datos = [1, 2, 3, 4, 5];
            const buffer = await generador.generarGraficaDispersion(datos);
            expect(buffer).toBeInstanceOf(Buffer);
            expect(buffer.length).toBeGreaterThan(0);
        });

        test('debe generar gráfica de estadísticas', async () => {
            const datos = [1, 2, 3, 4, 5];
            const buffer = await generador.generarGraficaEstadisticas(datos);
            expect(buffer).toBeInstanceOf(Buffer);
            expect(buffer.length).toBeGreaterThan(0);
        });
    });

    describe('Datos con formato personalizado', () => {
        test('debe generar gráfica con datos y etiquetas personalizadas', async () => {
            const datos = {
                values: [10, 20, 30, 40, 50],
                labels: ['A', 'B', 'C', 'D', 'E']
            };
            const buffer = await generador.generarGraficaBarras(datos);
            expect(buffer).toBeInstanceOf(Buffer);
            expect(buffer.length).toBeGreaterThan(0);
        });

        test('debe generar gráfica de dispersión con puntos personalizados', async () => {
            const datos = {
                puntos: [
                    { x: 1, y: 2 },
                    { x: 2, y: 4 },
                    { x: 3, y: 6 }
                ]
            };
            const buffer = await generador.generarGraficaDispersion(datos);
            expect(buffer).toBeInstanceOf(Buffer);
            expect(buffer.length).toBeGreaterThan(0);
        });
    });

    describe('Utilidades', () => {
        test('debe convertir buffer a base64', () => {
            const buffer = Buffer.from('test');
            const base64 = generador.bufferToBase64(buffer);
            expect(base64).toBe('dGVzdA==');
        });

        test('debe guardar gráfica como archivo', async () => {
            const buffer = Buffer.from('test');
            const nombreArchivo = 'test-graph.png';
            
            try {
                const resultado = await generador.guardarGrafica(buffer, nombreArchivo);
                expect(resultado).toContain('test-graph.png');
                
                // Limpiar archivo de prueba
                const fs = require('fs').promises;
                await fs.unlink(nombreArchivo);
            } catch (error) {
                // Si el archivo no existe, no es un error
                if (!error.message.includes('ENOENT')) {
                    throw error;
                }
            }
        });
    });

    describe('Manejo de errores', () => {
        test('debe manejar datos vacíos en histograma', async () => {
            const datos = [];
            await expect(generador.generarHistograma(datos)).rejects.toThrow();
        });

        test('debe manejar datos con un solo valor en histograma', async () => {
            const datos = [5];
            const buffer = await generador.generarHistograma(datos);
            expect(buffer).toBeInstanceOf(Buffer);
            expect(buffer.length).toBeGreaterThan(0);
        });
    });

    describe('Configuración de gráficas', () => {
        test('debe generar gráfica con título personalizado', async () => {
            const datos = [1, 2, 3, 4, 5];
            const titulo = 'Mi Gráfica Personalizada';
            const buffer = await generador.generarGraficaBarras(datos, titulo);
            expect(buffer).toBeInstanceOf(Buffer);
            expect(buffer.length).toBeGreaterThan(0);
        });

        test('debe generar gráfica con datos complejos', async () => {
            const datos = {
                values: [10, 20, 30, 40, 50],
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
                label: 'Ventas Mensuales'
            };
            const titulo = 'Reporte de Ventas 2024';
            const buffer = await generador.generarGraficaBarras(datos, titulo);
            expect(buffer).toBeInstanceOf(Buffer);
            expect(buffer.length).toBeGreaterThan(0);
        });
    });
}); 