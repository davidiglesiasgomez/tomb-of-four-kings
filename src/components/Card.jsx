import { tipoCarta } from "../utils"

export const Carta = ({ carta, handleClick }) => {
  return (
    <div
      className="carta bg-green-300 border-2 border-green-200 border-spacing-2 m-1 px-1 py-2 rounded"
      title={tipoCarta(carta)}
      onClick={() => handleClick(carta)}
    >
      {carta}
    </div>
  )
}