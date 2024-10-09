import React, { useState, useEffect } from 'react';

interface Measurement {
  _id: string;
  Concrentracion_ppm: number;
  temperatura: number;
  latitud: number;
  longitud: number;
  createdAt: string;
  updatedAt: string;
}

const MeasurementDashboard: React.FC = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Nuevo estado para carga

  const fetchMeasurements = async () => {
    try {
      setLoading(true); // Comienza la carga
      console.log('Fetching measurements...');
      const response = await fetch('http://localhost:3000/api/v1/mediciones/');
      const data: Measurement[] = await response.json();
      console.log('Received data:', data);
      setMeasurements(data);
    } catch (error) {
      console.error('Error fetching measurements:', error);
    } finally {
      setLoading(false); // Termina la carga
    }
  };

  useEffect(() => {
    fetchMeasurements();
    const interval = setInterval(fetchMeasurements, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  console.log('Current measurements state:', measurements);

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Sensor Measurements Dashboard</h1>
      {loading ? ( // Muestra "Loading..." si está cargando
        <p>Loading...</p>
      ) : measurements.length === 0 ? (
        <p>No measurements available</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Concentration (ppm)</th>
              <th className="px-4 py-2 border-b">Temperature</th>
              <th className="px-4 py-2 border-b">Latitude</th>
              <th className="px-4 py-2 border-b">Longitude</th>
              <th className="px-4 py-2 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {measurements.map((measurement) => (
              <tr key={measurement._id}>
                <td className="px-4 py-2 border-b">{measurement.Concrentracion_ppm}</td>
                <td className="px-4 py-2 border-b">{measurement.temperatura}</td>
                <td className="px-4 py-2 border-b">{measurement.latitud}</td>
                <td className="px-4 py-2 border-b">{measurement.longitud}</td>
                <td className="px-4 py-2 border-b">{new Date(measurement.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MeasurementDashboard;
