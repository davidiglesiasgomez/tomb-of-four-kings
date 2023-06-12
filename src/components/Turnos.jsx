import { Carta } from "../components/Carta"
import { Cartas } from "../components/Cartas"
import { PropTypes } from 'prop-types'

export const Turnos = ({ turnos, retornar }) => {
  let ida = ( retornar > 0 ? turnos.slice(0, retornar) : turnos )
  let vuelta = ( retornar > 0 ? turnos.slice(retornar).reverse() : [] )
  let blancos = ( retornar > 0 ? [...Array(retornar - vuelta.length - 1).keys()] : [] )

  return (
    <div className="turnos">
      Turnos
      <table className="table-auto">
        <tbody>
        <tr className="">
          {
            ida.map((turno, index, { length }) => {
              let key = 'turno_' + index
              // if (length - 1 !== index || retornar > 0) {
              //   return <td key={key} className=""><Cartas /></td>
              // }
              return (
                <td key={key} className="">
                  <div className="flex basis-0 border-2 rounded">
                    {turno.map((carta, index_carta) => {
                      let key = 'carta_' + index + '_' + index_carta
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
        { vuelta.length>0 && <>
          <tr className="">
            {
              blancos.map((blanco, index) => {
                let key = 'blanco_' + index
                return (
                  <td key={key} className="">&nbsp;</td>
                )
              })
            }
            {
              vuelta.map((turno, index, { length }) => {
                let key = 'turno_' + index
                // console.log('index (vuelta)', index)
                // if (length - 1 !== index) {
                //   return <td key={key} className=""><Cartas /></td>
                // }
                return (
                  <td key={key} className="">
                    <div className="flex basis-0 border-2 rounded">
                      {turno.map((carta, index_carta) => {
                        let key = 'carta_' + index + '_' + index_carta
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
        </>
        }
        </tbody>
      </table>
    </div>
  )
}

Turnos.propTypes = {
  turnos: PropTypes.array,
  retornar: PropTypes.number
}