import { Carta } from "../components/Carta"
import { PropTypes } from 'prop-types'

export const Turnos = ({ turnos, retornar }) => {
  let ida = ( retornar > 0 ? turnos.slice(0, retornar) : turnos )
  let vuelta = ( retornar > 0 ? turnos.slice(retornar).reverse() : [] )
  let blancos = ( retornar > 0 ? [...Array(retornar - vuelta.length - 1).keys()] : [] )

  return (
    <div className="turnos">
      Turnos
      <table className="table-auto">
        <tr className="">
          {
            ida.map((turno, index_turno) => {
              let key = 'turno_' + index_turno
              return (
                <td key={key} className="">
                  <div className="flex basis-0 border-2 rounded">
                    {turno.map((carta, index_carta) => {
                      let key = 'carta_' + index_turno + '_' + index_carta
                      return (
                        <Carta key={key} carta={carta} />
                      )
                    })}
                  </div>
                </td>
              )
            })
          }
          &nbsp;
        </tr>
        { vuelta.length>0 && <>
          <tr className="">
            {
              blancos.map((blanco, index_blanco) => {
                let key = 'blanco_' + index_blanco
                return (
                  <td key={key} className="">&nbsp;</td>
                )
              })
            }
            {
              vuelta.map((turno, index_turno) => {
                let key = 'turno_' + index_turno
                return (
                  <td key={key} className="">
                    <div className="flex basis-0 border-2 rounded">
                      {turno.map((carta, index_carta) => {
                        let key = 'carta_' + index_turno + '_' + index_carta
                        return (
                          <Carta key={key} carta={carta} />
                        )
                      })}
                    </div>
                  </td>
                )
              })
            }
          </tr>
        </>}
      </table>
    </div>
  )
}

Turnos.propTypes = {
  turnos: PropTypes.array,
  retornar: PropTypes.number
}