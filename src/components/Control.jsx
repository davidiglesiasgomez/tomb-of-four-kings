import { Carta } from "../components/Carta"
import { puntosVidaCarta } from "../utils"
import { PropTypes } from 'prop-types'

export const Control = ({ handleGame, handleRetornar, handleResetear, ultimaCarta, mensaje, puntosVida }) => {
  return (
    <>
      { puntosVida>1 && (
        <div className="inline-block">
          <Carta carta={puntosVidaCarta(puntosVida)} />
        </div>
      )}
      <button onClick={handleGame}>
        Mazo
      </button>
      { ultimaCarta && (
        <div className="inline-block">
          <Carta carta={ultimaCarta} />
        </div>
      )}
      <button className="mr-1" onClick={handleRetornar}>
        Retornar
      </button>
      <button className="mr-1" onClick={handleResetear}>
        Resetear
      </button>
      <p className="mensaje">
        {mensaje}
      </p>
    </>
  )
}

Control.propTypes = {
  handleGame: PropTypes.func,
  handleRetornar: PropTypes.func,
  handleResetear: PropTypes.func,
  ultimaCarta: PropTypes.string,
  mensaje: PropTypes.string,
  puntosVida: PropTypes.number
}