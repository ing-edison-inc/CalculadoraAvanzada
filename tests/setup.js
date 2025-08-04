// Configuración global para los tests
jest.setTimeout(10000); // 10 segundos de timeout para tests de gráficas

// Configuración para manejar errores de console en tests
const originalError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        if (
            typeof args[0] === 'string' &&
            args[0].includes('Warning: ReactDOM.render is deprecated')
        ) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
}); 