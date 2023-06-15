export const tipoCarta = (carta) => {
  if (carta === 'Jk') {
    return 'Pergamino de luz'
  }
  if (carta === 'J♠') {
    return 'Volverse berseker';
  }
  if (carta === 'J♣') {
    return 'Abrir cerraduras';
  }
  if (carta === 'J♥') {
    return 'Esquivar golpe';
  }
  if (carta === 'J♦') {
    return 'Desactivar mecanismos';
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
    // return `Monstruo ${valor}`
    return `un monstruo`
  }
  if (palo === '♦') {
    // return `Trampa ${valor}`
    return `una trampa`
  }
  if (palo === '♣') {
    // return `Puerta cerrada ${valor}`
    return `una puerta cerrada`
  }
  return '';
}

export const valorCarta = (carta) => {
  if (carta === 'Jk') {
    return 6
  }
  let valor = carta.slice(0, -1)
  if (valor === 'K') {
    return 10
  }
  let palo = carta.slice(-1)
  if (['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(valor) && '♦' === palo) {
    return parseInt(valor)
  }
  return 0;
}

export const esCartaDeEncuentro = (carta) => {
  let valor = carta.slice(0, -1)
  let palo = carta.slice(-1)
  return ( ['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(valor) && ['♦', '♠', '♣'].includes(palo) ? true : false )
}

export const esCartaDeAccion = (carta) => esCartaDeEncuentro(carta)

export const esCartaDeAntorcha = (carta) => {
  let valor = carta.slice(0, -1)
  return ( valor === 'A' ? true : false )
}

export const esCartaDeHabilidad = (carta) => {
  let valor = carta.slice(0, -1)
  if (carta == 'Jk') return false
  return ( valor === 'J' ? true : false )
}

export const esCartaDeTesoro = (carta) => {
  let valor = carta.slice(0, -1)
  return ( valor === 'K' ? true : false )
}

export const esCartaDeFavorDivino = (carta) => {
  let valor = carta.slice(0, -1)
  return ( valor === 'Q' ? true : false )
}

export const esCartaDePergaminoDeLuz = (carta) => {
  return ( carta === 'Jk' ? true : false )
}

export const esCartaDeValor = (carta) => {
  let valor = carta.slice(0, -1)
  let palo = carta.slice(-1)
  return ( ['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(valor) && '♦' === palo ? true : false )
}

export const puntosVidaCarta = (puntos) => {
  let cartas = ['', '', '2♥', '3♥', '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥']
  return cartas[puntos] ?? ''
}

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
}

export const barajarBaraja = (baraja) => {
  return baraja
  // return shuffleArray(baraja)
}

export const barajaInicial = () => {
  return ['5♦', '3♠', 'Q♣', 'J♠', '9♣', 'A♦', '3♣', '2♦', '4♦', '8♦',
  '10♠', '9♠', 'K♠', 'A♥', '5♠', 'J♥', '3♦', 'K♦', '4♠', 'Jk', '6♦', '5♣', 'K♣',
  'Q♠', '7♠', '2♠', '8♠', 'J♦', 'A♣', 'A♠', '8♣', 'Q♦', '6♠', '10♦', 'K♥', '6♣',
  '9♦', '2♣', '7♣', '4♣', '10♣', 'J♣', '7♦', 'Q♥']
}

export const marcarRetorno = (turnos, contador, encuentro, desafio, accion) => {
  if (contador <= 1) {
    return {
      retornar: 0,
      mensaje: `No puedes retornar porque acabas de empezar`
    }
  }
  if (turnos[contador] && turnos[contador].length !== 0 || encuentro !== '' || desafio !== 0 || accion !== 0) {
    return {
      retornar: 0,
      mensaje: `No puedes retornar porque estás en medio de un turno`
    }
  }
  return {
    retornar: contador,
    mensaje: `Empiezas el retorno`
  }
}

export const sacarCarta = (carta, encuentro, desafio) => {
  if (carta === 'J♠' && encuentro.includes('monstruo')) {
    return {
      mensaje: `Mato al monstruo con mi habilidad especial de volverse berseker`,
      quitarCartaDeMano: true,
      pasarCartaAlTurno: true,
      recogerTesoro: true,
      resetearAccion: false,
      terminarTurno: true
    }
  }
  if (carta === 'J♦' && encuentro.includes('trampa')) {
    return {
      mensaje: `Desactivo el mecanismo con mi habilidad especial de desactivar mecanismos`,
      quitarCartaDeMano: true,
      pasarCartaAlTurno: true,
      recogerTesoro: true,
      resetearAccion: false,
      terminarTurno: true
    }
  }
  if (carta === 'J♣' && encuentro.includes('puerta cerrada')) {
    return {
      mensaje: `Abro la puerta con mi habilidad especial de abrir cerraduras`,
      quitarCartaDeMano: true,
      pasarCartaAlTurno: true,
      recogerTesoro: true,
      resetearAccion: false,
      terminarTurno: true
    }
  }
  if (carta === 'J♥' && (encuentro.includes('monstruo') || encuentro.includes('trampa'))) {
    return {
      mensaje: `No me hago daño con mi habilidad especial de esquivar golpe`,
      quitarCartaDeMano: true,
      pasarCartaAlTurno: true,
      recogerTesoro: false,
      resetearAccion: false,
      terminarTurno: false
    }
  }
  if ((esCartaDeTesoro(carta) || esCartaDePergaminoDeLuz(carta) || esCartaDeValor(carta)) && encuentro.includes('monstruo') && desafio<valorCarta(carta)) {
    return {
      mensaje: `Tiro una carta de valor (${carta}) para distraer al monstruo`,
      quitarCartaDeMano: true,
      pasarCartaAlTurno: true,
      recogerTesoro: false,
      resetearAccion: false,
      terminarTurno: true
    }
  }
  return {
    mensaje: `No tiene sentido usar esa carta`,
    quitarCartaDeMano: false,
    pasarCartaAlTurno: false,
    recogerTesoro: false,
    resetearAccion: false,
    terminarTurno: false
  }
}

export const pasarCartaAlTurno = (turnos, contador, carta) => {
  let temp = [...turnos]
  if (typeof temp[contador] === 'undefined') {
    temp[contador] = []
  }
  temp[contador].push(carta)
  return {
    turnos: temp
  }
}

export const descartarCartas = (baraja, antorchas, numero_de_cartas) => {
  let eliminadas = baraja.splice(0, numero_de_cartas)
  let antorchas_eliminadas = eliminadas.filter(eliminado => esCartaDeAntorcha(eliminado))
  let temp = [...antorchas]
  antorchas_eliminadas.forEach(antorcha => temp.push(antorcha))
  return {
    baraja: baraja,
    antorchas: temp,
    eliminadas: eliminadas
  }
}

export const recogerTesoro = (turno, mano) => {
  let tesoros = turno.filter(tesoro => esCartaDeTesoro(tesoro) || esCartaDePergaminoDeLuz(tesoro) || esCartaDeValor(tesoro))
  if (tesoros.length === turno.length) {
    let descarte = [...tesoros].sort((a, b) => valorCarta(a) - valorCarta(b)).shift()
    tesoros = tesoros.filter(tesoro => tesoro !== descarte)
  }
  return {
    mano: mano.concat(tesoros)
  }
}

export const jugar = (juegoObj) => {
  juegoObj.encuentro = juegoObj.encuentro ?? ''
  juegoObj.accion = juegoObj.accion ?? ''

  if (juegoObj.antorchas !== undefined && juegoObj.antorchas.length === 5) {
    juegoObj.esFin = true
    juegoObj.mensaje = `La última antorcha se consumió. Has perdido`
    return juegoObj
  }

  if (juegoObj.antorchas !== undefined && juegoObj.antorchas.length === 4 && !juegoObj.antorchas.some(antorcha => esCartaDePergaminoDeLuz(antorcha))) {
    juegoObj.esFin = true
    juegoObj.mensaje = `La última antorcha se consumió. Has perdido`
    return juegoObj
  }

  if (juegoObj.puntosVida !== undefined && juegoObj.puntosVida < 2) {
    juegoObj.esFin = true
    juegoObj.mensaje = `Has muerto. Has perdido`
    return juegoObj
  }

  if (juegoObj.retorno !== undefined && juegoObj.retorno>1 && juegoObj.contador && juegoObj.contador === 2 * juegoObj.retorno - 1) {
    juegoObj.esFin = true
    juegoObj.esVictoria = true
    juegoObj.mensaje = `Has regresado a la entrada de la tumba. Has ganado`
    return juegoObj
  }

  if (juegoObj.baraja.length === 0) {
    juegoObj.carta = ''
    juegoObj.pasarCartaAlTurno = false
    juegoObj.esFin = true
    return juegoObj
  }

  let temp = null

  temp = [...juegoObj.baraja]
  let carta = temp.shift()
  juegoObj.carta = carta
  juegoObj.baraja = temp

  if (juegoObj.encuentro !== undefined && juegoObj.encuentro !== '' && esCartaDeAccion(carta)) {
    juegoObj.mensaje = `Contrarresto`
    juegoObj.accion = carta
  }

  if (juegoObj.encuentro !== undefined && juegoObj.encuentro === '' && esCartaDeEncuentro(carta)) {
    juegoObj.encuentro = carta
  }

  if (esCartaDePergaminoDeLuz(carta)) {
    juegoObj.mensaje = `Ha aparecido el pergamino de luz`
  }

  if (esCartaDeFavorDivino(carta)) {
    juegoObj.mensaje = `La diosa me bendice con el favor divino`
    juegoObj.esFavorDivino = true
  }

  juegoObj.pasarCartaAlTurno = true
  juegoObj.esFin = false
  return juegoObj
}