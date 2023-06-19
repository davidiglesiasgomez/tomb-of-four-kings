import { useState } from 'react'
import { jugar, marcarRetorno, sacarCarta, resetearJuego } from './utils'
import './App.css'
import { Antorchas } from './components/Antorchas'
import { Turnos } from './components/Turnos'
import { Mano } from './components/Mano'
import { Control } from './components/Control'
import confetti from 'canvas-confetti'

function App() {
  const [juegoObj, setJuegoObj] = useState(resetearJuego())

  const handleGame = () => {
    if (juegoObj.fin) {
      return
    }

    let retornoObj = jugar({...juegoObj})
    setJuegoObj({...retornoObj})
    if (retornoObj.victoria) confetti()
  }

  const handleCarta = (carta) => {
    if (juegoObj.fin) {
      return
    }

    let retornoObj = sacarCarta({...juegoObj}, carta)
    setJuegoObj({...retornoObj})
  }

  const handleRetornar = () => {
    let retornoObj = marcarRetorno({...juegoObj})
    setJuegoObj({...retornoObj})
  }

  const handleResetear = () => {
    let retornoObj = resetearJuego()
    setJuegoObj({...retornoObj})
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Tomb of Four Kings</h1>
      <div className="game">
        <Antorchas antorchas={juegoObj.antorchas} />
        <Turnos turnos={juegoObj.turnos} retornar={juegoObj.retornar} />
        <Mano mano={juegoObj.mano} handleCarta={handleCarta} />
        <Control handleGame={handleGame} handleRetornar={handleRetornar} handleResetear={handleResetear} ultimaCarta={juegoObj.ultimaCarta} mensaje={juegoObj.mensaje} puntosVida={juegoObj.puntosVida} />
      </div>
    </>
  )
}

export default App
