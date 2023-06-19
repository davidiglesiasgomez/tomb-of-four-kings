import { Carta } from "../components/Carta"
import { PropTypes } from 'prop-types'

export const Turnos = ({ turnos, contador, retornar }) => {
  console.log('retornar', retornar)
  let ida = ( retornar > 0 ? turnos.slice(0, retornar) : turnos )
  let vuelta = ( retornar > 0 ? turnos.slice(retornar) : [] )
  let blancos = ( retornar > 0 ? [...Array(( retornar - vuelta.length - 1 >= 0 ? retornar - vuelta.length - 1 : 0 )).keys()] : [] )
  let divisor = ( retornar > 0 ? retornar : contador + 1 )

  return (
    <div className="turnos">
      Turnos
      <div className="">
        <div className="flex flex-row">
          {
            ida.map((turno, index) => {
              let key = 'turno_' + index
              if (turno.length === 0) {
                return
              }
              return (
                <span key={key} className={`basis-1/${divisor} border-2 rounded`}>
                    {turno.map((carta, index_carta) => {
                      let key = 'carta_' + index + '_' + index_carta
                      return (
                        <Carta key={key} carta={carta} />
                      )
                    })}
                </span>
              )
            })
          }
        </div>
        { vuelta.length>0 && <>
          <div className="flex flex-row-reverse">
            <span key="blanco_final" className={`basis-1/${divisor}`}>&nbsp;</span>
            {
              vuelta.map((turno, index) => {
                let key = 'turno_' + index
                if (turno.length === 0) {
                  return
                }
                return (
                  <span key={key} className={`basis-1/${divisor} border-2 rounded`}>
                      {turno.map((carta, index_carta) => {
                        let key = 'carta_' + index + '_' + index_carta
                        return (
                          <Carta key={key} carta={carta} />
                        )
                      })}
                  </span>
                )
              })
            }
            {
              blancos.map((blanco, index) => {
                let key = 'blanco_' + index
                return (
                  <span key={key} className="basis-1/3">&nbsp;</span>
                )
              })
            }
          </div>
        </>
        }
        </div>
    </div>
  )
}

Turnos.propTypes = {
  turnos: PropTypes.array,
  contador: PropTypes.number,
  retornar: PropTypes.number
}