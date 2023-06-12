import { Carta } from "../components/Carta"
import { Cartas } from "../components/Cartas"
import { puntosVidaCarta } from "../utils"
import { PropTypes } from 'prop-types'

export const Control = ({ handleGame, handleRetornar, handleResetear, ultimaCarta, mensaje, puntosVida }) => {
  return (
    <>
      <div className="flex m-1">
        { puntosVida>1 && (
          <div className="inline-block">
            <Carta carta={puntosVidaCarta(puntosVida)} />
          </div>
        )}
        <div onClick={handleGame} className="w-16 relative cursor-pointer">
          <Cartas />
        </div>
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
      </div>
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