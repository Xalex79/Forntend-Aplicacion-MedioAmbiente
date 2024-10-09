module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],  // Se carga el archivo de setup con mocks
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',  // Para mockear archivos de estilos
      '^@/(.*)$': '<rootDir>/src/$1'  // Alias para directorios
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',  // Usar ts-jest para transformar archivos TypeScript
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',  // Patrón de búsqueda de tests
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  