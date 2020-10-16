//----------------------------------------------------------------------//
// Modelo de Heroe                                                      //
//----------------------------------------------------------------------//
class HeroeModel{
    constructor(id, nombre, poder, estado){
        this.id = id;
        this.nombre = nombre;
        this.poder = poder;
        // Inicializamos el estado a "vivo"
        this.estado = true;
    }
}

export default HeroeModel;