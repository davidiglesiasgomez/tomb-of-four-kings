import { Carta } from "../components/Carta"
import { PropTypes } from 'prop-types'

export const TurnoActual = ({ turnoActual }) => {
  return (
    <div className="turno-actual">
      Turno actual
      <div className="flex border-2">
        {
          turnoActual.map((carta_turno_actual, index_carta_turno_actual) => {
            let key = 'carta_turno_actual_' + index_carta_turno_actual
            return (
              <Carta key={key} carta={carta_turno_actual} />
            )
          })
        }
      &nbsp;
      </div>
    </div>
  )
}

TurnoActual.propTypes = {
    turnoActual: PropTypes.array
}