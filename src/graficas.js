const ss = require('simple-statistics');

class GeneradorGraficas {
    constructor() {
        this.width = 80;
        this.height = 20;
    }

    async generarGraficaBarras(datos, titulo = 'Gráfica de Barras') {
        const values = datos.values || datos;
        const labels = datos.labels || values.map((_, i) => `Dato ${i + 1}`);
        
        if (values.length === 0) {
            return Buffer.from('No hay datos para mostrar');
        }
        
        const maxValue = Math.max(...values);
        const maxBarLength = this.width - 10;
        
        let graph = `\n${titulo}\n`;
        graph += '='.repeat(titulo.length) + '\n\n';
        
        values.forEach((value, i) => {
            const barLength = Math.round((value / maxValue) * maxBarLength);
            const bar = '█'.repeat(barLength);
            const label = labels[i] || `Dato ${i + 1}`;
            graph += `${label.padEnd(15)} ${bar} ${value}\n`;
        });
        
        return Buffer.from(graph);
    }

    async generarGraficaLineas(datos, titulo = 'Gráfica de Líneas') {
        const values = datos.values || datos;
        const labels = datos.labels || values.map((_, i) => `Punto ${i + 1}`);
        
        if (values.length === 0) {
            return Buffer.from('No hay datos para mostrar');
        }
        
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const range = maxValue - minValue || 1;
        
        let graph = `\n${titulo}\n`;
        graph += '='.repeat(titulo.length) + '\n\n';
        
        // Crear matriz para la gráfica
        const height = 10;
        const width = Math.min(values.length, this.width - 10);
        const matrix = Array(height).fill().map(() => Array(width).fill(' '));
        
        // Dibujar puntos
        values.slice(0, width).forEach((value, i) => {
            const normalizedValue = (value - minValue) / range;
            const y = Math.round((1 - normalizedValue) * (height - 1));
            if (y >= 0 && y < height) {
                matrix[y][i] = '●';
            }
        });
        
        // Dibujar líneas
        for (let i = 1; i < width; i++) {
            const prevValue = values[i - 1];
            const currValue = values[i];
            const prevY = Math.round((1 - (prevValue - minValue) / range) * (height - 1));
            const currY = Math.round((1 - (currValue - minValue) / range) * (height - 1));
            
            const minY = Math.min(prevY, currY);
            const maxY = Math.max(prevY, currY);
            
            for (let y = minY; y <= maxY; y++) {
                if (y >= 0 && y < height) {
                    if (matrix[y][i] === ' ') {
                        matrix[y][i] = '─';
                    }
                }
            }
        }
        
        // Renderizar gráfica
        for (let y = 0; y < height; y++) {
            graph += `${(maxValue - (y * range / (height - 1))).toFixed(1).padStart(6)} │ ${matrix[y].join('')}\n`;
        }
        
        graph += '      └' + '─'.repeat(width) + '\n';
        graph += '        ' + values.map((v, i) => i.toString().padStart(2)).join(' ') + '\n';
        
        return Buffer.from(graph);
    }

    async generarGraficaCircular(datos, titulo = 'Gráfica Circular') {
        const values = datos.values || datos;
        const labels = datos.labels || values.map((_, i) => `Categoría ${i + 1}`);
        
        if (values.length === 0) {
            return Buffer.from('No hay datos para mostrar');
        }
        
        const total = values.reduce((sum, val) => sum + val, 0);
        
        let graph = `\n${titulo}\n`;
        graph += '='.repeat(titulo.length) + '\n\n';
        
        const symbols = ['█', '▓', '▒', '░', '▄', '▀'];
        
        values.forEach((value, i) => {
            const percentage = ((value / total) * 100).toFixed(1);
            const symbol = symbols[i % symbols.length];
            const barLength = Math.round((value / total) * 30);
            const bar = symbol.repeat(barLength);
            const label = labels[i] || `Categoría ${i + 1}`;
            
            graph += `${label.padEnd(15)} ${bar} ${percentage}% (${value})\n`;
        });
        
        graph += `\nTotal: ${total}\n`;
        
        return Buffer.from(graph);
    }

    async generarHistograma(datos, titulo = 'Histograma') {
        if (datos.length === 0) {
            return Buffer.from('No hay datos para mostrar');
        }
        
        // Crear bins para el histograma
        const min = Math.min(...datos);
        const max = Math.max(...datos);
        const numBins = Math.min(10, Math.ceil(Math.sqrt(datos.length)));
        const binSize = (max - min) / numBins;
        
        const bins = new Array(numBins).fill(0);
        const labels = [];
        
        for (let i = 0; i < numBins; i++) {
            const binStart = min + i * binSize;
            const binEnd = min + (i + 1) * binSize;
            labels.push(`${binStart.toFixed(1)}-${binEnd.toFixed(1)}`);
        }
        
        // Contar datos en cada bin
        datos.forEach(valor => {
            const binIndex = Math.min(Math.floor((valor - min) / binSize), numBins - 1);
            bins[binIndex]++;
        });
        
        const maxBin = Math.max(...bins);
        const maxBarLength = 40;
        
        let graph = `\n${titulo}\n`;
        graph += '='.repeat(titulo.length) + '\n\n';
        
        bins.forEach((bin, i) => {
            const barLength = Math.round((bin / maxBin) * maxBarLength);
            const bar = '█'.repeat(barLength);
            const label = labels[i];
            
            graph += `${label.padEnd(15)} ${bar} ${bin}\n`;
        });
        
        graph += `\nRango: ${min.toFixed(2)} - ${max.toFixed(2)}\n`;
        graph += `Total de datos: ${datos.length}\n`;
        
        return Buffer.from(graph);
    }

    async generarGraficaDispersion(datos, titulo = 'Gráfica de Dispersión') {
        const values = datos.values || datos;
        const labels = datos.labels || values.map((_, i) => `Punto ${i + 1}`);
        
        if (values.length === 0) {
            return Buffer.from('No hay datos para mostrar');
        }
        
        let graph = `\n${titulo}\n`;
        graph += '='.repeat(titulo.length) + '\n\n';
        
        graph += 'Datos de dispersión:\n';
        values.forEach((value, i) => {
            const label = labels[i] || `Punto ${i + 1}`;
            graph += `${label}: ${value}\n`;
        });
        
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const range = maxValue - minValue;
        
        graph += `\nEstadísticas:\n`;
        graph += `Máximo: ${maxValue}\n`;
        graph += `Mínimo: ${minValue}\n`;
        graph += `Rango: ${range}\n`;
        
        return Buffer.from(graph);
    }

    async generarGraficaEstadisticas(numeros, titulo = 'Estadísticas Descriptivas') {
        if (numeros.length === 0) {
            return Buffer.from('No hay datos para mostrar');
        }
        
        const media = ss.mean(numeros);
        const mediana = ss.median(numeros);
        const desvEstandar = ss.standardDeviation(numeros);
        const varianza = ss.variance(numeros);
        const maximo = Math.max(...numeros);
        const minimo = Math.min(...numeros);
        
        let graph = `\n${titulo}\n`;
        graph += '='.repeat(titulo.length) + '\n\n';
        
        const stats = [
            { name: 'Media', value: media },
            { name: 'Mediana', value: mediana },
            { name: 'Desv. Est.', value: desvEstandar },
            { name: 'Varianza', value: varianza },
            { name: 'Máximo', value: maximo },
            { name: 'Mínimo', value: minimo }
        ];
        
        const maxValue = Math.max(...stats.map(s => s.value));
        const maxBarLength = 30;
        
        stats.forEach((stat, i) => {
            const barLength = Math.round((stat.value / maxValue) * maxBarLength);
            const bar = '█'.repeat(barLength);
            
            graph += `${stat.name.padEnd(12)} ${bar} ${stat.value.toFixed(2)}\n`;
        });
        
        graph += `\nTotal de datos: ${numeros.length}\n`;
        
        return Buffer.from(graph);
    }

    // Método para guardar gráfica como archivo
    async guardarGrafica(buffer, nombreArchivo) {
        const fs = require('fs').promises;
        await fs.writeFile(nombreArchivo, buffer);
        return `Gráfica guardada como: ${nombreArchivo}`;
    }

    // Método para convertir buffer a base64
    bufferToBase64(buffer) {
        return buffer.toString('base64');
    }

    // Método para convertir texto a base64
    textToBase64(text) {
        return Buffer.from(text).toString('base64');
    }
}

module.exports = GeneradorGraficas; 