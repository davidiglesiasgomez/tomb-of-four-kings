import { Carta } from "../components/Carta"
import { PropTypes } from 'prop-types'

export const Mano = ({ mano, handleCarta }) => {
  return (
    <div className="mano">
      Mano
      <div className="flex border-2">
        {
          mano.map((carta_mano, index_carta_mano) => {
            let key = 'carta_mano_' + index_carta_mano
            return (
              <Carta key={key} carta={carta_mano} handleClick={handleCarta} />
            )
          })
        }
      &nbsp;
      </div>
    </div>
  )
}

Mano.propTypes = {
  mano: PropTypes.array,
  handleCarta: PropTypes.func
}