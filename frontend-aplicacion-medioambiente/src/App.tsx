import './App.css'
import MeasurementDashboard from './MeasurementDashboard'

/**
 * @brief Componente principal de la aplicación que renderiza el tablero de mediciones.
 * @author Alejandro Rosado
 * @param Ninguno
 * @return JSX Elemento que representa la estructura de la aplicación.
 * 
 * Este componente es el punto de entrada de la aplicación y se encarga de renderizar el componente `MeasurementDashboard`.
 */

function App() {
  return (
    <div className="App">
      <MeasurementDashboard />
    </div>
  )
}

export default App