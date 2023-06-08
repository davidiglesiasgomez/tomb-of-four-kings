import { Carta } from "../components/Carta"
import { PropTypes } from 'prop-types'

export const Control = ({ handleGame, ultimaCarta, mensaje, accion, puntosVida }) => {
  return (
    <>
      <button onClick={handleGame}>
        Baraja
      </button>
      { ultimaCarta && (
        <div className="inline-block">
          <Carta carta={ultimaCarta} />
        </div>
        )
      }
      <p className="mensaje">
        {mensaje}
      </p>
      <p className="text-gray-300">
        Accion: {accion}
      </p>
      <p className="text-gray-300">
        Puntos de vida: {puntosVida}
      </p>
    </>
  )
}

Control.propTypes = {
  handleGame: PropTypes.func,
  ultimaCarta: PropTypes.string,
  mensaje: PropTypes.string,
  accion: PropTypes.number,
  puntosVida: PropTypes.number
}