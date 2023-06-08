import { Carta } from "../components/Carta"
import { puntosVidaCarta } from "../utils"
import { PropTypes } from 'prop-types'

export const Control = ({ handleGame, ultimaCarta, mensaje, accion, puntosVida }) => {
  return (
    <>
      <div className="inline-block">
        <Carta carta={puntosVidaCarta(puntosVida)} />
      </div>
      <button onClick={handleGame}>
        Mazo
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