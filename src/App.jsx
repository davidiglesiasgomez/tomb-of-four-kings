import { useState } from 'react'
import { jugar, barajarBaraja, barajaInicial, marcarRetorno, sacarCarta, pasarCartaAlTurno, recogerTesoro } from './utils'
import './App.css'
import { Antorchas } from './components/Antorchas'
import { Turnos } from './components/Turnos'
import { Mano } from './components/Mano'
import { Control } from './components/Control'
import confetti from 'canvas-confetti'

function App() {
  const [baraja, setBaraja] = useState(barajarBaraja(barajaInicial()))
  const [antorchas, setAntorchas] = useState([])
  const [turnos, setTurnos] = useState([])
  const [contador, setContador] = useState(0)
  const [mano, setMano] = useState([])
  const [encuentro, setEncuentro] = useState('')
  const [accion, setAccion] = useState('')
  const [ultimaCarta, setUltimaCarta] = useState(null)
  const [favorDivino, setFavorDivino] = useState(false)
  const [puntosVida, setPuntosVida] = useState(10)
  const [mensaje, setMensaje] = useState('')
  const [retornar, setRetornar] = useState(0)
  const [fin, setFin] = useState(false)

  const handleContinuarTurno = () => {
    setMensaje(mensaje => mensaje + `. Continua el turno...`)
    setAccion('')
  }

  const handleTerminarTurno = () => {
    setMensaje(mensaje => mensaje + `. Finaliza el turno...`)
    setFavorDivino(false)
    setContador(contador => contador + 1)
    setEncuentro('')
    setAccion('')
  }

  const handleRecogerTesoro = () => {
    let retornoObj = recogerTesoro(turnos[contador], mano)
    setMano(retornoObj.mano)
  }

  const handlePasarCartaAlTurno = (carta) => {
    let retornoObj = pasarCartaAlTurno(turnos, contador, carta)
    setTurnos(retornoObj.turnos)
  }

  const handleGame = () => {
    if (fin) {
      return
    }

    let juegoObj = {}
    juegoObj.baraja = baraja
    juegoObj.antorchas = antorchas
    juegoObj.turnos = turnos
    juegoObj.contador = contador
    juegoObj.mano = mano
    juegoObj.encuentro = encuentro
    juegoObj.accion = accion
    juegoObj.ultimaCarta = ultimaCarta
    juegoObj.favorDivino = favorDivino
    juegoObj.puntosVida = puntosVida
    juegoObj.retornar = retornar
    juegoObj.fin = fin

    let retornoObj = jugar(juegoObj)
    setBaraja(retornoObj.baraja)
    setAntorchas(retornoObj.antorchas)
    setTurnos(retornoObj.turnos)
    setContador(retornoObj.contador)
    setMano(retornoObj.mano)
    setEncuentro(retornoObj.encuentro)
    setAccion(retornoObj.accion)
    setUltimaCarta(retornoObj.carta)
    setFavorDivino(retornoObj.favorDivino)
    setPuntosVida(retornoObj.puntosVida)
    setRetornar(retornoObj.retonar)
    setFin(retornoObj.fin)
    setMensaje(retornoObj.mensaje)
    if (retornoObj.pasarCartaAlTurno) handlePasarCartaAlTurno(retornoObj.carta)
    if (retornoObj.recogerTesoro) handleRecogerTesoro()
    if (retornoObj.esVictoria) confetti()
    if (retornoObj.continuarTurno) handleContinuarTurno()
    if (retornoObj.terminarTurno) handleTerminarTurno()
  }

  const handleCarta = (carta) => {
    if (fin) {
      return
    }

    let retornoObj = sacarCarta(carta, encuentro)
    setMensaje(retornoObj.mensaje)
    if (retornoObj.quitarCartaDeMano) setMano(mano => mano.filter(item => item !== carta))
    if (retornoObj.pasarCartaAlTurno) handlePasarCartaAlTurno(carta)
    if (retornoObj.recogerTesoro) handleRecogerTesoro()
    if (retornoObj.resetearAccion) setAccion('')
    if (retornoObj.terminarTurno) handleTerminarTurno()
  }

  const handleRetornar = () => {
    let retornoObj = marcarRetorno(turnos, contador, encuentro, accion)
    setMensaje(retornoObj.mensaje)
    setRetornar(retornoObj.contador)
  }

  const handleResetear = () => {
    setBaraja(barajarBaraja(barajaInicial()))
    setAntorchas([])
    setTurnos([])
    setContador(0)
    setMano([])
    setEncuentro('')
    setAccion('')
    setUltimaCarta(null)
    setFavorDivino(false)
    setPuntosVida(10)
    setMensaje('')
    setRetornar(0)
    setFin(false)
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Tomb of Four Kings</h1>
      <div className="game">
        <Antorchas antorchas={antorchas} />
        <Turnos turnos={turnos} retornar={retornar} />
        <Mano mano={mano} handleCarta={handleCarta} />
        <Control handleGame={handleGame} handleRetornar={handleRetornar} handleResetear={handleResetear} ultimaCarta={ultimaCarta} mensaje={mensaje} puntosVida={puntosVida} />
      </div>
    </>
  )
}

export default App
