import { describe, it } from 'node:test'
import assert from 'node:assert'
import { tipoCarta, valorCarta, recogerTesoro, jugar } from './utils.js'

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
    assert.deepEqual(recogerTesoro([], []), {mano: []})
  })
  it(`Si el turno no tiene tesoros que recoger, devuelve vacio`, () => {
    assert.deepEqual(recogerTesoro(['A♥'], []), {mano: []})
    assert.deepEqual(recogerTesoro(['2♠', '8♠', '9♠', '4♣', '5♣', '6♣', '9♣', '10♣'], []), {mano: []})
    assert.deepEqual(recogerTesoro(['A♥', 'A♠', 'A♦', 'A♣', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣'], []), {mano: []})
  })
  it(`Si el turno solo tiene una carta y es un tesoro, devuelve vacio`, () => {
    assert.deepEqual(recogerTesoro(['2♦'], []), {mano: []})
    assert.deepEqual(recogerTesoro(['7♦'], []), {mano: []})
    assert.deepEqual(recogerTesoro(['10♦'], []), {mano: []})
    assert.deepEqual(recogerTesoro(['K♦'], []), {mano: []})
    assert.deepEqual(recogerTesoro(['Jk'], []), {mano: []})
  })
  it(`Si el turno solo tiene cartas de tesoro, tiene que descartar la de menor valor y devolver el resto`, () => {
    assert.deepEqual(recogerTesoro(['7♦', '2♦', 'Jk'], []), {mano: ['7♦', 'Jk']})
    assert.deepEqual(recogerTesoro(['2♦', 'Jk', '7♦'], []), {mano: ['Jk', '7♦']})
  })
  it(`Si el turno tiene una o más cartas que no sean tesoro, descartarlas`, () => {
    assert.deepEqual(recogerTesoro(['A♣', '2♠', '7♦', '2♦', 'Jk'], []), {mano: ['7♦', '2♦', 'Jk']})
    assert.deepEqual(recogerTesoro(['2♦', 'Jk', 'A♣', '2♠', '7♦'], []), {mano: ['2♦', 'Jk', '7♦']})
  })
})

describe('Tests para la funcion jugar', () => {
  it(`Si no hay más cartas en el mazo no se debería hacer nada`, () => {
    let baraja = []
    let expected = jugar(baraja)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.carta, '')
    assert.equal(expected.pasarCartaAlTurno, false)
  })
  it(`Se saca la siguiente carta del mazo. Si no pasa nada, se pasa la carta al turno y nada más`, () => {
    let baraja = ['A♥']
    let expected = jugar(baraja)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.carta, 'A♥')
    assert.equal(expected.pasarCartaAlTurno, true)
  })
  it(`Si hay 5 cartas en antorchas, se pierde`, () => {
    let baraja = []
    let antorchas = ['A♥', 'A♠', 'A♦', 'A♣', 'Jk']
    let expected = jugar(baraja, antorchas)
    assert.deepEqual(expected.baraja, baraja)
    assert.equal(expected.esFin, true)
    assert.equal(expected.mensaje, `La última antorcha se consumió. Has perdido`)
  })
  it(`Si hay 4 cartas en antorchas y ninguna es el pergamino de luz, se pierde`, () => {
    let baraja = []
    let antorchas = ['A♥', 'A♠', 'A♦', 'A♣']
    let expected = jugar(baraja, antorchas)
    assert.deepEqual(expected.baraja, baraja)
    assert.equal(expected.esFin, true)
    assert.equal(expected.mensaje, `La última antorcha se consumió. Has perdido`)
  })
  it(`Si hay 4 cartas en antorchas y una es el pergamino de luz, no pasa nada`, () => {
    let baraja = ['A♥']
    let antorchas = ['A♥', 'A♠', 'A♦', 'Jk']
    let expected = jugar(baraja, antorchas)
    assert.deepEqual(expected.baraja, [])
    assert.equal(expected.esFin, false)
  })
  it(`Si los puntos de vida bajan de 2, se pierde`, () => {
    let baraja = ['A♥']
    let antorchas = []
    let puntosVida = 1
    let expected = jugar(baraja, antorchas, puntosVida)
    assert.equal(expected.esFin, true)
    assert.equal(expected.mensaje, `Has muerto. Has perdido`)
  })
  it(`Si los puntos de vida no bajan de 2, no pasa nada`, () => {
    let baraja = ['A♥']
    let antorchas = []
    let puntosVida = 2
    let expected = jugar(baraja, antorchas, puntosVida)
    assert.equal(expected.esFin, false)
  })
})