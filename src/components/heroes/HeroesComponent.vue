<template>
    <div>
        <h1>Listado de Heroes</h1>
        <hr>
        <div class="row">
            <div class="col text-right">
                <router-link :to="'/heroe/nuevo'" class="btn btn-outline-primary" title="Alta"><font-awesome-icon icon="plus"/> Nuevo </router-link>
            </div>
        </div>  

        <table v-if="!cargando" class="table mt-3">
            <thead class="bg-custom">
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Poder</th>
                    <th scope="col">Estado</th>
                    <th scope="col" colspan="2" class="text-center">Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for=" heroe in heroes" :key="heroe.id">
                    <td>{{ heroe.nombre}}</td>
                    <td>{{ heroe.poder}}</td>
                    <td>
                        <font-awesome-icon v-if="heroe.estado" icon="thumbs-up" class="text-success fa-2x" title="Vivo" />
                        <font-awesome-icon v-if="!heroe.estado" icon="thumbs-down" class="text-danger fa-2x" title="Muerto" />
                    </td>
                    <td class="text-center">
                        <router-link :to="'/heroe/'+ heroe.id" class="btn btn-outline-warning mr-1" title="Modificar"><font-awesome-icon icon="edit"/></router-link>
                        <button class="btn btn-outline-danger" @click="borrarHeroe(heroe.id)" title="Eliminar"><font-awesome-icon icon="trash"/></button>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="5" class="bg-custom"><span><i>Copyright© - Carlos Mur</i></span></td>
                </tr>
            </tfoot>
        </table> 

        <div v-if="!cargando && !heroes" class="alert alert-warning text-center mt-3">
            <h4 class="alert-heading">No hay registros</h4>
            <p><i class="fa fa-exclamation fa-2x"></i></p>
        </div>

        <div v-if="cargando" class="alert alert-info text-center mt-3">
            <h4 class="alert-heading">Cargando</h4>
            <p><i class="fa fa-spinner fa-spin fa-2x"></i></p>
            <p class="mb-0">Espere por favor...</p>
        </div>               
    </div>
</template>

<script>
// Peticiones Http
import axios from 'axios';
// EndPoint
import global from '../../conf/global.js';
// Popup de alerta
import swal from 'sweetalert';
// Modelo para Heroe
import HeroeModel from '../../models/Heroe.js';

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
            heroes: HeroeModel
        }
    },     
    methods: {
        // Metodo para obtener datos del articulo seleccionado
        getHeroes(){
            // Log de seguimiento
            console.log('HeroesComponent.vue - Metodo getHeroes');

            this.cargando = true;

            axios.get(this.api + '/heroes.json')
                .then( res => {
                if(res.data){
                    this.heroes = this.heroesArray(res.data);
                    //console.log(this.heroes);
                    this.cargando = false;
                }
            });
        },
        // Metodo para mostrar el objeto de heroes recibido en el 'res'
        // del map y devolverlo transofrmado en un Array para mostrar
        // en pantalla
        heroesArray(heroesObj){
            // Log de seguimiento
            var heroesData = [];

            if(heroesObj === null){
                return [];
            }

            Object.keys(heroesObj).forEach( key => {
                var heroe = HeroeModel;
                heroe = heroesObj[key];
                heroe.id = key;
                // Devolvemos en el Array el objeto extraido
                heroesData.push(heroe);
            });
            return heroesData;
        },        
        // Metodo para eliminar registro
        borrarHeroe(idHeroe){
           // Log de seguimiento
            console.log("HeroesComponent.vue - Metodo borrarHeroe");
            
            // popup de confirmacion
            swal({
                title: "¿Estas seguro?",
                text: "Una vez eliminado, no podrá recuperar este archivo.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.delete(this.api + '/heroes/' + idHeroe + '.json')
                        .then(res => {
                            this.heroes = res.data;
                            // Volvemos a cargar actualizada la pantalla sin el registro eliminado
                            this.getHeroes();
                        });
                    } else {
                        swal("Tu archivo esta seguro.");
                    }
            });            

        }        
    }  
}
</script>