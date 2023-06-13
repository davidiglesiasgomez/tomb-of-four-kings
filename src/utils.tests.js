import { describe, it } from 'node:test'
import assert from 'node:assert'
import { tipoCarta } from './utils.js'

describe('tipoCarta test', () => {
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
