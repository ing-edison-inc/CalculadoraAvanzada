const CalculadoraAvanzada = require('../src/calculadora');

describe('CalculadoraAvanzada', () => {
    let calculadora;

    beforeEach(() => {
        calculadora = new CalculadoraAvanzada();
    });

    describe('Operaciones básicas', () => {
        test('debe sumar dos números correctamente', () => {
            const resultado = calculadora.sumar(5, 3);
            expect(resultado).toBe(8);
        });

        test('debe restar dos números correctamente', () => {
            const resultado = calculadora.restar(10, 4);
            expect(resultado).toBe(6);
        });

        test('debe multiplicar dos números correctamente', () => {
            const resultado = calculadora.multiplicar(6, 7);
            expect(resultado).toBe(42);
        });

        test('debe dividir dos números correctamente', () => {
            const resultado = calculadora.dividir(15, 3);
            expect(resultado).toBe(5);
        });

        test('debe lanzar error al dividir por cero', () => {
            expect(() => {
                calculadora.dividir(10, 0);
            }).toThrow('No se puede dividir por cero');
        });

        test('debe calcular potencia correctamente', () => {
            const resultado = calculadora.potencia(2, 3);
            expect(resultado).toBe(8);
        });

        test('debe calcular raíz cuadrada correctamente', () => {
            const resultado = calculadora.raizCuadrada(16);
            expect(resultado).toBe(4);
        });

        test('debe lanzar error al calcular raíz de número negativo', () => {
            expect(() => {
                calculadora.raizCuadrada(-4);
            }).toThrow('No se puede calcular la raíz cuadrada de un número negativo');
        });
    });

    describe('Operaciones trigonométricas', () => {
        test('debe calcular seno correctamente', () => {
            const resultado = calculadora.seno(Math.PI / 2);
            expect(resultado).toBeCloseTo(1, 5);
        });

        test('debe calcular coseno correctamente', () => {
            const resultado = calculadora.coseno(0);
            expect(resultado).toBeCloseTo(1, 5);
        });

        test('debe calcular tangente correctamente', () => {
            const resultado = calculadora.tangente(Math.PI / 4);
            expect(resultado).toBeCloseTo(1, 5);
        });
    });

    describe('Operaciones estadísticas', () => {
        const numeros = [1, 2, 3, 4, 5];

        test('debe calcular media correctamente', () => {
            const resultado = calculadora.media(numeros);
            expect(resultado).toBe(3);
        });

        test('debe calcular mediana correctamente', () => {
            const resultado = calculadora.mediana(numeros);
            expect(resultado).toBe(3);
        });

        test('debe calcular desviación estándar correctamente', () => {
            const resultado = calculadora.desviacionEstandar(numeros);
            expect(resultado).toBeCloseTo(1.5811, 3);
        });

        test('debe calcular varianza correctamente', () => {
            const resultado = calculadora.varianza(numeros);
            expect(resultado).toBeCloseTo(2.5, 3);
        });

        test('debe encontrar máximo correctamente', () => {
            const resultado = calculadora.maximo(numeros);
            expect(resultado).toBe(5);
        });

        test('debe encontrar mínimo correctamente', () => {
            const resultado = calculadora.minimo(numeros);
            expect(resultado).toBe(1);
        });

        test('debe lanzar error para array vacío en media', () => {
            expect(() => {
                calculadora.media([]);
            }).toThrow('Se requiere un array de números no vacío');
        });

        test('debe lanzar error para array vacío en mediana', () => {
            expect(() => {
                calculadora.mediana([]);
            }).toThrow('Se requiere un array de números no vacío');
        });

        test('debe lanzar error para array con menos de 2 elementos en desviación estándar', () => {
            expect(() => {
                calculadora.desviacionEstandar([1]);
            }).toThrow('Se requiere un array de al menos 2 números');
        });

        test('debe lanzar error para array con menos de 2 elementos en varianza', () => {
            expect(() => {
                calculadora.varianza([1]);
            }).toThrow('Se requiere un array de al menos 2 números');
        });
    });

    describe('Funciones de memoria', () => {
        test('debe guardar valor en memoria', () => {
            const valor = 42;
            const resultado = calculadora.guardarEnMemoria(valor);
            expect(resultado).toBe(valor);
            expect(calculadora.obtenerDeMemoria()).toBe(valor);
        });

        test('debe obtener valor de memoria', () => {
            const valor = 100;
            calculadora.guardarEnMemoria(valor);
            const resultado = calculadora.obtenerDeMemoria();
            expect(resultado).toBe(valor);
        });

        test('debe limpiar memoria', () => {
            calculadora.guardarEnMemoria(50);
            const resultado = calculadora.limpiarMemoria();
            expect(resultado).toBe(0);
            expect(calculadora.obtenerDeMemoria()).toBe(0);
        });
    });

    describe('Historial', () => {
        test('debe agregar operación al historial', () => {
            calculadora.sumar(2, 3);
            const historial = calculadora.obtenerHistorial();
            expect(historial.length).toBe(1);
            expect(historial[0].operacion).toContain('2 + 3 = 5');
        });

        test('debe limpiar historial', () => {
            calculadora.sumar(1, 2);
            calculadora.restar(5, 3);
            const mensaje = calculadora.limpiarHistorial();
            expect(mensaje).toBe('Historial limpiado');
            expect(calculadora.obtenerHistorial().length).toBe(0);
        });

        test('debe mantener máximo 50 elementos en historial', () => {
            for (let i = 0; i < 60; i++) {
                calculadora.sumar(i, 1);
            }
            const historial = calculadora.obtenerHistorial();
            expect(historial.length).toBe(50);
        });
    });

    describe('Evaluación de expresiones', () => {
        test('debe evaluar expresión simple', () => {
            const resultado = calculadora.evaluarExpresion('2 + 3 * 4');
            expect(resultado).toBe(14);
        });

        test('debe evaluar expresión compleja', () => {
            const resultado = calculadora.evaluarExpresion('(2 + 3) * 4');
            expect(resultado).toBe(20);
        });

        test('debe lanzar error para expresión inválida', () => {
            expect(() => {
                calculadora.evaluarExpresion('2 + + 3');
            }).toThrow();
        });
    });

    describe('Conversiones de temperatura', () => {
        test('debe convertir Celsius a Fahrenheit', () => {
            const resultado = calculadora.convertirTemperatura(25, 'celsius', 'fahrenheit');
            expect(resultado).toBe(77);
        });

        test('debe convertir Celsius a Kelvin', () => {
            const resultado = calculadora.convertirTemperatura(25, 'celsius', 'kelvin');
            expect(resultado).toBe(298.15);
        });

        test('debe convertir Fahrenheit a Celsius', () => {
            const resultado = calculadora.convertirTemperatura(77, 'fahrenheit', 'celsius');
            expect(resultado).toBe(25);
        });

        test('debe convertir Fahrenheit a Kelvin', () => {
            const resultado = calculadora.convertirTemperatura(77, 'fahrenheit', 'kelvin');
            expect(resultado).toBe(298.15);
        });

        test('debe convertir Kelvin a Celsius', () => {
            const resultado = calculadora.convertirTemperatura(298.15, 'kelvin', 'celsius');
            expect(resultado).toBe(25);
        });

        test('debe convertir Kelvin a Fahrenheit', () => {
            const resultado = calculadora.convertirTemperatura(298.15, 'kelvin', 'fahrenheit');
            expect(resultado).toBe(77);
        });

        test('debe lanzar error para conversión no soportada', () => {
            expect(() => {
                calculadora.convertirTemperatura(25, 'celsius', 'rankine');
            }).toThrow('Conversión no soportada');
        });
    });
}); 