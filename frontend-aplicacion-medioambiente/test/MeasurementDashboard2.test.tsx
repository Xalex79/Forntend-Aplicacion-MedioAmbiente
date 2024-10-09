import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MeasurementDashboard from '../src/MeasurementDashboard';

declare var global: any; // Agrega esta línea para evitar el error

// Mock de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        _id: '1',
        Concrentracion_ppm: 50,
        temperatura: 22,
        latitud: 39.123,
        longitud: -0.123,
        createdAt: '2024-10-09T10:00:00.000Z',
        updatedAt: '2024-10-09T10:00:00.000Z',
      },
      {
        _id: '2',
        Concrentracion_ppm: 75,
        temperatura: 25,
        latitud: 39.456,
        longitud: -0.456,
        createdAt: '2024-10-09T10:05:00.000Z',
        updatedAt: '2024-10-09T10:05:00.000Z',
      }
    ]),
  })
) as jest.Mock;

describe('MeasurementDashboard', () => {
  it('displays measurement data when fetched successfully', async () => {
    render(<MeasurementDashboard />);

    // Esperar a que se muestre la tabla y los datos de medición
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).toBeNull(); // Asegúrate de que ya no se muestra "Loading..."
      expect(screen.getByText(/50/i)).toBeInTheDocument();
      expect(screen.getByText(/22/i)).toBeInTheDocument();
      expect(screen.getByText(/39.123/i)).toBeInTheDocument();
      expect(screen.getByText(/-0.123/i)).toBeInTheDocument();
      expect(screen.getByText(/75/i)).toBeInTheDocument();
      expect(screen.getByText(/25/i)).toBeInTheDocument();
      expect(screen.getByText(/39.456/i)).toBeInTheDocument();
      expect(screen.getByText(/-0.456/i)).toBeInTheDocument();
    });
  });
});
