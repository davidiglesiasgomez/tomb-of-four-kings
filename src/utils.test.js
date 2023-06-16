import { describe, it } from 'node:test'
import assert from 'node:assert'
import { tipoCarta, valorCarta, recogerTesoro, jugar, descartarCartas, pasarCartaAlTurno } from './utils.js'

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
    assert.equal(expected.pasarCartaAlTurno, false)
  })
  it(`Se saca la siguiente carta del mazo. Si no pasa nada, se pasa la carta al turno y nada más`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥']
    let expected = jugar(juegoObj)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.carta, '2♥')
    assert.equal(expected.pasarCartaAlTurno, true)
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
    assert.equal(expected.pasarCartaAlTurno, true)
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
    assert.equal(expected.pasarCartaAlTurno, false)
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
    assert.deepEqual(expected.mano, [])
    assert.equal(expected.mensaje, `La última antorcha se iba a consumir. Por suerte, posees el pergamino de luz. La última antorcha pasa al fondo del mazo de cartas`)
  })
  it(`Si hay encuentro de monstruo y favor divino, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♠'
    juegoObj.favorDivino = true
    let expected = jugar(juegoObj)
    assert.equal(expected.recogerTesoro, true)
    assert.equal(expected.terminarTurno, true)
    assert.match(expected.mensaje, /monstruo/)
    assert.match(expected.mensaje, /divino/)
  })
  it(`Si hay encuentro de trampa y favor divino, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♦'
    juegoObj.favorDivino = true
    let expected = jugar(juegoObj)
    assert.equal(expected.recogerTesoro, true)
    assert.equal(expected.terminarTurno, true)
    assert.match(expected.mensaje, /trampa/)
    assert.match(expected.mensaje, /divino/)
  })
  it(`Si hay encuentro de puerta y favor divino, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♣'
    juegoObj.favorDivino = true
    let expected = jugar(juegoObj)
    assert.equal(expected.recogerTesoro, true)
    assert.equal(expected.terminarTurno, true)
    assert.match(expected.mensaje, /puerta/)
    assert.match(expected.mensaje, /divino/)
  })
  it(`Si hay encuentro de monstruo y la accion es mayor o igual, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♠'
    juegoObj.accion = '3♠'
    let expected = jugar(juegoObj)
    assert.equal(expected.recogerTesoro, true)
    assert.equal(expected.terminarTurno, true)
    assert.match(expected.mensaje, /monstruo/)
    assert.match(expected.mensaje, /acción/)
  })
  it(`Si hay encuentro de trampa y la accion es mayor o igual, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♦'
    juegoObj.accion = '3♦'
    let expected = jugar(juegoObj)
    assert.equal(expected.recogerTesoro, true)
    assert.equal(expected.terminarTurno, true)
    assert.match(expected.mensaje, /trampa/)
    assert.match(expected.mensaje, /acción/)
  })
  it(`Si hay encuentro de puerta y la accion es mayor o igual, se recoge el tesoro y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '2♣'
    juegoObj.accion = '3♣'
    let expected = jugar(juegoObj)
    assert.equal(expected.recogerTesoro, true)
    assert.equal(expected.terminarTurno, true)
    assert.match(expected.mensaje, /puerta/)
    assert.match(expected.mensaje, /acción/)
  })
  it(`Si hay encuentro de monstruo y la accion es menor, se pierden puntos de vida y continua el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '4♠'
    juegoObj.accion = '2♠'
    juegoObj.puntosVida = 10
    let expected = jugar(juegoObj)
    assert.equal(expected.recogerTesoro, false)
    assert.equal(expected.continuarTurno, true)
    assert.equal(expected.terminarTurno, false)
    assert.equal(expected.puntosVida, 8)
    assert.match(expected.mensaje, /monstruo/)
    assert.match(expected.mensaje, /puntos de vida/)
  })
  it(`Si hay encuentro de trampa y la accion es menor, se pierden puntos de vida y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.encuentro = '4♦'
    juegoObj.accion = '2♦'
    juegoObj.puntosVida = 10
    let expected = jugar(juegoObj)
    assert.equal(expected.recogerTesoro, false)
    assert.equal(expected.terminarTurno, true)
    assert.equal(expected.puntosVida, 8)
    assert.match(expected.mensaje, /trampa/)
    assert.match(expected.mensaje, /puntos de vida/)
  })
  it(`Si hay encuentro de puerta y la accion es menor, se descartan cartas y se termina el turno`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥', '3♥', '4♥', '5♥']
    juegoObj.encuentro = '4♣'
    juegoObj.accion = '2♣'
    let expected = jugar(juegoObj)
    assert.equal(expected.recogerTesoro, false)
    assert.equal(expected.terminarTurno, true)
    assert.equal(expected.baraja.length, 2)
    assert.deepEqual(expected.baraja, ['4♥', '5♥'])
    assert.deepEqual(expected.antorchas, [])
    assert.match(expected.mensaje, /puerta/)
    assert.match(expected.mensaje, /cartas/)
  })
  it(`Si hay encuentro de puerta y la accion es menor, se descartan cartas y se termina el turno, pero si hay una antorcha, se pasa a las antorchas`, () => {
    let juegoObj = {}
    juegoObj.baraja = ['2♥', 'A♥', '4♥', '5♥']
    juegoObj.encuentro = '4♣'
    juegoObj.accion = '2♣'
    let expected = jugar(juegoObj)
    assert.equal(expected.recogerTesoro, false)
    assert.equal(expected.terminarTurno, true)
    assert.equal(expected.baraja.length, 2)
    assert.deepEqual(expected.baraja, ['4♥', '5♥'])
    assert.deepEqual(expected.antorchas, ['A♥'])
    assert.match(expected.mensaje, /puerta/)
    assert.match(expected.mensaje, /cartas/)
  })
})

describe('Tests para la funcion descartarCartas', () => {
  let juegoObj = {}
  let retornoObj = {}
  it(`Si se indican 0 cartas para descartar, se devuelve lo mismo`, () => {
    juegoObj.baraja = []
    juegoObj.antorchas = []
    juegoObj.descartadas = []
    retornoObj = descartarCartas(juegoObj, 0)
    assert.deepEqual(retornoObj.baraja, [])
    assert.deepEqual(retornoObj.antorchas, [])
    assert.deepEqual(retornoObj.descartadas, [])
    juegoObj.baraja = ['A♥', '2♥', '3♥', 'K♥']
    juegoObj.antorchas = []
    juegoObj.descartadas = []
    retornoObj = descartarCartas(juegoObj, 0)
    assert.deepEqual(retornoObj.baraja, ['A♥', '2♥', '3♥', 'K♥'])
    assert.deepEqual(retornoObj.antorchas, [])
    assert.deepEqual(retornoObj.descartadas, [])
  })
  it(`Si se indican varias cartas para descartar, pero baraja está vacía, se devuelve lo mismo`, () => {
    juegoObj.baraja = []
    juegoObj.antorchas = []
    juegoObj.descartadas = []
    retornoObj = descartarCartas(juegoObj, 3)
    assert.deepEqual(retornoObj.baraja, [])
    assert.deepEqual(retornoObj.antorchas, [])
    assert.deepEqual(retornoObj.descartadas, [])
    juegoObj.baraja = []
    juegoObj.antorchas = []
    juegoObj.descartadas = []
    retornoObj = descartarCartas(juegoObj, 10)
    assert.deepEqual(retornoObj.baraja, [])
    assert.deepEqual(retornoObj.antorchas, [])
    assert.deepEqual(retornoObj.descartadas, [])
  })
  it(`Se indican varias cartas para descartar y no hay antorchas en las descartadas`, () => {
    juegoObj.baraja = ['2♥', '3♥', '4♥', 'K♥']
    juegoObj.antorchas = ['A♥']
    juegoObj.descartadas = ['10♥']
    retornoObj = descartarCartas(juegoObj, 1)
    assert.deepEqual(retornoObj.baraja, ['3♥', '4♥', 'K♥'])
    assert.deepEqual(retornoObj.antorchas, ['A♥'])
    assert.deepEqual(retornoObj.descartadas, ['10♥', '2♥'])
    juegoObj.baraja = ['2♥', '3♥', '4♥', 'K♥']
    juegoObj.antorchas = ['A♥']
    juegoObj.descartadas = ['10♥']
    retornoObj = descartarCartas(juegoObj, 3)
    assert.deepEqual(retornoObj.baraja, ['K♥'])
    assert.deepEqual(retornoObj.antorchas, ['A♥'])
    assert.deepEqual(retornoObj.descartadas, ['10♥', '2♥', '3♥', '4♥'])
  })
  it(`Se indican varias cartas para descartar y hay antorchas en las descartadas, hay que pasarlas a las antorchas`, () => {
    juegoObj.baraja = ['A♥', '2♥', '3♥', '4♥', 'K♥']
    juegoObj.antorchas = ['A♦']
    juegoObj.descartadas = ['10♥']
    retornoObj = descartarCartas(juegoObj, 1)
    assert.deepEqual(retornoObj.baraja, ['2♥', '3♥', '4♥', 'K♥'])
    assert.deepEqual(retornoObj.antorchas, ['A♦', 'A♥'])
    assert.deepEqual(retornoObj.descartadas, ['10♥'])
    juegoObj.baraja = ['2♥', 'A♥', '3♥', '4♥', 'K♥']
    juegoObj.antorchas = ['A♦']
    juegoObj.descartadas = ['10♥']
    retornoObj = descartarCartas(juegoObj, 3)
    assert.deepEqual(retornoObj.baraja, ['4♥', 'K♥'])
    assert.deepEqual(retornoObj.antorchas, ['A♦', 'A♥'])
    assert.deepEqual(retornoObj.descartadas, ['10♥', '2♥', '3♥'])
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

export const marcarRetorno = (juegoObj) => {
  juegoObj.turnos = juegoObj.turnos ?? []
  juegoObj.contador = juegoObj.contador ?? 0
  juegoObj.retornar = juegoObj.retornar ?? 0
  juegoObj.encuentro = juegoObj.encuentro ?? ''
  juegoObj.accion = juegoObj.accion ?? ''
  juegoObj.mensaje = juegoObj.mensaje ?? ''
  if (juegoObj.contador <= 1) {
    juegoObj.retornar = 0
    juegoObj.mensaje = `No puedes retornar porque acabas de empezar`
    return juegoObj
  }
  if ((juegoObj.turnos && juegoObj.turnos[juegoObj.contador] && juegoObj.turnos[juegoObj.contador].length !== 0) || juegoObj.encuentro !== '' || juegoObj.accion !== '') {
    juegoObj.retornar = 0
    juegoObj.mensaje = `No puedes retornar porque estás en medio de un turno`
    return juegoObj
  }
  juegoObj.retornar = juegoObj.contador
  juegoObj.mensaje = `Empiezas el retorno`
  return juegoObj
}

describe('Tests para la funcion marcarRetorno', () => {
  let juegoObj = {}
  let retornoObj = {}
  it(`Se tiene que haber llegado por lo menos al turno 2`, () => {
    juegoObj.contador = 0
    retornoObj = marcarRetorno(juegoObj)
    assert.equal(retornoObj.retornar, 0)
    assert.match(retornoObj.mensaje, /No puedes retornar porque acabas de empezar/)
    juegoObj.contador = 1
    retornoObj = marcarRetorno(juegoObj)
    assert.equal(retornoObj.retornar, 0)
    assert.match(retornoObj.mensaje, /No puedes retornar porque acabas de empezar/)
    juegoObj.contador = 2
    retornoObj = marcarRetorno(juegoObj)
    assert.equal(retornoObj.retornar, 2)
    assert.match(retornoObj.mensaje, /Empiezas el retorno/)
  })
  it(`Para marcar el retorno, no se puede estar en medio de un turno`, () => {
    juegoObj = {}
    juegoObj.contador = 2
    juegoObj.encuentro = 'A♥'
    retornoObj = marcarRetorno(juegoObj)
    assert.equal(retornoObj.retornar, 0)
    assert.match(retornoObj.mensaje, /No puedes retornar porque estás en medio de un turno/)
    juegoObj = {}
    juegoObj.contador = 2
    juegoObj.accion = 'A♥'
    retornoObj = marcarRetorno(juegoObj)
    assert.equal(retornoObj.retornar, 0)
    assert.match(retornoObj.mensaje, /No puedes retornar porque estás en medio de un turno/)
    juegoObj = {}
    juegoObj.contador = 2
    juegoObj.turnos = []
    juegoObj.turnos[juegoObj.contador] = ['A♥']
    retornoObj = marcarRetorno(juegoObj)
    assert.equal(retornoObj.retornar, 0)
    assert.match(retornoObj.mensaje, /No puedes retornar porque estás en medio de un turno/)
    juegoObj = {}
    juegoObj.contador = 2
    retornoObj = marcarRetorno(juegoObj)
    assert.equal(retornoObj.retornar, 2)
    assert.match(retornoObj.mensaje, /Empiezas el retorno/)
  })
})