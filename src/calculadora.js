const math = require('mathjs');
const ss = require('simple-statistics');

class CalculadoraAvanzada {
    constructor() {
        this.historial = [];
        this.memoria = 0;
    }

    // Operaciones básicas
    sumar(a, b) {
        const resultado = math.add(a, b);
        this.agregarAlHistorial(`${a} + ${b} = ${resultado}`);
        return resultado;
    }

    restar(a, b) {
        const resultado = math.subtract(a, b);
        this.agregarAlHistorial(`${a} - ${b} = ${resultado}`);
        return resultado;
    }

    multiplicar(a, b) {
        const resultado = math.multiply(a, b);
        this.agregarAlHistorial(`${a} × ${b} = ${resultado}`);
        return resultado;
    }

    dividir(a, b) {
        if (b === 0) {
            throw new Error('No se puede dividir por cero');
        }
        const resultado = math.divide(a, b);
        this.agregarAlHistorial(`${a} ÷ ${b} = ${resultado}`);
        return resultado;
    }

    potencia(base, exponente) {
        const resultado = math.pow(base, exponente);
        this.agregarAlHistorial(`${base}^${exponente} = ${resultado}`);
        return resultado;
    }

    raizCuadrada(numero) {
        if (numero < 0) {
            throw new Error('No se puede calcular la raíz cuadrada de un número negativo');
        }
        const resultado = math.sqrt(numero);
        this.agregarAlHistorial(`√${numero} = ${resultado}`);
        return resultado;
    }

    // Operaciones trigonométricas
    seno(angulo) {
        const resultado = math.sin(angulo);
        this.agregarAlHistorial(`sin(${angulo}) = ${resultado}`);
        return resultado;
    }

    coseno(angulo) {
        const resultado = math.cos(angulo);
        this.agregarAlHistorial(`cos(${angulo}) = ${resultado}`);
        return resultado;
    }

    tangente(angulo) {
        const resultado = math.tan(angulo);
        this.agregarAlHistorial(`tan(${angulo}) = ${resultado}`);
        return resultado;
    }

    // Operaciones estadísticas
    media(numeros) {
        if (!Array.isArray(numeros) || numeros.length === 0) {
            throw new Error('Se requiere un array de números no vacío');
        }
        const resultado = ss.mean(numeros);
        this.agregarAlHistorial(`Media de [${numeros.join(', ')}] = ${resultado}`);
        return resultado;
    }

    mediana(numeros) {
        if (!Array.isArray(numeros) || numeros.length === 0) {
            throw new Error('Se requiere un array de números no vacío');
        }
        const resultado = ss.median(numeros);
        this.agregarAlHistorial(`Mediana de [${numeros.join(', ')}] = ${resultado}`);
        return resultado;
    }

    desviacionEstandar(numeros) {
        if (!Array.isArray(numeros) || numeros.length < 2) {
            throw new Error('Se requiere un array de al menos 2 números');
        }
        const resultado = ss.standardDeviation(numeros);
        this.agregarAlHistorial(`Desv. Est. de [${numeros.join(', ')}] = ${resultado}`);
        return resultado;
    }

    varianza(numeros) {
        if (!Array.isArray(numeros) || numeros.length < 2) {
            throw new Error('Se requiere un array de al menos 2 números');
        }
        const resultado = ss.variance(numeros);
        this.agregarAlHistorial(`Varianza de [${numeros.join(', ')}] = ${resultado}`);
        return resultado;
    }

    maximo(numeros) {
        if (!Array.isArray(numeros) || numeros.length === 0) {
            throw new Error('Se requiere un array de números no vacío');
        }
        const resultado = Math.max(...numeros);
        this.agregarAlHistorial(`Máximo de [${numeros.join(', ')}] = ${resultado}`);
        return resultado;
    }

    minimo(numeros) {
        if (!Array.isArray(numeros) || numeros.length === 0) {
            throw new Error('Se requiere un array de números no vacío');
        }
        const resultado = Math.min(...numeros);
        this.agregarAlHistorial(`Mínimo de [${numeros.join(', ')}] = ${resultado}`);
        return resultado;
    }

    // Funciones de memoria
    guardarEnMemoria(valor) {
        this.memoria = valor;
        this.agregarAlHistorial(`Guardado en memoria: ${valor}`);
        return this.memoria;
    }

    obtenerDeMemoria() {
        return this.memoria;
    }

    limpiarMemoria() {
        this.memoria = 0;
        this.agregarAlHistorial('Memoria limpiada');
        return this.memoria;
    }

    // Historial
    agregarAlHistorial(operacion) {
        this.historial.push({
            operacion: operacion,
            timestamp: new Date().toISOString()
        });
        
        // Mantener solo los últimos 50 elementos
        if (this.historial.length > 50) {
            this.historial = this.historial.slice(-50);
        }
    }

    obtenerHistorial() {
        return this.historial;
    }

    limpiarHistorial() {
        this.historial = [];
        return 'Historial limpiado';
    }

    // Evaluación de expresiones
    evaluarExpresion(expresion) {
        try {
            const resultado = math.evaluate(expresion);
            this.agregarAlHistorial(`${expresion} = ${resultado}`);
            return resultado;
        } catch (error) {
            throw new Error(`Error al evaluar la expresión: ${error.message}`);
        }
    }

    // Conversiones
    convertirTemperatura(valor, desde, hacia) {
        const conversiones = {
            'celsius': {
                'fahrenheit': (c) => (c * 9/5) + 32,
                'kelvin': (c) => c + 273.15
            },
            'fahrenheit': {
                'celsius': (f) => (f - 32) * 5/9,
                'kelvin': (f) => (f - 32) * 5/9 + 273.15
            },
            'kelvin': {
                'celsius': (k) => k - 273.15,
                'fahrenheit': (k) => (k - 273.15) * 9/5 + 32
            }
        };

        if (!conversiones[desde] || !conversiones[desde][hacia]) {
            throw new Error('Conversión no soportada');
        }

        const resultado = conversiones[desde][hacia](valor);
        this.agregarAlHistorial(`${valor}°${desde.charAt(0).toUpperCase()} = ${resultado.toFixed(2)}°${hacia.charAt(0).toUpperCase()}`);
        return resultado;
    }
}

module.exports = CalculadoraAvanzada; 