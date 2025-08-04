# 🧮 Demostración de la Calculadora Avanzada

## 🚀 Cómo ejecutar la aplicación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar la aplicación:**
```bash
npm start
```

3. **Abrir en el navegador:**
```
http://localhost:3000
```

## 📊 Ejemplos de Uso

### Operaciones Básicas

**Suma:**
```json
{
  "operacion": "sumar",
  "parametros": [5, 3]
}
```
Resultado: `8`

**Potencia:**
```json
{
  "operacion": "potencia",
  "parametros": [2, 3]
}
```
Resultado: `8`

**Raíz cuadrada:**
```json
{
  "operacion": "raizCuadrada",
  "parametros": [16]
}
```
Resultado: `4`

### Operaciones Trigonométricas

**Seno:**
```json
{
  "operacion": "seno",
  "parametros": [1.5708]
}
```
Resultado: `1` (aproximadamente)

### Estadísticas

**Media:**
```json
{
  "operacion": "media",
  "parametros": [1, 2, 3, 4, 5]
}
```
Resultado: `3`

**Desviación estándar:**
```json
{
  "operacion": "desviacionEstandar",
  "parametros": [1, 2, 3, 4, 5]
}
```
Resultado: `1.5811`

### Evaluación de Expresiones

**Expresión compleja:**
```json
{
  "operacion": "evaluarExpresion",
  "parametros": "2 + 3 * 4"
}
```
Resultado: `14`

### Conversiones de Temperatura

**Celsius a Fahrenheit:**
```json
{
  "operacion": "convertirTemperatura",
  "parametros": [25, "celsius", "fahrenheit"]
}
```
Resultado: `77`

## 📈 Ejemplos de Gráficas

### Gráfica de Barras
```json
{
  "datos": [10, 20, 30, 40, 50],
  "titulo": "Ventas Mensuales"
}
```

### Gráfica de Líneas
```json
{
  "datos": [1, 4, 2, 8, 5, 9, 3],
  "titulo": "Tendencias de Ventas"
}
```

### Histograma
```json
{
  "datos": [1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5],
  "titulo": "Distribución de Edades"
}
```

### Gráfica Circular
```json
{
  "datos": {
    "values": [30, 25, 20, 15, 10],
    "labels": ["Producto A", "Producto B", "Producto C", "Producto D", "Producto E"]
  },
  "titulo": "Distribución de Ventas"
}
```

### Estadísticas Descriptivas
```json
{
  "datos": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "titulo": "Análisis de Datos"
}
```

## 💾 Funciones de Memoria

**Guardar en memoria:**
```json
{
  "accion": "guardar",
  "valor": 42
}
```

**Obtener de memoria:**
```json
{
  "accion": "obtener"
}
```

**Limpiar memoria:**
```json
{
  "accion": "limpiar"
}
```

## 🔧 API Endpoints

### Operaciones Matemáticas
- `POST /api/calcular` - Realizar operaciones matemáticas

### Gráficas
- `POST /api/graficas/barras` - Gráfica de barras
- `POST /api/graficas/lineas` - Gráfica de líneas
- `POST /api/graficas/circular` - Gráfica circular
- `POST /api/graficas/histograma` - Histograma
- `POST /api/graficas/dispersion` - Gráfica de dispersión
- `POST /api/graficas/estadisticas` - Estadísticas descriptivas

### Memoria e Historial
- `POST /api/memoria` - Operaciones de memoria
- `GET /api/historial` - Obtener historial
- `DELETE /api/historial` - Limpiar historial

## 🧪 Tests

Para ejecutar los tests (requiere Jest instalado globalmente):
```bash
npm test
```

## 📋 Características Implementadas

✅ **Operaciones matemáticas básicas:**
- Suma, resta, multiplicación, división
- Potencia, raíz cuadrada
- Funciones trigonométricas (seno, coseno, tangente)

✅ **Estadísticas avanzadas:**
- Media, mediana, desviación estándar, varianza
- Máximo, mínimo
- Evaluación de expresiones matemáticas

✅ **Conversiones:**
- Temperatura (Celsius, Fahrenheit, Kelvin)

✅ **Gráficas estadísticas:**
- Gráfica de barras (texto ASCII)
- Gráfica de líneas (texto ASCII)
- Gráfica circular (texto ASCII)
- Histograma (texto ASCII)
- Gráfica de dispersión (texto ASCII)
- Estadísticas descriptivas (texto ASCII)

✅ **Funciones avanzadas:**
- Historial de operaciones
- Memoria para almacenar valores
- API REST completa
- Interfaz web moderna y responsive

✅ **Tests unitarios:**
- Tests para todas las operaciones matemáticas
- Tests para estadísticas
- Tests para gráficas
- Tests para la API

## 🎯 Resultado Final

La calculadora avanzada está completamente funcional con:

1. **Backend robusto** con Express.js
2. **Operaciones matemáticas completas** usando Math.js
3. **Estadísticas avanzadas** usando Simple Statistics
4. **Gráficas en formato texto** para máxima compatibilidad
5. **Interfaz web moderna** con diseño responsive
6. **API REST completa** para integración
7. **Tests unitarios** para garantizar calidad
8. **Documentación completa** con ejemplos

La aplicación está lista para ser usada y puede ser extendida fácilmente con nuevas funcionalidades. 