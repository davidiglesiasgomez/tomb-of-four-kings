import { Carta } from "../components/Carta"
import { PropTypes } from 'prop-types'

export const Antorchas = ({ antorchas }) => {
  return (
    <div className="antorchas">
      Antorchas
      <div className="flex border-2 rounded">
        {
          antorchas.map((antorcha, index_antorcha) => {
            let key = 'antorcha_' + index_antorcha
            return (
              <Carta key={key} carta={antorcha} />
            )
          })
        }
      &nbsp;
      </div>
    </div>
  )
}

Antorchas.propTypes = {
  antorchas: PropTypes.array
}