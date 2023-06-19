import { useState } from 'react'
import { jugar, barajarBaraja, barajaInicial, marcarRetorno, sacarCarta } from './utils'
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

    juegoObj = jugar(juegoObj)
    setBaraja(juegoObj.baraja)
    setAntorchas(juegoObj.antorchas)
    setTurnos(juegoObj.turnos)
    setContador(juegoObj.contador)
    setMano(juegoObj.mano)
    setEncuentro(juegoObj.encuentro)
    setAccion(juegoObj.accion)
    setUltimaCarta(juegoObj.carta)
    setFavorDivino(juegoObj.favorDivino)
    setPuntosVida(juegoObj.puntosVida)
    setRetornar(juegoObj.retornar)
    setFin(juegoObj.fin)
    setMensaje(juegoObj.mensaje)
    if (juegoObj.victoria) confetti()
    if (juegoObj.continuarTurno) handleContinuarTurno()
    if (juegoObj.terminarTurno) handleTerminarTurno()
  }

  const handleCarta = (carta) => {
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

    juegoObj = sacarCarta(juegoObj, carta)
    setMensaje(juegoObj.mensaje)
    if (juegoObj.terminarTurno) handleTerminarTurno()
  }

  const handleRetornar = () => {

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

    juegoObj = marcarRetorno(juegoObj)
    setMensaje(juegoObj.mensaje)
    setRetornar(juegoObj.retornar)
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
