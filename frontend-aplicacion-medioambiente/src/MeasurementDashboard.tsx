import React, { useState, useEffect } from 'react';

/**
 * @brief Define la interfaz para el tipo de dato `Measurement`.
 * @author Alejandro Rosado
 * @param Ninguno
 * @return Ninguno
 * 
 * Esta interfaz describe la estructura de un objeto de medición, incluyendo su ID, concentración, temperatura, ubicación y fechas de creación y actualización.
 */
interface Measurement {
  _id: string;
  Concrentracion_ppm: number;
  temperatura: number;
  latitud: number;
  longitud: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * @brief Componente funcional de React que muestra el tablero de mediciones.
 * @author Alejandro Rosado
 * @param Ninguno
 * @return JSX Elemento que representa la estructura del tablero de mediciones.
 * 
 * Este componente se encarga de:
 *  - Manejar el estado de las mediciones (`measurements`) utilizando `useState`.
 *  - Manejar el estado de carga (`loading`) utilizando `useState`.
 *  - Obtener las mediciones del backend con la función `fetchMeasurements`.
 *  - Mostrar un mensaje de carga mientras se obtienen las mediciones o un mensaje si no hay mediciones disponibles.
 *  - Renderizar una tabla con las mediciones obtenidas.
 */
const MeasurementDashboard: React.FC = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Nuevo estado para carga

  /**
   * @brief Obtiene las mediciones del backend mediante una petición GET a la API.
   * @author Alejandro Rosado
   * @param Ninguno
   * @return void
   * 
   * Esta función:
   *  - Establece el estado de carga a `true` antes de la petición.
   *  - Realiza una petición GET a la API para obtener las mediciones.
   *  - Actualiza el estado de `measurements` con las mediciones obtenidas.
   *  - Maneja posibles errores durante la petición.
   *  - Establece el estado de carga a `false` después de la petición.
   */
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

  /**
   * @brief Ejecuta la función `fetchMeasurements` al renderizar el componente y cada 5 segundos.
   * @author Alejandro Rosado
   * @param Ninguno
   * @return void
   * 
   * Este efecto secundario utiliza `useEffect`:
   *  - Llama a `fetchMeasurements` para obtener las mediciones iniciales.
   *  - Crea un intervalo que llama a `fetchMeasurements` cada 5 segundos.
   *  - Limpia el intervalo al desmontar el componente para evitar fugas de memoria.
   */
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
