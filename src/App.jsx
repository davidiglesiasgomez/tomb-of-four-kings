import { useState } from 'react'
import { tipoCarta, valorCarta, esCartaDeEncuentro, esCartaDeAccion, esCartaDeAntorcha, esCartaDeHabilidad, esCartaDeTesoro, esCartaDeFavorDivino, esCartaDePergaminoDeLuz, esCartaDeValor, barajarBaraja } from './utils'
import './App.css'
import { Antorchas } from './components/Antorchas'
import { Turnos } from './components/Turnos'
import { Mano } from './components/Mano'
import { TurnoActual } from './components/TurnoActual'
import { Control } from './components/Control'
import confetti from 'canvas-confetti'

const baraja_inicial = ['5♦', '3♠', 'Q♣', 'J♠', '9♣', 'A♦', '3♣', '2♦', '4♦', '8♦',
'10♠', '9♠', 'K♠', 'A♥', '5♠', 'J♥', '3♦', 'K♦', '4♠', 'Jk', '6♦', '5♣', 'K♣',
'Q♠', '7♠', '2♠', '8♠', 'J♦', 'A♣', 'A♠', '8♣', 'Q♦', '6♠', '10♦', 'K♥', '6♣',
'9♦', '2♣', '7♣', '4♣', '10♣', 'J♣', '7♦', 'Q♥']

// const baraja_inicial = ['A♦', 'A♥', 'A♣', 'A♠']

// const baraja_inicial = ['Jk', '2♦', '4♦', 'A♦', 'A♥', 'A♣', 'A♠', '2♠', '8♠']

// const baraja_inicial = ['2♦', '4♦', '2♠', '8♠', '3♠', '9♠', '4♠', '10♠', '5♠', '4♠']

function App() {
  const [baraja, setBaraja] = useState(barajarBaraja(baraja_inicial))
  const [antorchas, setAntorchas] = useState([])
  const [turnos, setTurnos] = useState([])
  const [contador, setContador] = useState(0)
  const [turnoActual, setTurnoActual] = useState([])
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

  const continuarTurno = () => {
    setMensaje(mensaje => mensaje + `. Continua el turno...`)
    setAccion(0)
  }

  const terminarTurno = () => {
    setMensaje(mensaje => mensaje + `. Finaliza el turno...`)
    setFavorDivino(false)
    setContador(contador => contador + 1)
    setTurnoActual([])
    setEncuentro('')
    setDesafio(0)
    setAccion(0)
  }

  const recogerTesoro = () => {
    let tesoros = turnoActual.filter(tesoro => esCartaDeTesoro(tesoro) || esCartaDePergaminoDeLuz(tesoro) || esCartaDeValor(tesoro))
    if (tesoros.length === turnoActual.length) {
      tesoros.sort((a, b) => valorCarta(a) - valorCarta(b))
      tesoros.shift()
    }
    setMano(mano => mano.concat(tesoros))
  }

  const descartarCartas = (numero_de_cartas) => {
    let eliminados = baraja.splice(0, numero_de_cartas)
    setBaraja(baraja)
    eliminados = eliminados.filter(eliminado => esCartaDeAntorcha(eliminado))
    let temp = [...antorchas]
    eliminados.forEach(eliminado => temp.push(eliminado))
    setAntorchas(temp)
  }

  const pasarCartaAlTurno = (carta) => {
    let temp = [...turnos]
    if (typeof temp[contador] === 'undefined') {
      temp[contador] = []
    }
    temp[contador].push(carta)
    setTurnos(temp)
  }

  const handleGame = () => {
    let temp = null

    if (retornar>1 && turnos.length === 2 * retornar - 1) {
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
          recogerTesoro()
          terminarTurno()
        } else {
          setMensaje(`El monstruo me atacó y perdí ${desafio-accion} puntos de vida`)
          setPuntosVida(puntosVida => puntosVida - desafio + accion)
          continuarTurno()
        }
      }
      if (encuentro.includes('trampa')) {
        if (desafio<=accion || favorDivino) {
          setMensaje(`Desactivé la trampa` + ( favorDivino ? ` por favor divino` : `` ))
          recogerTesoro()
          terminarTurno()
        } else {
          setMensaje(`Se activó la trampa y perdí ${desafio-accion} puntos de vida`)
          setPuntosVida(puntosVida => puntosVida - desafio + accion)
          terminarTurno()
        }
      }
      if (encuentro.includes('puerta cerrada')) {
        if (desafio<=accion || favorDivino) {
          setMensaje(`Abrí la puerta` + ( favorDivino ? ` por favor divino` : `` ))
          recogerTesoro()
          terminarTurno()
        } else {
          setMensaje(`No pude abrir la puerta. Se descartan ${desafio - accion} cartas`)
          descartarCartas(desafio - accion)
          terminarTurno()
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

    temp = [...turnoActual]
    temp.push(carta)
    setTurnoActual(temp)

    pasarCartaAlTurno(carta)
  }

  const handleCarta = (carta) => {
    if (fin) {
      return
    }

    if (carta === 'J♠' && encuentro.includes('monstruo')) {
      setMensaje(`Mato al monstruo con mi habilidad especial de volverse berseker`)
      setMano(mano => mano.filter(item => item !== carta))
      pasarCartaAlTurno(carta)
      recogerTesoro()
      terminarTurno()
      return
    }
    if (carta === 'J♦' && encuentro.includes('trampa')) {
      setMensaje(`Desactivo el mecanismo con mi habilidad especial de desactivar trampas`)
      setMano(mano => mano.filter(item => item !== carta))
      pasarCartaAlTurno(carta)
      recogerTesoro()
      terminarTurno()
      return
    }
    if (carta === 'J♣' && encuentro.includes('puerta cerrada')) {
      setMensaje(`Abro la puerta con mi habilidad especial de abrir cerraduras`)
      setMano(mano => mano.filter(item => item !== carta))
      pasarCartaAlTurno(carta)
      recogerTesoro()
      terminarTurno()
      return
    }
    if (carta === 'J♥' && (encuentro.includes('monstruo') || encuentro.includes('trampa'))) {
      setMensaje(`No me hago daño con mi habilidad especial de esquivar golpe`)
      setMano(mano => mano.filter(item => item !== carta))
      pasarCartaAlTurno(carta)
      setAccion(0)
      return
    }
    if ((esCartaDeTesoro(carta) || esCartaDePergaminoDeLuz(carta) || esCartaDeValor(carta)) && encuentro.includes('monstruo') && desafio<valorCarta(carta)) {
      setMensaje(`Tiro una carta de valor (${carta}) para distraer al monstruo`)
      setMano(mano => mano.filter(item => item !== carta))
      pasarCartaAlTurno(carta)
      terminarTurno()
      return
    }
    setMensaje(`No tiene sentido usar esa carta`)
  }

  const handleRetornar = () => {
    if (contador <= 1 && turnoActual.length === 0) {
      setMensaje(`No puedes retornar porque acabas de empezar`)
      return
    }
    if (turnoActual.length !== 0 || encuentro !== '' || desafio !== 0 || accion !== 0) {
      setMensaje(`No puedes retornar porque estás en medio de un turno`)
      return
    }
    setMensaje(`Empiezas el retorno`)
    setRetornar(contador)
  }

  const handleResetear = () => {
    setMensaje(`Resetear`)
    setBaraja(barajarBaraja(baraja_inicial))
    setAntorchas([])
    setTurnos([])
    setContador(0)
    setTurnoActual([])
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
        { false && <TurnoActual turnoActual={turnoActual} /> }
        <Control handleGame={handleGame} handleRetornar={handleRetornar} handleResetear={handleResetear} ultimaCarta={ultimaCarta} mensaje={mensaje} puntosVida={puntosVida} />
      </div>
    </>
  )
}

export default App
