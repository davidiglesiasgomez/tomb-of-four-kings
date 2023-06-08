import { Carta } from "../components/Carta"
import { PropTypes } from 'prop-types'

export const Turnos = ({ turnos }) => {
  return (
    <div className="turnos">
      Turnos
      <div className="flex border-2">
        {
          turnos.map((turno, index_turno) => {
            let key = 'turno_' + index_turno
            return (
              <div key={key} className="turno flex border-2">
                {turno.map((carta, index_carta) => {
                  let key = 'carta_' + index_turno + '_' + index_carta
                  return (
                    <Carta key={key} carta={carta} />
                  )
                })}
              </div>
            )
          })
        }
        &nbsp;
      </div>
    </div>
  )
}

Turnos.propTypes = {
  turnos: PropTypes.array
}