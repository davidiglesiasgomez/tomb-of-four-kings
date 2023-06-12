import { Carta } from '../components/Carta'

export const Cartas = () => {
  return (
    <>
      <div className="w-16 relative cursor-pointer">
        <span className="absolute inset-0 -rotate-12 brightness-75"><Carta carta="&nbsp;&nbsp;&nbsp;" /></span>
        <span className="absolute inset-0 brightness-90"><Carta carta="&nbsp;&nbsp;&nbsp;" /></span>
        <span className="absolute inset-0 rotate-12"><Carta carta="&nbsp;&nbsp;&nbsp;" /></span>
      </div>
    </>
  )
}
