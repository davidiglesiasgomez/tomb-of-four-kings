import { useState } from 'react'
import { tipoCarta, valorCarta, esCartaDeEncuentro, esCartaDeAccion, esCartaDeAntorcha, esCartaDeHabilidad, esCartaDeTesoro, esCartaDeFavorDivino, esCartaDePergaminoDeLuz, esCartaDeValor } from './utils'
import './App.css'
import { Antorchas } from './components/Antorchas'
import { Turnos } from './components/Turnos'
import { Mano } from './components/Mano'
import { TurnoActual } from './components/TurnoActual'
import { Control } from './components/Control'

const baraja_inicial = ['5♦', '3♠', 'Q♣', 'J♠', '9♣', 'A♦', '3♣', '2♦', '4♦', '8♦',
'10♠', '9♠', 'K♠', 'A♥', '5♠', 'J♥', '3♦', 'K♦', '4♠', 'Jk', '6♦', '5♣', 'K♣',
'Q♠', '7♠', '2♠', '8♠', 'J♦', 'A♣', 'A♠', '8♣', 'Q♦', '6♠', '10♦', 'K♥', '6♣',
'9♦', '2♣', '7♣', '4♣', '10♣', 'J♣', '7♦', 'Q♥']

// const puntos_vida_iniciales = ['10♥', '9♥', '8♥', '7♥', '6♥', '5♥', '4♥', '3♥', '2♥']

// const antorchas_iniciales = ['1♥', '1♦', '1♣', '1♠']

function App() {
  const [baraja, setBaraja] = useState(baraja_inicial)
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
  const [esquivarGolpe, setEsquivarGolpe] = useState(false)

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

  const perderPuntosVida = (puntos) => {
    console.log('perderPuntosVida', 'puntos', puntos)
    console.log('perderPuntosVida', 'esquivarGolpe', esquivarGolpe)
    console.log('perderPuntosVida', 'accion', accion)
    if (esquivarGolpe) {
      setEsquivarGolpe(false)
      setAccion(0)
      return
    }
    setPuntosVida(puntosVida => puntosVida - puntos)
    setAccion(0)
  }

  const handleGame = () => {
    let temp = null

    if (puntosVida < 2) {
      setMensaje(`Has muerto. Has perdido`)
      return
    }

    console.log('handleGame', 'ultimaCarta', ultimaCarta)
    console.log('handleGame', 'contador', contador)
    console.log('handleGame', 'encuentro', encuentro)
    console.log('handleGame', 'desafio', desafio)
    console.log('handleGame', 'accion', accion)

    if (encuentro !== '' && (accion !== 0 || favorDivino)) {
        console.log(`Tenemos encuentro y accion`)
        if (encuentro.includes('monstruo')) {
            if (desafio<=accion || favorDivino) {
                setMensaje(`Maté al monstruo` + ( favorDivino ? ` por favor divino` : `` ))
                recogerTesoro()
                terminarTurno()
            } else {
                setMensaje(`El monstruo me atacó y perdí ${desafio-accion} puntos de vida`)
                perderPuntosVida(desafio - accion)
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
                perderPuntosVida(desafio - accion)
                terminarTurno()
            }
        }
        if (encuentro.includes('puerta cerrada')) {
            if (desafio<=accion || favorDivino) {
                setMensaje(`Abrí la puerta` + ( favorDivino ? ` por favor divino` : `` ))
                recogerTesoro()
                terminarTurno()
            } else {
                setMensaje(`No pude abrir la puerta`)
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

    let guardarCarta = true

    if (esCartaDeAntorcha(carta)) {
      setMensaje(`Me acaba de arder una antorcha`)
      temp = [...antorchas]
      temp.push(carta)
      setAntorchas(temp)
      guardarCarta = false
    }
    if (esCartaDeHabilidad(carta)) {
      setMensaje(`Me acabo de encontrar una nueva habilidad "${tipoCarta(carta)}"`)
      temp = [...mano]
      temp.push(carta)
      setMano(temp)
      guardarCarta = false
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

    if (!guardarCarta) {
      return
    }

    temp = [...turnoActual]
    temp.push(carta)
    setTurnoActual(temp)

    temp = [...turnos]
    if (typeof temp[contador] === 'undefined') {
      temp[contador] = []
    }
    temp[contador].push(carta)
    setTurnos(temp)
  }

  const handleCarta = (carta) => {

    if (puntosVida < 2) {
      setMensaje(`Has muerto. Has perdido`)
      return
    }

    if (carta === 'J♠' && encuentro.includes('monstruo')) {
        setMensaje(`Mato al monstruo con mi habilidad especial de volverse berseker`)
        setMano(mano => mano.filter(item => item !== 'J♠'))
        // setTurnos(turnos => turnos[contador].concat('J♠'))
        recogerTesoro()
        terminarTurno()
        return
    }
    if (carta === 'J♦' && encuentro.includes('trampa')) {
        setMensaje(`Desactivo el mecanismo con mi habilidad especial de desactivar trampas`)
        setMano(mano => mano.filter(item => item !== 'J♦'))
        // setTurnos(turnos => turnos[contador].concat('J♦'))
        recogerTesoro()
        terminarTurno()
        return
    }
    if (carta === 'J♣' && encuentro.includes('puerta cerrada')) {
        setMensaje(`Abro la puerta con mi habilidad especial de abrir cerraduras`)
        setMano(mano => mano.filter(item => item !== 'J♣'))
        // setTurnos(turnos => turnos[contador].concat('J♣'))
        recogerTesoro()
        terminarTurno()
        return
    }
    if (carta === 'J♥' && (encuentro.includes('monstruo') || encuentro.includes('trampa'))) {
        setMensaje(`No me hago daño con mi habilidad especial de esquivar golpe`)
        setMano(mano => mano.filter(item => item !== 'J♥'))
        // setTurnos(turnos => turnos[contador].concat('J♥'))
        // recogerTesoro()
        // terminarTurno()
        setEsquivarGolpe(true)
        return
    }
    setMensaje(`No tiene sentido usar esa carta`)
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Tomb of Four Kings</h1>
      <div className="game">
        <Antorchas antorchas={antorchas} />
        <Turnos turnos={turnos} />
        <Mano mano={mano} handleCarta={handleCarta} />
        { false && <TurnoActual turnoActual={turnoActual} /> }
        <Control handleGame={handleGame} ultimaCarta={ultimaCarta} mensaje={mensaje} accion={accion} puntosVida={puntosVida} />
      </div>
    </>
  )
}

export default App
