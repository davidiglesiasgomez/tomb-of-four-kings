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
    return 'Abrir cerraduras';
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
