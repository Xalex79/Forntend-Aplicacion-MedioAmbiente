import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MeasurementDashboard from '../src/MeasurementDashboard';

// Mock de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe('MeasurementDashboard', () => {
  it('displays loading message while fetching data', async () => {
    render(<MeasurementDashboard />);

    // Esperar que se muestre el mensaje "Loading..."
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Esperar a que se resuelva la promesa y que se muestre el mensaje "No measurements available"
    await waitFor(() => expect(screen.getByText(/No measurements available/i)).toBeInTheDocument());
  });
});
