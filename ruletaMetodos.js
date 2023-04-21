class Ruleta {
    constructor() {
      this.numeros = Array.from({length: 37}, (_, i) => i); // Lista de números del 0 al 36
      this.resultadoActual = null;
      this.jugadores = [];
      this.apuestaActual = {};
    }
    
    girar() {
      this.resultadoActual = this.numeros[Math.floor(Math.random() * this.numeros.length)]; // Generar número aleatorio
    }
    
    agregarJugador(jugador) {
      this.jugadores.push(jugador);
    }
    
    eliminarJugador(jugador) {
      this.jugadores = this.jugadores.filter(j => j !== jugador);
    }
    
    realizarApuesta(jugador, tipoApuesta, monto) {
      this.apuestaActual[jugador] = {tipo: tipoApuesta, monto: monto};
    }
    
    pagoApuestas() {
      const apuestasGanadoras = [];
      const ganancias = {};
      
      // Verificar apuestas ganadoras
      for (const jugador in this.apuestaActual) {
        const apuesta = this.apuestaActual[jugador];
        switch (apuesta.tipo) {
          case "número":
            if (this.resultadoActual === apuesta.monto) {
              apuestasGanadoras.push(jugador);
            }
            break;
          case "color":
            if ((this.resultadoActual % 2 === 0 && apuesta.monto === "negro") || 
                (this.resultadoActual % 2 === 1 && apuesta.monto === "rojo")) {
              apuestasGanadoras.push(jugador);
            }
            break;
          case "paridad":
            if ((this.resultadoActual % 2 === 0 && apuesta.monto === "par") ||
                (this.resultadoActual % 2 === 1 && apuesta.monto === "impar")) {
              apuestasGanadoras.push(jugador);
            }
            break;
          default:
            throw new Error("Tipo de apuesta inválido");
        }
      }
      
      // Calcular ganancias y actualizar balances
      for (const jugador of apuestasGanadoras) {
        const apuesta = this.apuestaActual[jugador];
        let ganancia = 0;
        switch (apuesta.tipo) {
          case "número":
            ganancia = apuesta.monto * 35; // Paga 35 veces el monto apostado
            break;
          case "color":
          case "paridad":
            ganancia = apuesta.monto * 2; // Paga el doble del monto apostado
            break;
        }
        ganancias[jugador] = ganancia;
      }
      
      for (const jugador in ganancias) {
        const ganancia = ganancias[jugador];
        const jugadorObj = this.jugadores.find(j => j.nombre === jugador);
        if (jugadorObj) {
          jugadorObj.balance += ganancia;
        }
      }
      
      // Limpiar apuesta actual
      this.apuestaActual = {};
    }
  }
  