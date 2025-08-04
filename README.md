# 🧮 Calculadora Avanzada con Gráficas Estadísticas

Una calculadora web avanzada desarrollada en JavaScript que incluye operaciones matemáticas básicas y avanzadas, estadísticas descriptivas y generación de gráficas interactivas.

## ✨ Características

### 🔢 Operaciones Matemáticas
- **Operaciones básicas**: Suma, resta, multiplicación, división
- **Operaciones avanzadas**: Potencia, raíz cuadrada
- **Funciones trigonométricas**: Seno, coseno, tangente
- **Evaluación de expresiones**: Soporte para expresiones matemáticas complejas
- **Conversiones**: Temperatura (Celsius, Fahrenheit, Kelvin)

### 📊 Estadísticas y Análisis
- **Estadísticas descriptivas**: Media, mediana, desviación estándar, varianza
- **Análisis de datos**: Máximo, mínimo
- **Validación de datos**: Manejo de errores para datos inválidos

### 📈 Gráficas Estadísticas
- **Gráfica de barras**: Visualización de datos categóricos
- **Gráfica de líneas**: Tendencias y series temporales
- **Gráfica circular**: Distribuciones porcentuales
- **Histograma**: Distribución de frecuencias
- **Gráfica de dispersión**: Relaciones entre variables
- **Gráfica de estadísticas**: Resumen estadístico visual

### 💾 Funciones Avanzadas
- **Historial de operaciones**: Registro de todas las operaciones realizadas
- **Memoria**: Almacenamiento temporal de valores
- **Interfaz web moderna**: Diseño responsive y atractivo
- **API REST**: Endpoints para integración con otras aplicaciones

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/ing-edison.inc/CalculadoraAvanzada.git
cd CalculadoraAvanzada
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar la aplicación**
```bash
npm start
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts Disponibles

```bash
# Ejecutar la aplicación
npm start

# Ejecutar en modo desarrollo (con auto-reload)
npm run dev

# Ejecutar tests
npm test

# Ejecutar tests con coverage
npm run test:coverage
```

## 📚 Uso de la API

### Operaciones Matemáticas

```javascript
// Suma
POST /api/calcular
{
  "operacion": "sumar",
  "parametros": [5, 3]
}

// Estadísticas
POST /api/calcular
{
  "operacion": "media",
  "parametros": [1, 2, 3, 4, 5]
}

// Evaluación de expresión
POST /api/calcular
{
  "operacion": "evaluarExpresion",
  "parametros": "2 + 3 * 4"
}
```

### Gráficas

```javascript
// Gráfica de barras
POST /api/graficas/barras
{
  "datos": [1, 2, 3, 4, 5],
  "titulo": "Mi Gráfica"
}

// Gráfica con etiquetas personalizadas
POST /api/graficas/barras
{
  "datos": {
    "values": [10, 20, 30, 40, 50],
    "labels": ["A", "B", "C", "D", "E"]
  },
  "titulo": "Datos Personalizados"
}
```

### Memoria e Historial

```javascript
// Guardar en memoria
POST /api/memoria
{
  "accion": "guardar",
  "valor": 42
}

// Obtener historial
GET /api/historial

// Limpiar historial
DELETE /api/historial
```

## 🧪 Tests

El proyecto incluye una suite completa de tests unitarios y de integración:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos
npm test -- --testNamePattern="calculadora"

# Ver coverage
npm test -- --coverage
```

### Cobertura de Tests
- ✅ Operaciones matemáticas básicas y avanzadas
- ✅ Funciones trigonométricas
- ✅ Estadísticas descriptivas
- ✅ Generación de gráficas
- ✅ API REST endpoints
- ✅ Manejo de errores
- ✅ Funciones de memoria e historial

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Matemáticas**: Math.js, Simple Statistics
- **Gráficas**: Chart.js, ChartJS Node Canvas
- **Testing**: Jest, Supertest
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Estilos**: CSS Grid, Flexbox, Gradientes

## 📁 Estructura del Proyecto

```
CalculadoraAvanzada/
├── src/
│   ├── calculadora.js      # Lógica principal de la calculadora
│   ├── graficas.js         # Generación de gráficas estadísticas
│   └── index.js            # Servidor Express y API
├── public/
│   └── index.html          # Interfaz web
├── tests/
│   ├── calculadora.test.js # Tests de la calculadora
│   ├── graficas.test.js    # Tests de gráficas
│   ├── api.test.js         # Tests de la API
│   └── setup.js            # Configuración de tests
├── package.json
├── jest.config.js
└── README.md
```

## 🎯 Ejemplos de Uso

### Operaciones Básicas
```javascript
// Suma
calculadora.sumar(5, 3) // Resultado: 8

// Potencia
calculadora.potencia(2, 3) // Resultado: 8

// Raíz cuadrada
calculadora.raizCuadrada(16) // Resultado: 4
```

### Estadísticas
```javascript
const datos = [1, 2, 3, 4, 5];

calculadora.media(datos) // Resultado: 3
calculadora.mediana(datos) // Resultado: 3
calculadora.desviacionEstandar(datos) // Resultado: 1.5811
```

### Gráficas
```javascript
// Generar gráfica de barras
const buffer = await generadorGraficas.generarGraficaBarras([1, 2, 3, 4, 5]);

// Generar histograma
const buffer = await generadorGraficas.generarHistograma([1, 2, 2, 3, 3, 3, 4, 4, 5]);
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Ing. Edison Inc**
- Email: ing.edison.inc@gmail.com
- GitHub: [@ing-edison.inc](https://github.com/ing-edison.inc)

## 🙏 Agradecimientos

- Math.js por las operaciones matemáticas avanzadas
- Chart.js por la generación de gráficas
- Simple Statistics por las funciones estadísticas
- Express.js por el framework web
- Jest por el framework de testing

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
