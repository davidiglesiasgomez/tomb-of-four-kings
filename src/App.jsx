import { useState } from 'react'
import { tipoCarta, esCartaDeEncuentro, esCartaDeAccion, esCartaDeAntorcha, esCartaDeHabilidad, esCartaDeTesoro, esCartaDeFavorDivino, esCartaDePergaminoDeLuz, barajarBaraja, barajaInicial, marcarRetorno, sacarCarta, pasarCartaAlTurno, descartarCartas, recogerTesoro } from './utils'
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
  const [desafio, setDesafio] = useState(0)
  const [accion, setAccion] = useState(0)
  const [ultimaCarta, setUltimaCarta] = useState(null)
  const [favorDivino, setFavorDivino] = useState(false)
  const [puntosVida, setPuntosVida] = useState(10)
  const [mensaje, setMensaje] = useState('')
  const [retornar, setRetornar] = useState(0)
  const [fin, setFin] = useState(false)

  const handleContinuarTurno = () => {
    setMensaje(mensaje => mensaje + `. Continua el turno...`)
    setAccion(0)
  }

  const handleTerminarTurno = () => {
    setMensaje(mensaje => mensaje + `. Finaliza el turno...`)
    setFavorDivino(false)
    setContador(contador => contador + 1)
    setEncuentro('')
    setDesafio(0)
    setAccion(0)
  }

  const handleRecogerTesoro = () => {
    let retornoObj = recogerTesoro(turnos[contador], mano)
    setMano(retornoObj.mano)
  }

  const handleDescartarCartas = (numero_de_cartas) => {
    let retornoObj = descartarCartas(baraja, antorchas, numero_de_cartas)
    setBaraja(retornoObj.baraja)
    setAntorchas(retornoObj.antorchas)
  }

  const handlePasarCartaAlTurno = (carta) => {
    let retornoObj = pasarCartaAlTurno(turnos, contador, carta)
    setTurnos(retornoObj.turnos)
  }

  const handleGame = () => {
    let temp = null

    if (fin) {
      return
    }
    if (retornar>1 && turnos.length === 2 * retornar - 1 && encuentro === '' && desafio === 0 && accion === 0) {
      setMensaje(`Has regresado a la entrada de la tumba. Has ganado`)
      setFin(true)
      confetti()
      return
    }
    if (puntosVida < 2) {
      setMensaje(`Has muerto. Has perdido`)
      setFin(true)
      return
    }
    if (antorchas.length === 4 && !antorchas.some(antorcha => esCartaDePergaminoDeLuz(antorcha))) {
      setMensaje(`La última antorcha se consumió. Has perdido`)
      setFin(true)
    }
    if (antorchas.length === 5) {
      setMensaje(`La última antorcha se consumió. Has perdido`)
      setFin(true)
      return
    }

    if (encuentro !== '' && (accion !== 0 || favorDivino)) {
      if (encuentro.includes('monstruo')) {
        if (desafio<=accion || favorDivino) {
          setMensaje(`Maté al monstruo` + ( favorDivino ? ` por favor divino` : `` ))
          handleRecogerTesoro()
          handleTerminarTurno()
        } else {
          setMensaje(`El monstruo me atacó y perdí ${desafio-accion} puntos de vida`)
          setPuntosVida(puntosVida => puntosVida - desafio + accion)
          handleContinuarTurno()
        }
      }
      if (encuentro.includes('trampa')) {
        if (desafio<=accion || favorDivino) {
          setMensaje(`Desactivé la trampa` + ( favorDivino ? ` por favor divino` : `` ))
          handleRecogerTesoro()
          handleTerminarTurno()
        } else {
          setMensaje(`Se activó la trampa y perdí ${desafio-accion} puntos de vida`)
          setPuntosVida(puntosVida => puntosVida - desafio + accion)
          handleTerminarTurno()
        }
      }
      if (encuentro.includes('puerta cerrada')) {
        if (desafio<=accion || favorDivino) {
          setMensaje(`Abrí la puerta` + ( favorDivino ? ` por favor divino` : `` ))
          handleRecogerTesoro()
          handleTerminarTurno()
        } else {
          setMensaje(`No pude abrir la puerta. Se descartan ${desafio - accion} cartas`)
          handleDescartarCartas(desafio - accion)
          handleTerminarTurno()
        }
      }
      return
    }

    temp = [...baraja]
    const carta = temp.shift()
    setBaraja(temp)

    setUltimaCarta(carta)

    let valor = parseInt(carta.slice(0, -1))

    if (esCartaDeAntorcha(carta)) {
      if (antorchas.length === 3 && mano.some(carta => esCartaDePergaminoDeLuz(carta))) {
        setMensaje(`La última antorcha se iba a consumir. Por suerte, posees el pergamino de luz. La última antorcha pasa al fondo del mazo de cartas`)
        temp = [...temp]
        temp.push(carta)
        setBaraja(temp)

        temp = [...antorchas]
        temp.push('Jk')
        setAntorchas(temp)
        return
      }

      if (antorchas.filter(antorcha => esCartaDeAntorcha(antorcha)).length === 3) {
        setMensaje(`Me acaba de arder la última antorcha`)
        temp = [...antorchas]
        temp.push(carta)
        setAntorchas(temp)
        return

      }

      setMensaje(`Me acaba de arder una antorcha`)
      temp = [...antorchas]
      temp.push(carta)
      setAntorchas(temp)
      return
    }
    if (esCartaDeHabilidad(carta)) {
      setMensaje(`Me acabo de encontrar una nueva habilidad "${tipoCarta(carta)}"`)
      temp = [...mano]
      temp.push(carta)
      setMano(temp)
      return
    }
    if (esCartaDeTesoro(carta)) {
      setMensaje(`Ha aparecido un tesoro de los reyes`)
    }
    if (esCartaDeFavorDivino(carta)) {
      setMensaje(`La diosa me bendice con el favor divino`)
      setFavorDivino(true)
    }
    if (esCartaDePergaminoDeLuz(carta)) {
      setMensaje(`Ha aparecido el pergamino de luz`)
    }
    if (encuentro === '' && esCartaDeEncuentro(carta)) {
      setMensaje(`Me acabo de encontrar ${tipoCarta(carta)}`)
      setEncuentro(tipoCarta(carta))
      setDesafio(valor)
    }
    if (encuentro !== '' && esCartaDeAccion(carta)) {
      setMensaje(`Contrarrestro con un ${valor}`)
      setAccion(valor)
    }

    handlePasarCartaAlTurno(carta)
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
    if (retornoObj.resetearAccion) setAccion(0)
    if (retornoObj.terminarTurno) handleTerminarTurno()
  }

  const handleRetornar = () => {
    let retornoObj = marcarRetorno(turnos, contador, encuentro, desafio, accion)
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
    setDesafio(0)
    setAccion(0)
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
