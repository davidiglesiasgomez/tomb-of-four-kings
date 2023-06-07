import { useState } from 'react'
import './App.css'

const baraja_inicial = ['5♦', '3♠', 'Q♣', 'J♠', '9♣', 'A♦', '3♣', '2♦', '4♦', '8♦',
'10♠', '9♠', 'K♠', 'A♥', '5♠', 'J♥', '3♦', 'K♦', '4♠', 'Jk', '6♦', '5♣', 'K♣',
'Q♠', '7♠', '2♠', '8♠', 'J♦', 'A♣', 'A♠', '8♣', 'Q♦', '6♠', '10♦', 'K♥', '6♣',
'9♦', '2♣', '7♣', '4♣', '10♣', 'J♣', '7♦', 'Q♥']

const puntos_vida_iniciales = ['10♥', '9♥', '8♥', '7♥', '6♥', '5♥', '4♥', '3♥', '2♥']

const antorchas_iniciales = ['1♥', '1♦', '1♣', '1♠']

function App() {
  const [baraja, setBaraja] = useState(baraja_inicial)
  const [antorchas, setAntorchas] = useState(antorchas_iniciales)
  const [turnos, setTurnos] = useState([])
  const [contador, setContador] = useState(0)
  // const [turno, setTurno] = useState([])
  const [mano, setMano] = useState([])
  const [ultima_carta, setUltimaCarta] = useState('&nbsp;')

  const handleGame = () => {
    console.log('game')

    let temp = [...baraja]
    const carta = temp.shift()
    setBaraja(temp)

    setUltimaCarta(carta)

    let valor = carta.slice(0, -1)
    let palo = carta.slice(-1)
    console.log('valor', valor)
    console.log('palo', palo)

    temp = [...turnos]
    if (typeof temp[contador] === 'undefined') {
      temp[contador] = []
    }
    temp[contador].push(carta)
    console.log('temp', temp)
    setTurnos(temp)

  }

  console.log('aqui');

  return (
    <>
      <h1 className="text-3xl font-bold underline">Tomb of Four Kings</h1>
      <div className="game">
        <div className="antorchas flex border-2">
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
          {
            turnos.map((turno, index_turno) => {
              let key = 'turno_' + index_turno
              console.log('key', key)
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

        <button onClick={handleGame}>
          Deck
        </button>
        <button>
          {ultima_carta}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
