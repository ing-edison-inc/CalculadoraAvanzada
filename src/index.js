const express = require('express');
const cors = require('cors');
const path = require('path');
const CalculadoraAvanzada = require('./calculadora');
const GeneradorGraficas = require('./graficas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Instancias
const calculadora = new CalculadoraAvanzada();
const generadorGraficas = new GeneradorGraficas();

// Rutas API
app.get('/api/operaciones', (req, res) => {
    res.json({
        operaciones: [
            'sumar', 'restar', 'multiplicar', 'dividir', 'potencia', 'raizCuadrada',
            'seno', 'coseno', 'tangente', 'media', 'mediana', 'desviacionEstandar',
            'varianza', 'maximo', 'minimo', 'evaluarExpresion', 'convertirTemperatura'
        ]
    });
});

app.post('/api/calcular', (req, res) => {
    try {
        const { operacion, parametros } = req.body;
        
        if (!calculadora[operacion]) {
            return res.status(400).json({ error: 'Operación no válida' });
        }

        let resultado;
        if (Array.isArray(parametros)) {
            resultado = calculadora[operacion](...parametros);
        } else {
            resultado = calculadora[operacion](parametros);
        }

        res.json({ resultado, historial: calculadora.obtenerHistorial() });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/historial', (req, res) => {
    res.json({ historial: calculadora.obtenerHistorial() });
});

app.delete('/api/historial', (req, res) => {
    const mensaje = calculadora.limpiarHistorial();
    res.json({ mensaje });
});

app.post('/api/memoria', (req, res) => {
    const { accion, valor } = req.body;
    
    try {
        let resultado;
        switch (accion) {
            case 'guardar':
                resultado = calculadora.guardarEnMemoria(valor);
                break;
            case 'obtener':
                resultado = calculadora.obtenerDeMemoria();
                break;
            case 'limpiar':
                resultado = calculadora.limpiarMemoria();
                break;
            default:
                return res.status(400).json({ error: 'Acción no válida' });
        }
        
        res.json({ resultado, historial: calculadora.obtenerHistorial() });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rutas para gráficas
app.post('/api/graficas/barras', async (req, res) => {
    try {
        const { datos, titulo } = req.body;
        const buffer = await generadorGraficas.generarGraficaBarras(datos, titulo);
        const texto = buffer.toString();
        res.json({ texto: texto });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/graficas/lineas', async (req, res) => {
    try {
        const { datos, titulo } = req.body;
        const buffer = await generadorGraficas.generarGraficaLineas(datos, titulo);
        const texto = buffer.toString();
        res.json({ texto: texto });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/graficas/circular', async (req, res) => {
    try {
        const { datos, titulo } = req.body;
        const buffer = await generadorGraficas.generarGraficaCircular(datos, titulo);
        const texto = buffer.toString();
        res.json({ texto: texto });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/graficas/histograma', async (req, res) => {
    try {
        const { datos, titulo } = req.body;
        const buffer = await generadorGraficas.generarHistograma(datos, titulo);
        const texto = buffer.toString();
        res.json({ texto: texto });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/graficas/dispersion', async (req, res) => {
    try {
        const { datos, titulo } = req.body;
        const buffer = await generadorGraficas.generarGraficaDispersion(datos, titulo);
        const texto = buffer.toString();
        res.json({ texto: texto });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/graficas/estadisticas', async (req, res) => {
    try {
        const { datos, titulo } = req.body;
        const buffer = await generadorGraficas.generarGraficaEstadisticas(datos, titulo);
        const texto = buffer.toString();
        res.json({ texto: texto });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Calculadora Avanzada ejecutándose en http://localhost:${PORT}`);
    console.log(`📊 API disponible en http://localhost:${PORT}/api`);
    console.log(`📈 Gráficas estadísticas habilitadas`);
    console.log(`🔢 Operaciones matemáticas avanzadas`);
    console.log(`📝 Historial de operaciones`);
    console.log(`💾 Funciones de memoria`);
});

module.exports = app; 