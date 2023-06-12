import { tipoCarta } from "../utils"
import { PropTypes } from 'prop-types'

export const Carta = ({ carta, handleClick }) => {
  let clase = `carta bg-green-300 border-2 border-green-200 border-spacing-2 m-1 px-1 py-2 rounded inline-block ${ handleClick ? 'cursor-pointer' : '' }`
  return (
    <div
      className={clase}
      title={tipoCarta(carta)}
      onClick={ handleClick ? () => handleClick(carta) : undefined }
    >
      {carta}
    </div>
  )
}

Carta.propTypes = {
  carta: PropTypes.string,
  handleClick: PropTypes.func
}