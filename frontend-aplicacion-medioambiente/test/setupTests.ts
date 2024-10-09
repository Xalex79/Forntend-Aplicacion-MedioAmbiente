// test/setupTests.ts
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

// Asignar mockFetch a global.fetch para las pruebas
global.fetch = require('jest-fetch-mock');

// Configura fetchMock
fetchMock.enableMocks();

// Limpiar mocks entre tests
beforeEach(() => {
  fetchMock.resetMocks();
});
