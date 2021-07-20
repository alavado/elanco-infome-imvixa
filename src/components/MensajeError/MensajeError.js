import { ErrorBoundary } from 'react-error-boundary'
import './MensajeError.css'

const MensajeError = ({ children }) => {

  return (
    <ErrorBoundary FallbackComponent={ComponenteError}>
      {children}
    </ErrorBoundary>
  )
}

const ComponenteError = ({ error }) => {
  return (
    <div className="MensajeError">
      <p>Ocurrió un error en esta componente:</p>
      <p>{error.message}</p>
    </div>
  )
}

export default MensajeError