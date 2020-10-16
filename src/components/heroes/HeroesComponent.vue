<template>
    <div>
        <h1>Listado de Heroes</h1>
        <hr>
        <div class="row">
            <div class="col text-right">
                <router-link :to="'/heroe/nuevo'" class="btn btn-outline-primary" title="Alta"><font-awesome-icon icon="plus"/> Nuevo </router-link>
            </div>
        </div>  
    </div>
</template>

<script>
// Peticiones Http
import axios from 'axios';
// EndPoint
import global from '../../conf/global.js';

export default {
    name: 'HeroesComponent',
    mounted(){
        this.cargando = false;

        // Llamamos al metodo
        this.getHeroes();
    },  
    data(){
        return {
            api: global.url,
            cargando: false,
            heroes: []
        }
    },     
    methods: {
        // Metodo para obtener datos del articulo seleccionado
        getHeroes(){
            // Log de seguimiento
            console.log('HeroeComponent.vue - Metodo getHeroes');

            this.cargando = true;

            axios.get(this.api + '/heroes.json')
                .then( res => {
                if(res.data){
                    this.heroes = res.data;
                    console.log(this.heroes);
                    this.cargando = false;
                }
            });
        }
    }  
}
</script>