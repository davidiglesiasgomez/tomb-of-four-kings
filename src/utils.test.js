import { describe, it } from 'node:test'
import assert from 'node:assert'
import { tipoCarta, valorCarta, recogerTesoro, jugar, descartarCartas, pasarCartaAlTurno, marcarRetorno, sacarCarta, quitarCartaDeMano, continuarTurno, terminarTurno, resetearJuego } from './utils.js'

describe('Tests para la funcion tipoCarta', () => {
  it('Si la carta es Jk, Pergamino de luz', () => {
    assert.equal(tipoCarta('Jk'), 'Pergamino de luz')
  })
  it('Si la carta es J♠, Volverse berseker', () => {
    assert.equal(tipoCarta('J♠'), 'Volverse berseker')
  })
  it('Si la carta es J♦, Desactivar mecanismos', () => {
    assert.equal(tipoCarta('J♦'), 'Desactivar mecanismos')
  })
  it('Si la carta es J♣, Abrir cerraduras', () => {
    assert.equal(tipoCarta('J♣'), 'Abrir cerraduras')
  })
  it('Si la carta es J♥, Esquivar golpe', () => {
    assert.equal(tipoCarta('J♥'), 'Esquivar golpe')
  })
  it('Si la carta es A, Antorcha', () => {
    ['A♥', 'A♠', 'A♦', 'A♣'].forEach(value => {
      assert.match(tipoCarta(value), /Antorcha/)
    })
  })
  it('Si la carta es K, Tesoro', () => {
    ['K♥', 'K♠', 'K♦', 'K♣'].forEach(value => {
      assert.match(tipoCarta(value), /Tesoro/)
    })
  })
  it('Si la carta es Q, Favor divino', () => {
    ['Q♥', 'Q♠', 'Q♦', 'Q♣'].forEach(value => {
      assert.match(tipoCarta(value), /Favor divino/)
    })
  })
  it('Si la carta es ♠ (pero no A, J, Q, K), monstruo', () => {
    ['2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠'].forEach(value => {
      assert.match(tipoCarta(value), /monstruo/)
    })
  })
  it('Si la carta es ♦ (pero no A, J, Q, K), trampa', () => {
    ['2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦'].forEach(value => {
      assert.match(tipoCarta(value), /trampa/)
    })
  })
  it('Si la carta es ♣ (pero no A, J, Q, K), puerta cerrada', () => {
    ['2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣'].forEach(value => {
      assert.match(tipoCarta(value), /puerta cerrada/)
    })
  })
  it('Si la carta es ♠ y A, J, Q, K, no es monstruo', () => {
    ['A♠', 'J♠', 'Q♠', 'K♠'].forEach(value => {
      assert.doesNotMatch(tipoCarta(value), /monstruo/)
    })
  })
  it('Si la carta es ♦ y A, J, Q, K, no es trampa', () => {
    ['A♦', 'J♦', 'Q♦', 'K♦'].forEach(value => {
      assert.doesNotMatch(tipoCarta(value), /trampa/)
    })
  })
  it('Si la carta es ♣ y A, J, Q, K, no es puerta cerrada', () => {
    ['A♣', 'J♣', 'Q♣', 'K♣'].forEach(value => {
      assert.doesNotMatch(tipoCarta(value), /puerta cerrada/)
    })
  })
})

describe('Tests para la funcion valorCarta', () => {
  [{
    carta: 'Jk',
    valor: 6
  }].forEach(item => {
    it(`La carta ${item.carta} tiene que valer ${item.valor}`, () => {
      assert.equal(valorCarta(item.carta), item.valor)
    })
  })
  it('Si la carta es K, tiene que vale 10', () => {
    ['K♥', 'K♠', 'K♦', 'K♣'].forEach(value => {
      assert.equal(valorCarta(value), 10)
    })
  })
  it('Si la carta es ♦ (pero no A, J, Q, K), tiene que valer su cifra', () => {
    ['2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦'].forEach(value => {
      assert.equal(valorCarta(value), /[0-9]+/.exec(value))
    })
  });
  it(`El resto de cartas tienen que valer 0`, () => {
    ['A♥', 'A♠', 'A♦', 'A♣'].forEach(value => {
      assert.equal(valorCarta(value), 0)
    })
  })
})

describe('Tests para la funcion recogerTesoro', () => {
  it(`Si el turno no tiene nada, devuelve vacio`, () => {
    let juegoObj = {}
    juegoObj.turnos = [[]]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, [])
  })
  it(`Si el turno no tiene tesoros que recoger, devuelve vacio`, () => {
    let juegoObj = {}
    juegoObj.turnos = [['A♥']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, [])
    juegoObj.turnos = [['2♠', '8♠', '9♠', '4♣', '5♣', '6♣', '9♣', '10♣']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, [])
    juegoObj.turnos = [['A♥', 'A♠', 'A♦', 'A♣', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, [])
  })
  it(`Si el turno solo tiene una carta y es un tesoro, devuelve vacio`, () => {
    let juegoObj = {}
    juegoObj.turnos = [['2♦']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, [])
    juegoObj.turnos = [['7♦']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, [])
    juegoObj.turnos = [['10♦']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, [])
    juegoObj.turnos = [['K♦']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, [])
    juegoObj.turnos = [['Jk']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, [])
  })
  it(`Si el turno solo tiene cartas de tesoro, tiene que descartar la de menor valor y devolver el resto`, () => {
    let juegoObj = {}
    juegoObj.turnos = [['7♦', '2♦', 'Jk']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, ['7♦', 'Jk'])
    juegoObj.turnos = [['2♦', 'Jk', '7♦']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, ['Jk', '7♦'])
  })
  it(`Si el turno tiene una o más cartas que no sean tesoro, descartarlas`, () => {
    let juegoObj = {}
    juegoObj.turnos = [['A♣', '2♠', '7♦', '2♦', 'Jk']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, ['7♦', '2♦', 'Jk'])
    juegoObj.turnos = [['2♦', 'Jk', 'A♣', '2♠', '7♦']]
    juegoObj.contador = 0
    juegoObj.mano = []
    assert.deepEqual(recogerTesoro(juegoObj).mano, ['2♦', 'Jk', '7♦'])
  })
})

describe('Tests para la funcion jugar', () => {
  it(`Si no hay más cartas en el mazo no se debería hacer nada`, () => {
    let juegoObj = {}
    juegoObj.baraja = []
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.carta, '')
    assert.equal(expected.turnos, undefined)
  })
  it(`Se saca la siguiente carta del mazo. Si no pasa nada, se pasa la carta al turno y nada más`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥']
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.carta, '2♥')
    assert.equal(expected.turnos[expected.contador].includes('2♥'), true)
  })
  it(`Si hay 5 cartas en antorchas, se pierde`, () => {
    let juegoObj = {}
    juegoObj.baraja = []
    juegoObj.antorchas = ['A♥', 'A♠', 'A♦', 'A♣', 'Jk']
    let expected = jugar(juegoObj)
    assert.equal(expected.fin, true)
    assert.equal(expected.mensaje, `La última antorcha se consumió. Has perdido`)
  })
  it(`Si hay 4 cartas en antorchas y ninguna es el pergamino de luz, se pierde`, () => {
    let juegoObj = {}
    juegoObj.baraja = []
    juegoObj.antorchas = ['A♥', 'A♠', 'A♦', 'A♣']
    let expected = jugar(juegoObj)
    assert.equal(expected.fin, true)
    assert.equal(expected.mensaje, `La última antorcha se consumió. Has perdido`)
  })
  it(`Si hay 4 cartas en antorchas y una es el pergamino de luz, no pasa nada`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥']
    juegoObj.antorchas = ['A♥', 'A♠', 'A♦', 'Jk']
    let expected = jugar(juegoObj)
    assert.equal(expected.fin, false)
  })
  it(`Si los puntos de vida bajan de 2, se pierde`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥']
    juegoObj.antorchas = []
    juegoObj.puntosVida = 1
    let expected = jugar(juegoObj)
    assert.equal(expected.fin, true)
    assert.equal(expected.mensaje, `Has muerto. Has perdido`)
  })
  it(`Si los puntos de vida no bajan de 2, no pasa nada`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥']
    juegoObj.antorchas = []
    juegoObj.puntosVida = 2
    let expected = jugar(juegoObj)
    assert.equal(expected.fin, false)
  })
  it(`Si el retornar no está marcado, no pasa nada`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥']
    juegoObj.antorchas = []
    juegoObj.contador = 2
    juegoObj.retornar = 0
    let expected = jugar(juegoObj)
    assert.equal(expected.fin, false)
  })
  it(`Si el retornar está marcado y no se cumple la condición de victoria, no pasa nada`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥']
    juegoObj.antorchas = []
    juegoObj.contador = 2
    juegoObj.retornar = 2
    let expected = jugar(juegoObj)
    assert.equal(expected.fin, false)
  })
  it(`Si el retornar está marcado y se cumple la condición de victoria, se deberia ganar`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥']
    juegoObj.antorchas = []
    juegoObj.tesoro = []
    juegoObj.contador = 3
    juegoObj.retornar = 2
    let expected = jugar(juegoObj)
    assert.equal(expected.fin, true)
    assert.equal(expected.victoria, true)
    assert.equal(expected.mensaje, `Has regresado a la entrada de la tumba. Has ganado. Puntuación 0/0`)
  })
  it(`Si hay un encuentro y sale una carta de acción, se anota la acción`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['3♠']
    juegoObj.encuentro = '2♠'
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.encuentro, '2♠')
    assert.equal(expected.accion, '3♠')
    assert.equal(expected.carta, '3♠')
    assert.match(expected.mensaje, /Contrarresto/)
    assert.equal(expected.turnos[expected.contador].includes('3♠'), true)
    assert.equal(expected.fin, false)
  })
  it(`Si hay un encuentro y no sale una carta de acción, no se anota la acción`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥']
    juegoObj.encuentro = '2♠'
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.encuentro, '2♠')
    assert.equal(expected.accion, '')
  })
  it(`Si no hay un encuentro y no sale una carta de encuentro, no se anota el encuentro`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥']
    juegoObj.encuentro = ''
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.encuentro, '')
  })
  it(`Si no hay un encuentro y sale una carta de encuentro, se anota el encuentro`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♠']
    juegoObj.encuentro = ''
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.encuentro, '2♠')
  })
  it(`Si sale la carta de pergamino de luz, se avisa`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['Jk']
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.mensaje, `Ha aparecido el pergamino de luz`)
  })
  it(`Si sale la carta de favor divino, se avisa y se anota`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['Q♥']
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.favorDivino, true)
    assert.equal(expected.mensaje, `La diosa me bendice con el favor divino`)
  })
  it(`Si sale una carta de tesoro, se avisa`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['K♥']
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.mensaje, `Ha aparecido un tesoro de los reyes`)
  })
  it(`Si sale una carta de habilidad, se avisa y se pasa a la mano`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['J♥']
    juegoObj.mano = []
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.deepEqual(expected.mano, ['J♥'])
    assert.equal(expected.turnos, undefined)
    assert.equal(expected.mensaje, `Me acabo de encontrar una nueva habilidad <carta> <tipo>`.replace('<carta>', 'J♥').replace('<tipo>', tipoCarta('J♥')))
  })
  it(`Si sale una carta de antorcha, y no es la última, se avisa y se pasa a las antorchas`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['A♥']
    juegoObj.antorchas = []
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.deepEqual(expected.antorchas, ['A♥'])
    assert.equal(expected.mensaje, `Me acaba de arder una antorcha`)
  })
  it(`Si sale una carta de antorcha, y es la última, se avisa y se pasa a las antorchas`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['A♥']
    juegoObj.antorchas = ['A♠', 'A♦', 'A♣']
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.deepEqual(expected.antorchas, ['A♠', 'A♦', 'A♣', 'A♥'])
    assert.equal(expected.mensaje, `Me acaba de arder la última antorcha`)
  })
  it(`Si sale la última carta de antorcha, pero se tiene el pergamino de luz en la mano, se avisa, se pasa el pergamino de luz a las antorchas y se devuelve la antorcha al final de la baraja`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['A♥', '2♥']
    juegoObj.antorchas = ['A♠', 'A♦', 'A♣']
    juegoObj.mano = ['Jk']
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, ['2♥', 'A♥'])
    assert.deepEqual(expected.antorchas, ['A♠', 'A♦', 'A♣', 'Jk'])
    assert.deepEqual(expected.mano, []) // Revisar resultado que en algunos casos no es correcto por el orden
    assert.equal(expected.mensaje, `La última antorcha se iba a consumir. Por suerte, posees el pergamino de luz. La última antorcha pasa al fondo del mazo de cartas`)
  })
  it(`Si hay encuentro de monstruo y favor divino, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♠'
    juegoObj.favorDivino = true
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.mano, []) // Revisar resultado que en algunos casos no es correcto por el orden
    assert.match(expected.mensaje, /monstruo/)
    assert.match(expected.mensaje, /divino/)
    assert.match(expected.mensaje, /Finaliza el turno/)
    assert.equal(expected.contador, 1)
    assert.equal(expected.favorDivino, false)
    assert.equal(expected.encuentro, '')
    assert.equal(expected.accion, '')
  })
  it(`Si hay encuentro de trampa y favor divino, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♦'
    juegoObj.favorDivino = true
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.mano, []) // Revisar resultado que en algunos casos no es correcto por el orden
    assert.match(expected.mensaje, /trampa/)
    assert.match(expected.mensaje, /divino/)
    assert.match(expected.mensaje, /Finaliza el turno/)
    assert.equal(expected.contador, 1)
    assert.equal(expected.favorDivino, false)
    assert.equal(expected.encuentro, '')
    assert.equal(expected.accion, '')
  })
  it(`Si hay encuentro de puerta y favor divino, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♣'
    juegoObj.favorDivino = true
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.mano, []) // Revisar resultado que en algunos casos no es correcto por el orden
    assert.match(expected.mensaje, /puerta/)
    assert.match(expected.mensaje, /divino/)
    assert.match(expected.mensaje, /Finaliza el turno/)
    assert.equal(expected.contador, 1)
    assert.equal(expected.favorDivino, false)
    assert.equal(expected.encuentro, '')
    assert.equal(expected.accion, '')
  })
  it(`Si hay encuentro de monstruo y la accion es mayor o igual, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♠'
    juegoObj.accion = '3♠'
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.mano, []) // Revisar resultado que en algunos casos no es correcto por el orden
    assert.match(expected.mensaje, /monstruo/)
    assert.match(expected.mensaje, /acción/)
    assert.match(expected.mensaje, /Finaliza el turno/)
    assert.equal(expected.contador, 1)
    assert.equal(expected.favorDivino, false)
    assert.equal(expected.encuentro, '')
    assert.equal(expected.accion, '')
  })
  it(`Si hay encuentro de trampa y la accion es mayor o igual, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♦'
    juegoObj.accion = '3♦'
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.mano, []) // Revisar resultado que en algunos casos no es correcto por el orden
    assert.match(expected.mensaje, /trampa/)
    assert.match(expected.mensaje, /acción/)
    assert.match(expected.mensaje, /Finaliza el turno/)
    assert.equal(expected.contador, 1)
    assert.equal(expected.favorDivino, false)
    assert.equal(expected.encuentro, '')
    assert.equal(expected.accion, '')
  })
  it(`Si hay encuentro de puerta y la accion es mayor o igual, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♣'
    juegoObj.accion = '3♣'
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.mano, []) // Revisar resultado que en algunos casos no es correcto por el orden
    assert.match(expected.mensaje, /puerta/)
    assert.match(expected.mensaje, /acción/)
    assert.match(expected.mensaje, /Finaliza el turno/)
    assert.equal(expected.contador, 1)
    assert.equal(expected.favorDivino, false)
    assert.equal(expected.encuentro, '')
    assert.equal(expected.accion, '')
  })
  it(`Si hay encuentro de monstruo y la accion es menor, se pierden puntos de vida y continua el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '4♠'
    juegoObj.accion = '2♠'
    juegoObj.puntosVida = 10
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.mano, []) // Revisar resultado que en algunos casos no es correcto por el orden
    assert.equal(expected.puntosVida, 8)
    assert.match(expected.mensaje, /monstruo/)
    assert.match(expected.mensaje, /puntos de vida/)
    assert.match(expected.mensaje, /Continua el turno/)
    assert.equal(expected.accion, '')
  })
  it(`Si hay encuentro de trampa y la accion es menor, se pierden puntos de vida y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '4♦'
    juegoObj.accion = '2♦'
    juegoObj.puntosVida = 10
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.mano, []) // Revisar resultado que en algunos casos no es correcto por el orden
    assert.equal(expected.puntosVida, 8)
    assert.match(expected.mensaje, /trampa/)
    assert.match(expected.mensaje, /puntos de vida/)
    assert.match(expected.mensaje, /Finaliza el turno/)
    assert.equal(expected.contador, 1)
    assert.equal(expected.favorDivino, false)
    assert.equal(expected.encuentro, '')
    assert.equal(expected.accion, '')
  })
  it(`Si hay encuentro de puerta y la accion es menor, se descartan cartas y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥', '3♥', '4♥', '5♥']
    juegoObj.encuentro = '4♣'
    juegoObj.accion = '2♣'
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.mano, []) // Revisar resultado que en algunos casos no es correcto por el orden
    assert.equal(expected.baraja.length, 2)
    assert.deepEqual(expected.baraja, ['4♥', '5♥'])
    assert.deepEqual(expected.antorchas, [])
    assert.match(expected.mensaje, /puerta/)
    assert.match(expected.mensaje, /cartas/)
    assert.match(expected.mensaje, /Finaliza el turno/)
    assert.equal(expected.contador, 1)
    assert.equal(expected.favorDivino, false)
    assert.equal(expected.encuentro, '')
    assert.equal(expected.accion, '')
  })
  it(`Si hay encuentro de puerta y la accion es menor, se descartan cartas y se termina el turno, pero si hay una antorcha, se pasa a las antorchas`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥', 'A♥', '4♥', '5♥']
    juegoObj.encuentro = '4♣'
    juegoObj.accion = '2♣'
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.mano, []) // Revisar resultado que en algunos casos no es correcto por el orden
    assert.equal(expected.baraja.length, 2)
    assert.deepEqual(expected.baraja, ['4♥', '5♥'])
    assert.deepEqual(expected.antorchas, ['A♥'])
    assert.match(expected.mensaje, /puerta/)
    assert.match(expected.mensaje, /cartas/)
    assert.match(expected.mensaje, /Finaliza el turno/)
    assert.equal(expected.contador, 1)
    assert.equal(expected.favorDivino, false)
    assert.equal(expected.encuentro, '')
    assert.equal(expected.accion, '')
  })
})

describe('Tests para la funcion descartarCartas', () => {
  let juegoObj = {}
  it(`Si se indican 0 cartas para descartar, se devuelve lo mismo`, () => {
    juegoObj.baraja = []
    juegoObj.antorchas = []
    juegoObj.descartadas = []
    juegoObj = descartarCartas(juegoObj, 0)
    assert.deepEqual(juegoObj.baraja, [])
    assert.deepEqual(juegoObj.antorchas, [])
    assert.deepEqual(juegoObj.descartadas, [])
    juegoObj.baraja = ['A♥', '2♥', '3♥', 'K♥']
    juegoObj.antorchas = []
    juegoObj.descartadas = []
    juegoObj = descartarCartas(juegoObj, 0)
    assert.deepEqual(juegoObj.baraja, ['A♥', '2♥', '3♥', 'K♥'])
    assert.deepEqual(juegoObj.antorchas, [])
    assert.deepEqual(juegoObj.descartadas, [])
  })
  it(`Si se indican varias cartas para descartar, pero baraja está vacía, se devuelve lo mismo`, () => {
    juegoObj.baraja = []
    juegoObj.antorchas = []
    juegoObj.descartadas = []
    juegoObj = descartarCartas(juegoObj, 3)
    assert.deepEqual(juegoObj.baraja, [])
    assert.deepEqual(juegoObj.antorchas, [])
    assert.deepEqual(juegoObj.descartadas, [])
    juegoObj.baraja = []
    juegoObj.antorchas = []
    juegoObj.descartadas = []
    juegoObj = descartarCartas(juegoObj, 10)
    assert.deepEqual(juegoObj.baraja, [])
    assert.deepEqual(juegoObj.antorchas, [])
    assert.deepEqual(juegoObj.descartadas, [])
  })
  it(`Se indican varias cartas para descartar y no hay antorchas en las descartadas`, () => {
    juegoObj.baraja = ['2♥', '3♥', '4♥', 'K♥']
    juegoObj.antorchas = ['A♥']
    juegoObj.descartadas = ['10♥']
    juegoObj = descartarCartas(juegoObj, 1)
    assert.deepEqual(juegoObj.baraja, ['3♥', '4♥', 'K♥'])
    assert.deepEqual(juegoObj.antorchas, ['A♥'])
    assert.deepEqual(juegoObj.descartadas, ['10♥', '2♥'])
    juegoObj.baraja = ['2♥', '3♥', '4♥', 'K♥']
    juegoObj.antorchas = ['A♥']
    juegoObj.descartadas = ['10♥']
    juegoObj = descartarCartas(juegoObj, 3)
    assert.deepEqual(juegoObj.baraja, ['K♥'])
    assert.deepEqual(juegoObj.antorchas, ['A♥'])
    assert.deepEqual(juegoObj.descartadas, ['10♥', '2♥', '3♥', '4♥'])
  })
  it(`Se indican varias cartas para descartar y hay antorchas en las descartadas, hay que pasarlas a las antorchas`, () => {
    juegoObj.baraja = ['A♥', '2♥', '3♥', '4♥', 'K♥']
    juegoObj.antorchas = ['A♦']
    juegoObj.descartadas = ['10♥']
    juegoObj = descartarCartas(juegoObj, 1)
    assert.deepEqual(juegoObj.baraja, ['2♥', '3♥', '4♥', 'K♥'])
    assert.deepEqual(juegoObj.antorchas, ['A♦', 'A♥'])
    assert.deepEqual(juegoObj.descartadas, ['10♥'])
    juegoObj.baraja = ['2♥', 'A♥', '3♥', '4♥', 'K♥']
    juegoObj.antorchas = ['A♦']
    juegoObj.descartadas = ['10♥']
    juegoObj = descartarCartas(juegoObj, 3)
    assert.deepEqual(juegoObj.baraja, ['4♥', 'K♥'])
    assert.deepEqual(juegoObj.antorchas, ['A♦', 'A♥'])
    assert.deepEqual(juegoObj.descartadas, ['10♥', '2♥', '3♥'])
  })
})

describe('Tests para la funcion pasarCartaAlTurno', () => {
  let juegoObj = {}
  it(`Si no se indica carta, se devuelve lo mismo`, () => {
    juegoObj.turnos = []
    assert.deepEqual(pasarCartaAlTurno(juegoObj).turnos, [])
    juegoObj.turnos = [[]]
    assert.deepEqual(pasarCartaAlTurno(juegoObj).turnos, [[]])
    juegoObj.turnos = [['A♥', '2♥'], ['3♥', '4♥']]
    assert.deepEqual(pasarCartaAlTurno(juegoObj).turnos, [['A♥', '2♥'], ['3♥', '4♥']])
  })
  it(`Si se indica carta, se tiene que insertar en el turno en curso`, () => {
    juegoObj.turnos = [['A♥']]
    juegoObj.contador = 0
    assert.deepEqual(pasarCartaAlTurno(juegoObj, 'K♥').turnos, [['A♥', 'K♥']])
    juegoObj.turnos = [['A♥', '2♥'], ['3♥', '4♥']]
    juegoObj.contador = 1
    assert.deepEqual(pasarCartaAlTurno(juegoObj, 'K♥').turnos, [['A♥', '2♥'], ['3♥', '4♥', 'K♥']])
  })
  it(`Si se indica carta, se tiene que insertar en el turno en curso y si no hay turno, inicializarlo`, () => {
    juegoObj.turnos = []
    juegoObj.contador = 0
    assert.deepEqual(pasarCartaAlTurno(juegoObj, 'K♥').turnos, [['K♥']])
    juegoObj.turnos = [['A♥', '2♥']]
    juegoObj.contador = 1
    assert.deepEqual(pasarCartaAlTurno(juegoObj, 'K♥').turnos, [['A♥', '2♥'], ['K♥']])
  })
})

describe('Tests para la funcion marcarRetorno', () => {
  let juegoObj = {}
  it(`Se tiene que haber llegado por lo menos al turno 2`, () => {
    juegoObj.contador = 0
    juegoObj = marcarRetorno(juegoObj)
    assert.equal(juegoObj.retornar, 0)
    assert.match(juegoObj.mensaje, /No puedes retornar porque acabas de empezar/)
    juegoObj.contador = 1
    juegoObj = marcarRetorno(juegoObj)
    assert.equal(juegoObj.retornar, 0)
    assert.match(juegoObj.mensaje, /No puedes retornar porque acabas de empezar/)
    juegoObj.contador = 2
    juegoObj = marcarRetorno(juegoObj)
    assert.equal(juegoObj.retornar, 2)
    assert.match(juegoObj.mensaje, /Empiezas el retorno/)
  })
  it(`Para marcar el retorno, no se puede estar en medio de un turno`, () => {
    juegoObj = {}
    juegoObj.contador = 2
    juegoObj.encuentro = 'A♥'
    juegoObj = marcarRetorno(juegoObj)
    assert.equal(juegoObj.retornar, 0)
    assert.match(juegoObj.mensaje, /No puedes retornar porque estás en medio de un turno/)
    juegoObj = {}
    juegoObj.contador = 2
    juegoObj.accion = 'A♥'
    juegoObj = marcarRetorno(juegoObj)
    assert.equal(juegoObj.retornar, 0)
    assert.match(juegoObj.mensaje, /No puedes retornar porque estás en medio de un turno/)
    juegoObj = {}
    juegoObj.contador = 2
    juegoObj.turnos = []
    juegoObj.turnos[juegoObj.contador] = ['A♥']
    juegoObj = marcarRetorno(juegoObj)
    assert.equal(juegoObj.retornar, 0)
    assert.match(juegoObj.mensaje, /No puedes retornar porque estás en medio de un turno/)
    juegoObj = {}
    juegoObj.contador = 2
    juegoObj = marcarRetorno(juegoObj)
    assert.equal(juegoObj.retornar, 2)
    assert.match(juegoObj.mensaje, /Empiezas el retorno/)
  })
})

describe('Tests para la funcion sacarCarta', () => {
  let juegoObj = {}
  it(`Tiene que tener sentido sacar la carta`, () => {
    juegoObj = {}
    juegoObj.encuentro = ''
    juegoObj.mano = ['J♥']
    juegoObj = sacarCarta(juegoObj, 'J♥')
    assert.match(juegoObj.mensaje, /No tiene sentido usar la carta/)
    // assert.equal(juegoObj.turnos, undefined)
    assert.deepEqual(juegoObj.mano, ['J♥'])
  })
  it(`Si el encuentro es de monstruo y la carta es J♠`, () => {
    juegoObj = {}
    juegoObj.encuentro = '2♠'
    juegoObj.mano = ['J♠']
    juegoObj = sacarCarta(juegoObj, 'J♠')
    assert.match(juegoObj.mensaje, /Mato al monstruo con mi habilidad especial de volverse berseker/)
    // assert.equal(juegoObj.turnos[juegoObj.contador].includes('J♠'), true)
    assert.deepEqual(juegoObj.mano, [])
    assert.match(juegoObj.mensaje, /Finaliza el turno/)
    assert.equal(juegoObj.contador, 1)
    assert.equal(juegoObj.favorDivino, false)
    assert.equal(juegoObj.encuentro, '')
    assert.equal(juegoObj.accion, '')
  })
  it(`Si el encuentro es de trampa y la carta es J♦`, () => {
    juegoObj = {}
    juegoObj.encuentro = '2♦'
    juegoObj.mano = ['J♦']
    juegoObj = sacarCarta(juegoObj, 'J♦')
    assert.match(juegoObj.mensaje, /Desactivo el mecanismo con mi habilidad especial de desactivar mecanismos/)
    // assert.equal(juegoObj.turnos[juegoObj.contador].includes('J♦'), true)
    assert.deepEqual(juegoObj.mano, [])
    assert.match(juegoObj.mensaje, /Finaliza el turno/)
    assert.equal(juegoObj.contador, 1)
    assert.equal(juegoObj.favorDivino, false)
    assert.equal(juegoObj.encuentro, '')
    assert.equal(juegoObj.accion, '')
  })
  it(`Si el encuentro es de puerta y la carta es J♣`, () => {
    juegoObj = {}
    juegoObj.encuentro = '2♣'
    juegoObj.mano = ['J♣']
    juegoObj = sacarCarta(juegoObj, 'J♣')
    assert.match(juegoObj.mensaje, /Abro la puerta con mi habilidad especial de abrir cerraduras/)
    // assert.equal(juegoObj.turnos[juegoObj.contador].includes('J♣'), true)
    assert.deepEqual(juegoObj.mano, [])
    assert.match(juegoObj.mensaje, /Finaliza el turno/)
    assert.equal(juegoObj.contador, 1)
    assert.equal(juegoObj.favorDivino, false)
    assert.equal(juegoObj.encuentro, '')
    assert.equal(juegoObj.accion, '')
  })
  it(`Si el encuentro es de monstruo o de trampa y la carta es J♥`, () => {
    juegoObj = {}
    juegoObj.encuentro = '2♠'
    juegoObj.mano = ['J♥']
    juegoObj = sacarCarta(juegoObj, 'J♥')
    assert.match(juegoObj.mensaje, /No me hago daño con mi habilidad especial de esquivar golpe/)
    // assert.equal(juegoObj.turnos[juegoObj.contador].includes('J♥'), true)
    assert.deepEqual(juegoObj.mano, [])
    juegoObj = {}
    juegoObj.encuentro = '2♦'
    juegoObj.mano = ['J♥']
    juegoObj = sacarCarta(juegoObj, 'J♥')
    assert.match(juegoObj.mensaje, /No me hago daño con mi habilidad especial de esquivar golpe/)
    // assert.equal(juegoObj.turnos[juegoObj.contador].includes('J♥'), true)
    assert.deepEqual(juegoObj.mano, [])
  })
  it(`Si el encuentro es de monstruo y la carta es un tesoro o el pergamino de luz, y su valor mayor que el monstruo`, () => {
    juegoObj = {}
    juegoObj.encuentro = '2♠'
    juegoObj.mano = ['K♥']
    juegoObj = sacarCarta(juegoObj, 'K♥')
    assert.match(juegoObj.mensaje, /distraer al monstruo/)
    // assert.equal(juegoObj.turnos[juegoObj.contador].includes('K♥'), true)
    assert.deepEqual(juegoObj.mano, [])
    assert.match(juegoObj.mensaje, /Finaliza el turno/)
    assert.equal(juegoObj.contador, 1)
    assert.equal(juegoObj.favorDivino, false)
    assert.equal(juegoObj.encuentro, '')
    assert.equal(juegoObj.accion, '')
    juegoObj = {}
    juegoObj.encuentro = '2♠'
    juegoObj.mano = ['3♦']
    juegoObj = sacarCarta(juegoObj, '3♦')
    assert.match(juegoObj.mensaje, /distraer al monstruo/)
    // assert.equal(juegoObj.turnos[juegoObj.contador].includes('3♦'), true)
    assert.deepEqual(juegoObj.mano, [])
    assert.match(juegoObj.mensaje, /Finaliza el turno/)
    assert.equal(juegoObj.contador, 1)
    assert.equal(juegoObj.favorDivino, false)
    assert.equal(juegoObj.encuentro, '')
    assert.equal(juegoObj.accion, '')
    juegoObj = {}
    juegoObj.encuentro = '2♠'
    juegoObj.mano = ['Jk']
    juegoObj = sacarCarta(juegoObj, 'Jk')
    assert.match(juegoObj.mensaje, /distraer al monstruo/)
    // assert.equal(juegoObj.turnos[juegoObj.contador].includes('Jk'), true)
    assert.deepEqual(juegoObj.mano, [])
    assert.match(juegoObj.mensaje, /Finaliza el turno/)
    assert.equal(juegoObj.contador, 1)
    assert.equal(juegoObj.favorDivino, false)
    assert.equal(juegoObj.encuentro, '')
    assert.equal(juegoObj.accion, '')
  })
  it(`Si el encuentro es de monstruo y la carta es un tesoro o el pergamino de luz, y su valor menor que el monstruo`, () => {
    juegoObj = {}
    juegoObj.encuentro = '3♠'
    juegoObj.mano = ['2♦']
    juegoObj = sacarCarta(juegoObj, '2♦')
    assert.match(juegoObj.mensaje, /No tiene sentido usar la carta/)
    // assert.equal(juegoObj.turnos, undefined)
    assert.deepEqual(juegoObj.mano, ['2♦'])
    juegoObj = {}
    juegoObj.encuentro = '7♠'
    juegoObj.mano = ['Jk']
    juegoObj = sacarCarta(juegoObj, 'Jk')
    assert.match(juegoObj.mensaje, /No tiene sentido usar la carta/)
    // assert.equal(juegoObj.turnos, undefined)
    assert.deepEqual(juegoObj.mano, ['Jk'])
  })
})

describe('Tests para la funcion quitarCartaDeMano', () => {
  let juegoObj = {}
  it(`Si no se especifica carta, no se quita nada`, () => {
    juegoObj = {}
    juegoObj.mano = []
    juegoObj = quitarCartaDeMano(juegoObj, '')
    assert.deepEqual(juegoObj.mano, [])
    juegoObj = {}
    juegoObj.mano = ['A♥', '2♥', '3♥', 'K♥', 'Jk']
    juegoObj = quitarCartaDeMano(juegoObj, '')
    assert.deepEqual(juegoObj.mano, ['A♥', '2♥', '3♥', 'K♥', 'Jk'])
  })
  it(`Si se especifica una carta que no está, no se quita`, () => {
    juegoObj = {}
    juegoObj.mano = []
    juegoObj = quitarCartaDeMano(juegoObj, 'A♥')
    assert.deepEqual(juegoObj.mano, [])
    juegoObj = {}
    juegoObj.mano = ['2♥', '3♥', 'K♥', 'Jk']
    juegoObj = quitarCartaDeMano(juegoObj, 'A♥')
    assert.deepEqual(juegoObj.mano, ['2♥', '3♥', 'K♥', 'Jk'])
  })
  it(`Si se especifica carta que si está, se quita`, () => {
    juegoObj = {}
    juegoObj.mano = ['A♥']
    juegoObj = quitarCartaDeMano(juegoObj, 'A♥')
    assert.deepEqual(juegoObj.mano, [])
    juegoObj = {}
    juegoObj.mano = ['A♥', '2♥', '3♥', 'K♥', 'Jk']
    juegoObj = quitarCartaDeMano(juegoObj, 'A♥')
    assert.deepEqual(juegoObj.mano, ['2♥', '3♥', 'K♥', 'Jk'])
    juegoObj = {}
    juegoObj.mano = ['2♥', '3♥', 'A♥', 'K♥', 'Jk']
    juegoObj = quitarCartaDeMano(juegoObj, 'A♥')
    assert.deepEqual(juegoObj.mano, ['2♥', '3♥', 'K♥', 'Jk'])
    juegoObj = {}
    juegoObj.mano = ['2♥', '3♥', 'K♥', 'Jk', 'A♥']
    juegoObj = quitarCartaDeMano(juegoObj, 'A♥')
    assert.deepEqual(juegoObj.mano, ['2♥', '3♥', 'K♥', 'Jk'])
  })
})

describe('Tests para la funcion continuarTurno', () => {
  let juegoObj = {}
  it(`Tiene que añadir la coletilla al mensaje y resetear la accion`, () => {
    juegoObj = {}
    juegoObj.mensaje = ''
    juegoObj.accion = 'A♥'
    juegoObj = continuarTurno(juegoObj)
    assert.match(juegoObj.mensaje, /Continua el turno/)
    assert.equal(juegoObj.accion, '')
  })
})

describe('Tests para la funcion terminarTurno', () => {
  let juegoObj = {}
  it(`Tiene que añadir la coletilla al mensaje, aumentar el contador y resetear el encuentro, la accion y el favor divino`, () => {
    juegoObj = {}
    juegoObj.mensaje = ''
    juegoObj.contador = 0
    juegoObj.favorDivino = true
    juegoObj.encuentro = 'A♥'
    juegoObj.accion = 'A♥'
    juegoObj = terminarTurno(juegoObj)
    assert.match(juegoObj.mensaje, /Finaliza el turno/)
    assert.equal(juegoObj.contador, 1)
    assert.equal(juegoObj.favorDivino, false)
    assert.equal(juegoObj.encuentro, '')
    assert.equal(juegoObj.accion, '')
  })
})

describe('Tests de prueba de partida', () => {
  let juegoObj = resetearJuego(['5♦', '3♠', 'Q♣', 'J♠', '9♣', 'A♦', '3♣', '2♦', '4♦', '8♦',
  '10♠', '9♠', 'K♠', 'A♥', '5♠', 'J♥', '3♦', 'K♦', '4♠', 'Jk', '6♦', '5♣', 'K♣',
  'Q♠', '7♠', '2♠', '8♠', 'J♦', 'A♣', 'A♠', '8♣', 'Q♦', '6♠', '10♦', 'K♥', '6♣',
  '9♦', '2♣', '7♣', '4♣', '10♣', 'J♣', '7♦', 'Q♥'])
  it(`Turno #1. Sacar la primera carta que tiene que ser el '5♦'`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '5♦')
    assert.equal(juegoObj.encuentro, '5♦')
  })
  it(`Turno #1. Jugar hasta terminar el turno (se pierden 2 puntos de vida)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '3♠')
    assert.equal(juegoObj.accion, '3♠')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.puntosVida, 8)
  })
  it(`Turno #2. Jugar un turno completo (favor divino, obtener carta berseker, puerta, sin tesoro)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'Q♣')
    assert.equal(juegoObj.favorDivino, true)
    assert.match(juegoObj.mensaje, /favor divino/)
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'J♠')
    assert.match(juegoObj.mensaje, /berseker/)
    assert.deepEqual(juegoObj.mano, ['J♠'])
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '9♣')
    assert.match(juegoObj.mensaje, /puerta/)
    juegoObj = jugar(juegoObj)
    assert.deepEqual(juegoObj.mano, ['J♠'])
    assert.match(juegoObj.mensaje, /favor divino/)
  })
  it(`Turno #3. Jugar otro turno completo (antorcha, puerta, descarte carta)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'A♦')
    assert.match(juegoObj.mensaje, /antorcha/)
    assert.deepEqual(juegoObj.antorchas, ['A♦'])
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '3♣')
    assert.match(juegoObj.mensaje, /puerta/)
    assert.equal(juegoObj.encuentro, '3♣')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '2♦')
    assert.equal(juegoObj.accion, '2♦')
    juegoObj = jugar(juegoObj)
    assert.match(juegoObj.mensaje, /descartan/)
    assert.deepEqual(juegoObj.mano, ['J♠'])
  })
  it(`Turno #4. Nuevo turno completo (trampa, éxito, recoger tesoro)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '8♦')
    assert.match(juegoObj.mensaje, /trampa/)
    assert.equal(juegoObj.encuentro, '8♦')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '10♠')
    assert.equal(juegoObj.accion, '10♠')
    juegoObj = jugar(juegoObj)
    assert.match(juegoObj.mensaje, /trampa/)
    assert.deepEqual(juegoObj.mano, ['J♠', '8♦'])
  })
  it(`Turno #5. Nuevo turno completo (monstruo, usar berseker)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '9♠')
    assert.match(juegoObj.mensaje, /monstruo/)
    assert.equal(juegoObj.encuentro, '9♠')
    juegoObj = sacarCarta(juegoObj, 'J♠')
    assert.match(juegoObj.mensaje, /berseker/)
    assert.deepEqual(juegoObj.mano, ['8♦'])
  })
  it(`Turno #6. Nuevo turno completo (tesoro reyes, antorcha, mountruo, obtener carta evitar golpe, daño, otro tesoro, más daño, pergamino de luz, recoger tesoros)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'K♠')
    assert.match(juegoObj.mensaje, /tesoro/)
    assert.equal(juegoObj.encuentro, '')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'A♥')
    assert.match(juegoObj.mensaje, /antorcha/)
    assert.equal(juegoObj.encuentro, '')
    assert.deepEqual(juegoObj.antorchas, ['A♦', 'A♥'])
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '5♠')
    assert.match(juegoObj.mensaje, /monstruo/)
    assert.equal(juegoObj.encuentro, '5♠')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'J♥')
    assert.match(juegoObj.mensaje, /golpe/)
    assert.deepEqual(juegoObj.mano, ['8♦', 'J♥'])
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '3♦')
    assert.equal(juegoObj.accion, '3♦')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.puntosVida, 6)
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'K♦')
    assert.match(juegoObj.mensaje, /tesoro/)
    assert.equal(juegoObj.encuentro, '5♠')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '4♠')
    assert.equal(juegoObj.accion, '4♠')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.puntosVida, 5)
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'Jk')
    assert.match(juegoObj.mensaje, /pergamino/)
    assert.equal(juegoObj.encuentro, '5♠')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '6♦')
    assert.equal(juegoObj.accion, '6♦')
    juegoObj = jugar(juegoObj)
    assert.match(juegoObj.mensaje, /monstruo/)
    assert.deepEqual(juegoObj.mano, ['8♦', 'J♥', 'K♠', '3♦', 'K♦', 'Jk', '6♦'])
  })
  it(`Turno #7. Nuevo turno completo (puerta, tesoro reyes, favor divino, recoger tesoros)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '5♣')
    assert.match(juegoObj.mensaje, /puerta/)
    assert.equal(juegoObj.encuentro, '5♣')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'K♣')
    assert.match(juegoObj.mensaje, /tesoro/)
    assert.equal(juegoObj.encuentro, '5♣')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'Q♠')
    assert.match(juegoObj.mensaje, /favor divino/)
    assert.equal(juegoObj.encuentro, '5♣')
    juegoObj = jugar(juegoObj)
    assert.deepEqual(juegoObj.mano, ['8♦', 'J♥', 'K♠', '3♦', 'K♦', 'Jk', '6♦', 'K♣'])
  })
  it(`Turno #8. Retirada y nuevo turno completo (monstruo, usar esquivar, soltar tesoro)`, () => {
    juegoObj = marcarRetorno(juegoObj)
    assert.equal(juegoObj.retornar, 7)
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '7♠')
    assert.match(juegoObj.mensaje, /monstruo/)
    assert.equal(juegoObj.encuentro, '7♠')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '2♠')
    assert.equal(juegoObj.accion, '2♠')
    juegoObj = sacarCarta(juegoObj, 'J♥')
    assert.match(juegoObj.mensaje, /esquivar/)
    juegoObj = sacarCarta(juegoObj, '8♦')
    assert.match(juegoObj.mensaje, /distraer/)
    assert.deepEqual(juegoObj.mano, ['K♠', '3♦', 'K♦', 'Jk', '6♦', 'K♣'])
  })
  it(`Turno #9. Nuevo turno completo (monstruo, obtener carta mecanismos, antorcha, otra antorcha, usar pergamino luz)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '8♠')
    assert.match(juegoObj.mensaje, /monstruo/)
    assert.equal(juegoObj.encuentro, '8♠')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'J♦')
    assert.match(juegoObj.mensaje, /mecanismos/)
    assert.deepEqual(juegoObj.mano, ['K♠', '3♦', 'K♦', 'Jk', '6♦', 'K♣', 'J♦'])
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'A♣')
    assert.match(juegoObj.mensaje, /antorcha/)
    assert.deepEqual(juegoObj.antorchas, ['A♦', 'A♥', 'A♣'])
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'A♠')
    assert.match(juegoObj.mensaje, /antorcha/)
    assert.deepEqual(juegoObj.antorchas, ['A♦', 'A♥', 'A♣', 'Jk'])
    assert.deepEqual(juegoObj.mano, ['K♠', '3♦', 'K♦', '6♦', 'K♣', 'J♦'])
    assert.equal(juegoObj.baraja[juegoObj.baraja.length - 1], 'A♠')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '8♣')
    assert.equal(juegoObj.accion, '8♣')
    juegoObj = jugar(juegoObj)
    assert.match(juegoObj.mensaje, /monstruo/)
    assert.deepEqual(juegoObj.mano, ['K♠', '3♦', 'K♦', '6♦', 'K♣', 'J♦'])
  })
  it(`Turno #10. Nuevo turno completo (favor divino, monstruo)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'Q♦')
    assert.match(juegoObj.mensaje, /favor divino/)
    assert.equal(juegoObj.encuentro, '')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '6♠')
    assert.match(juegoObj.mensaje, /monstruo/)
    assert.equal(juegoObj.encuentro, '6♠')
    juegoObj = jugar(juegoObj)
    assert.deepEqual(juegoObj.mano, ['K♠', '3♦', 'K♦', '6♦', 'K♣', 'J♦'])
  })
  it(`Turno #11. Nuevo turno completo (trampa, usar desactivar mecanismos, recoger tesoros)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '10♦')
    assert.match(juegoObj.mensaje, /trampa/)
    assert.equal(juegoObj.encuentro, '10♦')
    juegoObj = sacarCarta(juegoObj, 'J♦')
    assert.match(juegoObj.mensaje, /mecanismos/)
    assert.deepEqual(juegoObj.mano, ['K♠', '3♦', 'K♦', '6♦', 'K♣', '10♦'])
  })
  it(`Turno #12. Nuevo turno completo (tesoro reyes, puerta, recoger tesoros)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, 'K♥')
    assert.match(juegoObj.mensaje, /tesoro/)
    assert.equal(juegoObj.encuentro, '')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '6♣')
    assert.match(juegoObj.mensaje, /puerta/)
    assert.equal(juegoObj.encuentro, '6♣')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '9♦')
    assert.equal(juegoObj.accion, '9♦')
    juegoObj = jugar(juegoObj)
    assert.deepEqual(juegoObj.mano, ['K♠', '3♦', 'K♦', '6♦', 'K♣', '10♦', 'K♥', '9♦'])
  })
  it(`Turno #13. Nuevo turno completo (puerta)`, () => {
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '2♣')
    assert.match(juegoObj.mensaje, /puerta/)
    assert.equal(juegoObj.encuentro, '2♣')
    juegoObj = jugar(juegoObj)
    assert.equal(juegoObj.carta, '7♣')
    assert.equal(juegoObj.accion, '7♣')
    juegoObj = jugar(juegoObj)
    assert.deepEqual(juegoObj.mano, ['K♠', '3♦', 'K♦', '6♦', 'K♣', '10♦', 'K♥', '9♦'])
  })
  it(`Fin del juego`, () => {
    juegoObj = jugar(juegoObj)
    assert.match(juegoObj.mensaje, /entrada/)
    assert.match(juegoObj.mensaje, /4\/68/)
  })
})