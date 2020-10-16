<template>
    <div>
        <h1 class="animated fadeIn slow">{{heroe.nombre}} <small>( {{heroe.aparicion}} )</small></h1>
        <hr>
        <div class="row animated fadeIn slow">
            <div class="col-md-4">
                <img :src="userWithIcon.imagen" :title="heroe.nombre" class="img-fluid shadow">
                <br><br>
                <button @click="volver()" type="button" class="btn btn-4 btn-block"><i>Volver</i></button>
            </div>
            <div class="col-md-8">
                <h3>{{heroe.nombre}}</h3>
                <hr>
                <p>{{heroe.bio}}</p>
                <div>
                    <img v-if="heroe.casa == 'DC'" src="../../assets/img/dc.png" :title="heroe.casa" class="img-fluid" width="150" height="150">
                    <img v-if="heroe.casa == 'Marvel'" src="../../assets/img/marvel.png" :title="heroe.casa" class="img-fluid" width="150" height="150">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'HeroeComponent',
    mounted(){
        // Llamamos al metodo
        //this.getHeroe();
    },  
    data(){
        return {
            heroe: []
        }
    },     
    methods: {
        // Metodo para obtener datos del articulo seleccionado
        getHeroe(){
            // Log de seguimiento
            console.log('HeroeComponent.vue - Metodo getHeroe');

            this.heroeNombre = this.$route.params.nombre; 
            for (let index = 0; index < customData.length; index++) {
                if (this.heroeNombre === customData[index].nombre){
                    // Recogemos el parametro id del articulo seleccionado
                    this.heroe = customData[index];
                }
            }
        },
        // Metodo para volver a la pagina anterior
        volver(){
            // Log de seguimiento
            console.log('HeroeComponent.vue - Metodo getHeroe');

            this.$router.push('/heroes');
        }        
    }       
}
</script>