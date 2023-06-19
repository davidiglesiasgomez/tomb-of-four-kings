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

export const numeroCarta = (carta) => {
  let valor = carta.slice(0, -1) || 0
  return parseInt(valor)
}

export const esCartaDeEncuentro = (carta) => {
  let valor = carta.slice(0, -1)
  let palo = carta.slice(-1)
  return ( ['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(valor) && ['♦', '♠', '♣'].includes(palo) ? true : false )
}

export const esCartaDeAccion = (carta) => esCartaDeEncuentro(carta)

export const esCartaDeMonstruo = (carta) => {
  let valor = carta.slice(0, -1)
  let palo = carta.slice(-1)
  return ( ['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(valor) && '♠' === palo ? true : false )
}

export const esCartaDeTrampa = (carta) => {
  let valor = carta.slice(0, -1)
  let palo = carta.slice(-1)
  return ( ['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(valor) && '♦' === palo ? true : false )
}

export const esCartaDePuerta = (carta) => {
  let valor = carta.slice(0, -1)
  let palo = carta.slice(-1)
  return ( ['2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(valor) && '♣' === palo ? true : false )
}

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
  return cartas[puntos] || ''
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

export const generarBaraja = () => {
  let baraja = ['Jk']
  baraja.push('A♥', 'J♥', 'Q♥', 'K♥')
  baraja.push('A♦', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦', 'J♦', 'Q♦', 'K♦')
  baraja.push('A♠', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠')
  baraja.push('A♣', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', 'J♣', 'Q♣', 'K♣')
  return shuffleArray(baraja)
}

export const marcarRetorno = (juegoObj) => {
  juegoObj.turnos = juegoObj.turnos || []
  juegoObj.contador = juegoObj.contador || 0
  juegoObj.retornar = juegoObj.retornar || 0
  juegoObj.encuentro = juegoObj.encuentro || ''
  juegoObj.accion = juegoObj.accion || ''
  juegoObj.mensaje = juegoObj.mensaje || ''
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

export const sacarCarta = (juegoObj, carta) => {
  juegoObj.mensaje = 'No tiene sentido usar la carta <carta> <tipo>'.replace('<carta>', carta).replace('<tipo>', tipoCarta(carta, true))
  juegoObj.encuentro = juegoObj.encuentro || ''
  juegoObj.mano = juegoObj.mano || []
  juegoObj.turnos = juegoObj.turnos || []
  juegoObj.contador = juegoObj.contador || 0
  if (carta === 'J♠' && esCartaDeMonstruo(juegoObj.encuentro)) {
    juegoObj.mensaje = 'Mato al monstruo con mi habilidad especial de volverse berseker'
    juegoObj = pasarCartaAlTurno(juegoObj, carta)
    juegoObj = quitarCartaDeMano(juegoObj, carta)
    juegoObj = recogerTesoro(juegoObj)
    juegoObj = terminarTurno(juegoObj)
    return juegoObj
  }
  if (carta === 'J♦' && esCartaDeTrampa(juegoObj.encuentro)) {
    juegoObj.mensaje = 'Desactivo el mecanismo con mi habilidad especial de desactivar mecanismos'
    juegoObj = pasarCartaAlTurno(juegoObj, carta)
    juegoObj = quitarCartaDeMano(juegoObj, carta)
    juegoObj = recogerTesoro(juegoObj)
    juegoObj = terminarTurno(juegoObj)
    return juegoObj
  }
  if (carta === 'J♣' && esCartaDePuerta(juegoObj.encuentro)) {
    juegoObj.mensaje = 'Abro la puerta con mi habilidad especial de abrir cerraduras'
    juegoObj = pasarCartaAlTurno(juegoObj, carta)
    juegoObj = quitarCartaDeMano(juegoObj, carta)
    juegoObj = recogerTesoro(juegoObj)
    juegoObj = terminarTurno(juegoObj)
    return juegoObj
  }
  if (carta === 'J♥' && (esCartaDeMonstruo(juegoObj.encuentro) || esCartaDeTrampa(juegoObj.encuentro))) {
    juegoObj.mensaje = 'No me hago daño con mi habilidad especial de esquivar golpe'
    juegoObj = pasarCartaAlTurno(juegoObj, carta)
    juegoObj = quitarCartaDeMano(juegoObj, carta)
    return juegoObj
  }
  if ((esCartaDeTesoro(carta) || esCartaDePergaminoDeLuz(carta) || esCartaDeValor(carta)) && esCartaDeMonstruo(juegoObj.encuentro) && numeroCarta(juegoObj.encuentro)<valorCarta(carta)) {
    juegoObj.mensaje = `Tiro una carta de valor (${carta}) para distraer al monstruo`
    juegoObj = pasarCartaAlTurno(juegoObj, carta)
    juegoObj = quitarCartaDeMano(juegoObj, carta)
    juegoObj = terminarTurno(juegoObj)
    return juegoObj
  }
  return juegoObj
}

export const pasarCartaAlTurno = (juegoObj, carta) => {
  juegoObj.turnos = juegoObj.turnos || []
  juegoObj.contador = juegoObj.contador || 0
  if (carta === undefined || carta === '') {
    return juegoObj
  }
  let temp = [...juegoObj.turnos]
  if (typeof temp[juegoObj.contador] === 'undefined') {
    temp[juegoObj.contador] = []
  }
  temp[juegoObj.contador].push(carta)
  juegoObj.turnos = temp
  return juegoObj
}

export const descartarCartas = (juegoObj, numero_de_cartas) => {
  let cartas_eliminadas = juegoObj.baraja.splice(0, numero_de_cartas)
  let antorchas_eliminadas = cartas_eliminadas.filter(eliminado => esCartaDeAntorcha(eliminado))
  cartas_eliminadas = cartas_eliminadas.filter(eliminado => !esCartaDeAntorcha(eliminado))
  juegoObj.descartadas = juegoObj.descartadas.concat(cartas_eliminadas)
  juegoObj.antorchas = juegoObj.antorchas.concat(antorchas_eliminadas)
  return juegoObj
}

export const recogerTesoro = (juegoObj) => {
  juegoObj.turnos = juegoObj.turnos || []
  juegoObj.mano = juegoObj.mano || []
  let turno = juegoObj.turnos[juegoObj.contador] || []
  let tesoros = turno.filter(tesoro => esCartaDeTesoro(tesoro) || esCartaDePergaminoDeLuz(tesoro) || esCartaDeValor(tesoro))
  if (tesoros.length === turno.length) {
    let descarte = [...tesoros].sort((a, b) => valorCarta(a) - valorCarta(b)).shift()
    tesoros = tesoros.filter(tesoro => tesoro !== descarte)
  }
  juegoObj.mano = juegoObj.mano.concat(tesoros)
  return juegoObj
}

export const jugar = (juegoObj) => {
  juegoObj.baraja = juegoObj.baraja || []
  juegoObj.antorchas = juegoObj.antorchas || []
  juegoObj.mano = juegoObj.mano || []
  juegoObj.descartadas = juegoObj.descartadas || []
  juegoObj.encuentro = juegoObj.encuentro || ''
  juegoObj.accion = juegoObj.accion || ''
  juegoObj.contador = juegoObj.contador || 0
  juegoObj.favorDivino = juegoObj.favorDivino || false

  juegoObj.fin = false
  juegoObj.victoria = false

  if (juegoObj.encuentro !== undefined && juegoObj.encuentro !== '' && esCartaDeEncuentro(juegoObj.encuentro) && juegoObj.favorDivino === true) {
    juegoObj.mensaje = ''
    juegoObj.mensaje = ( esCartaDeMonstruo(juegoObj.encuentro) ? `Maté al monstruo gracias al favor divino` : juegoObj.mensaje )
    juegoObj.mensaje = ( esCartaDeTrampa(juegoObj.encuentro) ? `Evité la trampa gracias al favor divino` : juegoObj.mensaje )
    juegoObj.mensaje = ( esCartaDePuerta(juegoObj.encuentro) ? `Abrí la puerta gracias al favor divino` : juegoObj.mensaje )
    juegoObj = recogerTesoro(juegoObj)
    juegoObj = terminarTurno(juegoObj)
    return juegoObj
  }

  if (juegoObj.encuentro !== undefined && juegoObj.encuentro !== '' && juegoObj.accion !== undefined && juegoObj.accion !== '' && numeroCarta(juegoObj.encuentro)<=numeroCarta(juegoObj.accion)) {
    juegoObj.mensaje = ''
    juegoObj.mensaje = ( esCartaDeMonstruo(juegoObj.encuentro) ? `Maté al monstruo gracias a mi acción` : juegoObj.mensaje )
    juegoObj.mensaje = ( esCartaDeTrampa(juegoObj.encuentro) ? `Evité la trampa gracias a mi acción` : juegoObj.mensaje )
    juegoObj.mensaje = ( esCartaDePuerta(juegoObj.encuentro) ? `Abrí la puerta gracias a mi acción` : juegoObj.mensaje )
    juegoObj = recogerTesoro(juegoObj)
    juegoObj = terminarTurno(juegoObj)
    return juegoObj
  }

  if (juegoObj.encuentro !== undefined && juegoObj.encuentro !== '' && juegoObj.accion !== undefined && juegoObj.accion !== '' && numeroCarta(juegoObj.encuentro)>numeroCarta(juegoObj.accion)) {
    let diferencia = numeroCarta(juegoObj.encuentro) - numeroCarta(juegoObj.accion)
    if (esCartaDeMonstruo(juegoObj.encuentro)) {
      juegoObj.puntosVida = juegoObj.puntosVida - diferencia
      juegoObj.mensaje = `El monstruo me atacó y perdí ${diferencia} puntos de vida`
      juegoObj = continuarTurno(juegoObj)
    } else if (esCartaDeTrampa(juegoObj.encuentro)) {
      juegoObj.puntosVida = juegoObj.puntosVida - diferencia
      juegoObj.mensaje = `Se activó la trampa y perdí ${diferencia} puntos de vida`
      juegoObj = terminarTurno(juegoObj)
    } else if (esCartaDePuerta(juegoObj.encuentro)) {
      juegoObj = descartarCartas(juegoObj, diferencia)
      juegoObj.mensaje = `No pude abrir la puerta. Se descartan ${diferencia} cartas`
      juegoObj = terminarTurno(juegoObj)
    }
    return juegoObj
  }

  if (juegoObj.antorchas !== undefined && juegoObj.antorchas.length === 5) {
    juegoObj.fin = true
    juegoObj.mensaje = `La última antorcha se consumió. Has perdido`
    return juegoObj
  }

  if (juegoObj.antorchas !== undefined && juegoObj.antorchas.length === 4 && !juegoObj.antorchas.some(antorcha => esCartaDePergaminoDeLuz(antorcha))) {
    juegoObj.fin = true
    juegoObj.mensaje = `La última antorcha se consumió. Has perdido`
    return juegoObj
  }

  if (juegoObj.puntosVida !== undefined && juegoObj.puntosVida < 2) {
    juegoObj.fin = true
    juegoObj.mensaje = `Has muerto. Has perdido`
    return juegoObj
  }

  if (juegoObj.retornar !== undefined && juegoObj.retornar>1 && juegoObj.contador && juegoObj.contador === 2 * juegoObj.retornar - 1) {
    console.log('juegoObj.mano', juegoObj.mano)
    let reyes = juegoObj.mano.reduce((acc, item) => acc + ( esCartaDeTesoro(item) ? 1 : 0 ), 0)
    let puntos = juegoObj.mano.reduce((acc, item) => acc + valorCarta(item), 0)
    juegoObj.fin = true
    juegoObj.victoria = true
    juegoObj.mensaje = `Has regresado a la entrada de la tumba. Has ganado. Puntuación <reyes>/<puntos>`.replace('<reyes>', reyes).replace('<puntos>', puntos)
    return juegoObj
  }

  if (juegoObj.baraja.length === 0) {
    juegoObj.carta = ''
    juegoObj.fin = true
    return juegoObj
  }

  let temp = null

  temp = [...juegoObj.baraja]
  let carta = temp.shift()
  juegoObj.carta = carta
  juegoObj.baraja = temp

  if (juegoObj.encuentro !== undefined && juegoObj.encuentro !== '' && esCartaDeAccion(carta)) {
    juegoObj.mensaje = `Contrarresto con una acción`
    juegoObj.accion = carta
  }

  if (juegoObj.encuentro !== undefined && juegoObj.encuentro === '' && esCartaDeEncuentro(carta)) {
    juegoObj.mensaje = `Ha aparecido ` + tipoCarta(carta)
    juegoObj.encuentro = carta
  }

  if (esCartaDePergaminoDeLuz(carta)) {
    juegoObj.mensaje = `Ha aparecido el pergamino de luz`
  }

  if (esCartaDeFavorDivino(carta)) {
    juegoObj.mensaje = `La diosa me bendice con el favor divino`
    juegoObj.favorDivino = true
  }

  if (esCartaDeTesoro(carta)) {
    juegoObj.mensaje = `Ha aparecido un tesoro de los reyes`
  }

  if (esCartaDeHabilidad(carta)) {
    juegoObj.mensaje = `Me acabo de encontrar una nueva habilidad <carta> <tipo>`.replace('<carta>', carta).replace('<tipo>', tipoCarta(carta))
    juegoObj.mano = [...juegoObj.mano].concat(carta)
    return juegoObj
  }

  if (esCartaDeAntorcha(carta) && juegoObj.antorchas.length === 3 && juegoObj.mano.some(carta => esCartaDePergaminoDeLuz(carta))) {
    juegoObj.mensaje = `La última antorcha se iba a consumir. Por suerte, posees el pergamino de luz. La última antorcha pasa al fondo del mazo de cartas`
    juegoObj.baraja = [...juegoObj.baraja].concat(carta)
    juegoObj.antorchas = [...juegoObj.antorchas].concat('Jk')
    juegoObj.mano = [...juegoObj.mano].filter(item => !esCartaDePergaminoDeLuz(item))
    return juegoObj
  }

  if (esCartaDeAntorcha(carta) && juegoObj.antorchas.filter(antorcha => esCartaDeAntorcha(antorcha)).length === 3) {
    juegoObj.mensaje = `Me acaba de arder la última antorcha`
    juegoObj.antorchas = [...juegoObj.antorchas].concat(carta)
    return juegoObj
  }

  if (esCartaDeAntorcha(carta)) {
    juegoObj.mensaje = `Me acaba de arder una antorcha`
    juegoObj.antorchas = [...juegoObj.antorchas].concat(carta)
    return juegoObj
  }

  juegoObj = pasarCartaAlTurno(juegoObj, carta)
  return juegoObj
}

export const quitarCartaDeMano = (juegoObj, carta) => {
  carta = carta || ''
  if (carta === '') {
    return juegoObj
  }
  juegoObj.mano = juegoObj.mano.filter(item => item !== carta)
  return juegoObj
}

export const continuarTurno = (juegoObj) => {
  juegoObj.mensaje = juegoObj.mensaje + `. Continua el turno...`
  juegoObj.accion = ''
  return juegoObj
}

export const terminarTurno = (juegoObj) => {
  juegoObj.mensaje = juegoObj.mensaje + `. Finaliza el turno...`
  juegoObj.favorDivino = false
  juegoObj.contador = juegoObj.contador + 1
  juegoObj.encuentro = ''
  juegoObj.accion = ''
  return juegoObj
}

export const resetearJuego = (baraja) => {
  let juegoObj = {}
  juegoObj.baraja = baraja || generarBaraja()
  juegoObj.antorchas = []
  juegoObj.turnos = []
  juegoObj.contador = 0
  juegoObj.mano = []
  juegoObj.encuentro = ''
  juegoObj.accion = ''
  juegoObj.ultimaCarta = null
  juegoObj.favorDivino = false
  juegoObj.puntosVida = 10
  juegoObj.mensaje = ''
  juegoObj.retornar = 0
  juegoObj.fin = false
  return juegoObj
}