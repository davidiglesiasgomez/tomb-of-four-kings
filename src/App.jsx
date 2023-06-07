import { useState } from 'react'
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
  const [ultimaCarta, setUltimaCarta] = useState('\u00A0')
  const [favorDivino, setFavorDivino] = useState(false)
  const [puntosVida, setPuntosVida] = useState(10)
  const [mensaje, setMensaje] = useState('')

  const tipoCarta = (carta) => {
    if (carta === 'Jk') {
      return 'Pergamino de luz'
    }
    if (carta === 'J♠') {
      return 'Volverse berseker';
    }
    if (carta === 'J♣') {
      return 'Abrir cerradura';
    }
    if (carta === 'J♥') {
      return 'Esquivar golpe';
    }
    let valor = carta.slice(0, -1)
    let palo = carta.slice(-1)
    if (valor === 'A') {
      return `Antorcha ${palo}`
    }
    if (valor === 'K') {
      return `Tesoro ${palo}`
    }
    if (valor === 'Q') {
      return `Favor divino ${palo}`
    }
    if (palo === '♠') {
      return `Monstruo ${valor}`
    }
    if (palo === '♦') {
      return `Trampa ${valor}`
    }
    if (palo === '♣') {
      return `Puerta cerrada ${valor}`
    }
    return '';
  }

  const esCartaDeEncuentro = (carta) => {
    let valor = carta.slice(0, -1)
    let palo = carta.slice(-1)
    return ( ['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(valor) && ['♦', '♠', '♣'].includes(palo) ? true : false )
  }

  const esCartaDeAccion = (carta) => esCartaDeEncuentro(carta)

  const esCartaDeAntorcha = (carta) => {
    let valor = carta.slice(0, -1)
    return ( valor === 'A' ? true : false )
  }

  const esCartaDeHabilidad = (carta) => {
    let valor = carta.slice(0, -1)
    if (carta == 'Jk') return false
    return ( valor === 'J' ? true : false )
  }

  const esCartaDeTesoro = (carta) => {
    let valor = carta.slice(0, -1)
    return ( valor === 'K' ? true : false )
  }

  const esCartaDeFavorDivino = (carta) => {
    let valor = carta.slice(0, -1)
    return ( valor === 'Q' ? true : false )
  }

  const esCartaDePergaminoDeLuz = (carta) => {
    return ( carta === 'Jk' ? true : false )
  }

  const esCartaDeValor = (carta) => {
    let valor = carta.slice(0, -1)
    let palo = carta.slice(-1)
    return ( ['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(valor) && '♦' === palo ? true : false )

  }

//   const continuarTurno = () => {
//     setAccion(0)
//   }

  const terminarTurno = () => {
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

  const handleGame = () => {
    let temp = null

    console.log('handleGame', 'ultimaCarta', ultimaCarta)
    console.log('handleGame', 'contador', contador)
    console.log('handleGame', 'encuentro', encuentro)
    console.log('handleGame', 'desafio', desafio)
    console.log('handleGame', 'accion', accion)

    if (encuentro !== '' && (accion !== 0 || favorDivino)) {
        console.log(`Tenemos encuentro y accion`)
        if (encuentro.includes('Monstruo')) {
            if (desafio<=accion || favorDivino) {
                setMensaje(`Maté al monstruo`)
                recogerTesoro()
                terminarTurno()
            } else {
                setMensaje(`El monstruo me atacó y perdí ${desafio-accion} puntos de vida`)
                setPuntosVida(puntosVida => puntosVida - desafio + accion)
                // continuarTurno()
                setAccion(0)
            }
        }
        if (encuentro.includes('Trampa')) {
            if (desafio<=accion || favorDivino) {
                setMensaje(`Desactivé la trampa`)
                recogerTesoro()
                terminarTurno()
            } else {
                setMensaje(`Se activó la trampa y perdí ${desafio-accion} puntos de vida`)
                setPuntosVida(puntosVida => puntosVida - desafio + accion)
                terminarTurno()
            }
        }
        if (encuentro.includes('Puerta cerrada')) {
            if (desafio<=accion || favorDivino) {
                setMensaje(`Abrí la puerta`)
                recogerTesoro()
                terminarTurno()
            } else {
                setMensaje(`No pude abrir la puerta`)
                descartarCartas(desafio-accion)
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

    temp = [...turnoActual]
    temp.push(carta)
    setTurnoActual(temp)

    if (esCartaDeAntorcha(carta)) {
        setMensaje(`Me acaba de arder una antorcha`)
        temp = [...antorchas]
        temp.push(carta)
        setAntorchas(temp)
    }
    if (esCartaDeHabilidad(carta)) {
        setMensaje(`Me acabo de encontrar una nueva habilidad "${tipoCarta(carta)}"`)
        temp = [...mano]
        temp.push(carta)
        setMano(temp)
    }
    if (esCartaDeTesoro(carta)) {
        //
    }
    if (esCartaDeFavorDivino(carta)) {
        setMensaje(`La diosa me bendice con el favor divino`)
        setFavorDivino(true)
    }
    if (esCartaDePergaminoDeLuz(carta)) {
        //
    }
    if (encuentro === '' && esCartaDeEncuentro(carta)) {
        setMensaje(`Me acabo de encontrar ${tipoCarta(carta)}`)
        setEncuentro(tipoCarta(carta))
        setDesafio(valor)
    }
    if (encuentro !== '' && esCartaDeAccion(carta)) {
        setAccion(valor)
    }

    temp = [...turnos]
    if (typeof temp[contador] === 'undefined') {
      temp[contador] = []
    }
    temp[contador].push(carta)
    setTurnos(temp)

  }

  const handleCarta = (carta) => {
    console.log('handleCarta', carta)
    if (encuentro.includes('Monstruo') && carta === 'J♠') {
        setMensaje(`Mato al monstruo con mi habilidad especial de volverse berseker`)
        setMano(mano => mano.filter(item => item !== 'J♠'))
        // setTurnos(turnos => turnos[contador].concat('J♠'))
        recogerTesoro()
        terminarTurno()
        return
    }
    if (encuentro.includes('Trampa') && carta === 'J♦') {
        setMensaje(`Desactivo el mecanismo con mi habilidad especial de desactivar trampas`)
        setMano(mano => mano.filter(item => item !== 'J♦'))
        // setTurnos(turnos => turnos[contador].concat('J♦'))
        recogerTesoro()
        terminarTurno()
        return
    }
    if (encuentro.includes('Puerta cerrada') && carta === 'J♣') {
        setMensaje(`Abro la puerta con mi habilidad especial de abrir cerraduras`)
        setMano(mano => mano.filter(item => item !== 'J♣'))
        // setTurnos(turnos => turnos[contador].concat('J♣'))
        recogerTesoro()
        terminarTurno()
        return
    }
    setMensaje(`No tiene sentido usar esa carta`)
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Tomb of Four Kings</h1>
      <div className="game">
        <div className="antorchas flex border-2">
          Antorchas
          {
            antorchas.map((antorcha, index_antorcha) => {
              let key = 'antorcha_' + index_antorcha
              return (
                <div key={key} className="antorcha">
                  {antorcha}
                </div>
              )
            })
          }
        </div>
        <div className="turnos flex">
          Turnos
          {
            turnos.map((turno, index_turno) => {
              let key = 'turno_' + index_turno
              return (
                <div key={key} className="turno flex border-2">
                  {turno.map((carta, index_carta) => {
                    let key = 'carta_' + index_turno + '_' + index_carta
                    return (
                      <div key={key} className="carta">
                        {carta}
                      </div>
                    )
                  })}
                </div>
              )
            })
          }
        </div>
        <div className="turno-actual flex border-2">
          Mano
          {
            mano.map((carta_mano, index_carta_mano) => {
              let key = 'carta_mano_' + index_carta_mano
              return (
                <button key={key} className="carta_mano" onClick={() => handleCarta(carta_mano)} title={tipoCarta(carta_mano)}>
                  {carta_mano}
                </button>
              )
            })
          }
        </div>
        <div className="turno-actual flex border-2">
          Turno actual
          {
            turnoActual.map((carta_turno_actual, index_carta_turno_actual) => {
              let key = 'carta_turno_actual_' + index_carta_turno_actual
              return (
                <div key={key} className="carta_turno_actual">
                  {carta_turno_actual}
                </div>
              )
            })
          }
        </div>
        <div className="puntos-vida flex border-2">
            Puntos de vida {puntosVida}
        </div>
        <button onClick={handleGame}>
          Deck
        </button>
        <button>
          {ultimaCarta}
        </button>
        <p>
          {/* Turno: {contador} Carta: {tipoCarta(ultimaCarta)} Encuentro: {encuentro} Desafio: {desafio} Accion: {accion} Favor divino: { favorDivino ? 'Si' : 'No' } Puntos de vida: {puntosVida} */}
        </p>
        <p>
          Mensaje: {mensaje}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
