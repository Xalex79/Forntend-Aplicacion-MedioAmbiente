import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * @brief Inicializa la aplicación React y renderiza el componente principal.
 * @author Alejandro Rosado
 * @param Ninguno 
 * @return void 
 * 
 * Este código configura el punto de montaje de la aplicación React en el elemento HTML con el id 'root'. 
 * Luego, renderiza el componente principal 'App' dentro de un entorno StrictMode para detectar posibles problemas en la aplicación.
 */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
