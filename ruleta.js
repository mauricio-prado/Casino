class Ruleta {
  constructor() {
    this.numeros = Array.from(Array(37).keys()); // lista de números del 0 al 36
    this.resultado = null; // resultado actual de la ruleta
    this.jugadores = []; // lista de jugadores
    this.apuestaActual = {}; // objeto que representa la apuesta actual
  }
  
  // Método para agregar un jugador a la lista
  agregarJugador(jugador) {
    this.jugadores.push(jugador);
  }
  
  // Método para remover un jugador de la lista
  removerJugador(jugador) {
    const index = this.jugadores.indexOf(jugador);
    if (index > -1) {
      this.jugadores.splice(index, 1);
    }
  }
  
  // Método para realizar una apuesta
  realizarApuesta(jugador, numero, monto) {
    // Se verifica que el jugador esté en la lista
    if (!this.jugadores.includes(jugador)) {
      console.log(`El jugador ${jugador} no está en la mesa.`);
      return;
    }
    // Se verifica que el número sea válido
    if (!this.numeros.includes(numero)) {
      console.log(`El número ${numero} no es válido.`);
      return;
    }
    // Se actualiza la apuesta actual del jugador
    this.apuestaActual[jugador] = {numero, monto};
  }
  
  // Método para girar la ruleta y obtener el resultado
  girarRuleta() {
    this.resultado = this.numeros[Math.floor(Math.random() * this.numeros.length)];
    console.log(`La ruleta ha girado y el resultado es ${this.resultado}.`);
    // Se evalúan las apuestas de cada jugador
    for (const jugador in this.apuestaActual) {
      const apuesta = this.apuestaActual[jugador];
      if (apuesta.numero === this.resultado) {
        console.log(`El jugador ${jugador} ha ganado $${apuesta.monto * 36}.`);
      } else {
        console.log(`El jugador ${jugador} ha perdido $${apuesta.monto}.`);
      }
    }
    // Se reinicia la apuesta actual
    this.apuestaActual = {};
  }
}


