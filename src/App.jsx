import { useState } from 'react'
import { tipoCarta, valorCarta, esCartaDeEncuentro, esCartaDeAccion, esCartaDeAntorcha, esCartaDeHabilidad, esCartaDeTesoro, esCartaDeFavorDivino, esCartaDePergaminoDeLuz, esCartaDeValor } from './utils'
import { Carta } from './components/Card'
import './App.css'

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
    // console.log('recogerTesoro', 'turnoActual', turnoActual)
    let tesoros = turnoActual.filter(tesoro => esCartaDeTesoro(tesoro) || esCartaDePergaminoDeLuz(tesoro) || esCartaDeValor(tesoro))
    // console.log('recogerTesoro', 'tesoros', tesoros)
    console.log('recogerTesoro', 'comprobar que queda por lo menos 1 carta, si no hay que descartar el de menor valor')
    // if () {

    // }
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

    console.log('handleGame', 'ultimaCarta', ultimaCarta)
    console.log('handleGame', 'contador', contador)
    console.log('handleGame', 'encuentro', encuentro)
    console.log('handleGame', 'desafio', desafio)
    console.log('handleGame', 'accion', accion)

    if (puntosVida < 2) {
      setMensaje(`Has muerto. Has perdido`)
      return
    }

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
    // let palo = carta.slice(-1)
    // console.log('valor', valor)
    // console.log('palo', palo)

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
      setMensaje(`Acabas de morir. Has perdido`)
      return
    }

    console.log('handleCarta', carta)
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
        <div className="antorchas">
          Antorchas
          <div className="flex border-2">
            {
              antorchas.map((antorcha, index_antorcha) => {
                let key = 'antorcha_' + index_antorcha
                return (
                  <Carta key={key} carta={antorcha} />
                )
              })
            }
          </div>
        </div>
        <div className="turnos">
          Turnos
          <div className="flex border-2">
            {
              turnos.map((turno, index_turno) => {
                let key = 'turno_' + index_turno
                return (
                  <div key={key} className="turno flex border-2">
                    {turno.map((carta, index_carta) => {
                      let key = 'carta_' + index_turno + '_' + index_carta
                      return (
                        <Carta key={key} carta={carta} />
                      )
                    })}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="mano">
          Mano
          <div className="flex border-2">
            {
              mano.map((carta_mano, index_carta_mano) => {
                let key = 'carta_mano_' + index_carta_mano
                return (
                  <Carta key={key} carta={carta_mano} handleClick={handleCarta} />
                )
              })
            }
          </div>
        </div>
        <div className="turno-actual">
          Turno actual
          <div className="flex border-2">
            {
              turnoActual.map((carta_turno_actual, index_carta_turno_actual) => {
                let key = 'carta_turno_actual_' + index_carta_turno_actual
                return (
                  <Carta key={key} carta={carta_turno_actual} />
                )
              })
            }
          </div>
        </div>
        <div className="puntos-vida">
          Puntos de vida
          <div className="flex border-2">
            {puntosVida}
          </div>
        </div>
        <button onClick={handleGame}>
          Baraja
        </button>
        { ultimaCarta && (
          <div className="inline-block">
            <Carta carta={ultimaCarta} />
          </div>
        )
        }
        <p>
          Mensaje: {mensaje}
        </p>
        <p>
          Accion: {accion}
        </p>
      </div>
    </>
  )
}

export default App
