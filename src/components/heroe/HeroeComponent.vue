<template>
    <div>
        <h1 v-if="heroe.nombre">Heroe: <small>{{heroe.nombre}}</small> </h1>
        <h1 v-if="!heroe.nombre">Heroe: <small>Nombre del heroe</small> </h1>
        <hr>

        <div class="row text-right">
            <div class="col">
                <router-link :to="'/heroes'" class="btn btn-outline-primary" title="Volver"><font-awesome-icon icon="arrow-left"/> Volver </router-link>
            </div>
        </div>     
        <div class="row">
            <div class="col">
                <form @submit.prevent="guardar">
                <!-- Id del registro -->
                <div class="form-group">
                    <label>Id Firebase</label>
                    <input type="text" class="form-control" placeholder="Id Firebase" v-model="heroe.id" name="id" disabled>
                    <small class="form-text text-muted">Este campo se genera automaticamente.</small>
                </div>
                <!-- Nombre -->
                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-control" placeholder="Nombre" v-model="heroe.nombre" name="nombre" required>
                </div>
                <!-- Poder -->
                <div class="form-group">
                    <label>Poder</label>
                    <input type="text" class="form-control" placeholder="Poder" v-model="heroe.poder" name="poder">
                </div>
                <!-- Estado -->
                <div class="form-group">
                    <label>Estado</label>
                    <br>
                    <button v-if="heroe.estado" @click="heroe.estado = false" class="btn btn-outline-success w-25" type="button" title="Vivo"><font-awesome-icon icon="thumbs-up" title="Vivo" /> Vivo </button>
                    <button v-if="!heroe.estado" @click="heroe.estado = true" class="btn btn-outline-danger w-25" type="button" title="Muerto"><font-awesome-icon icon="thumbs-down" title="Muerto" /> Muerto </button>
                </div>
                <hr>
                <div class="form-group text-center">
                    <button type="submit" class="btn btn-outline-primary w-25" title="Guardar"><font-awesome-icon icon="save" title="Guardar" /> Guardar </button>
                </div>
                </form>
            </div>
        </div>           
    </div>
</template>

<script>
// Peticiones Http
import axios from 'axios';
// Validacion del formulario
import {required} from 'vuelidate/lib/validators';
// EndPoint
import global from '../../conf/global.js';
// Popup de alerta
import swal from 'sweetalert';
// Modelo para Heroe
import HeroeModel from '../../models/Heroe.js';

export default {
    name: 'HeroeComponent',
    mounted(){
        // Recogemos el parametro id del registro seleccionado
        this.heroeId = this.$route.params.id; 
        if(this.heroeId !== 'nuevo'){
            // Editar
            this.getHeroeById(this.heroeId);
        }
    }, 
    data(){
        return {
            api: global.url,
            heroe: new HeroeModel('', '', '', '')
        }
    },  
    validations: {
        heroe:{
            nombre:{
                required
            }
        }
    },       
    methods: {
        // Metodo para obtener datos del articulo seleccionado
        getHeroeById(heroeId){
            // Log de seguimiento
            console.log('HeroeComponent.vue - Metodo getHeroeById');

            axios.get(this.api + '/heroes/' + heroeId + '.json')
            .then( res => {
                if(res.data){
                    this.heroe = res.data;
                    this.heroe.id = this.heroeId;
                }
            });
        },        
        // Metodo para guardar el registro
        guardar(){
            // Log de seguimiento
            console.log('HeroeComponent.vue - Metodo guardar');

            // Si el id de heroe esta relleno, actualizamos, sino escribimos
            if(this.heroeId !== 'nuevo'){
                axios.put(this.api + '/heroes/' + this.heroeId + '.json', this.heroe)
                .then( res => {
                    if(res.data){
                        // Popup de confirmacion
                        swal(
                            'Heroe modificado',
                            'El Heroe ha sido modificado correctamente.',
                            'success'
                        );                          
                        // Redireccionamos a Inicio una vez guardado
                        this.$router.push('/heroes');  
                    }
                })
                .catch(err => {
                    console.log(err); 
                });
            }else{
                axios.post(this.api + '/heroes.json', this.heroe)
                    .then( res => {
                    if(res.data){
                        // Popup de confirmacion
                        swal(
                            'Heroe Creado',
                            'El Heroe ha sido creado correctamente.',
                            'success'
                        );
                        // Redireccionamos a Inicio una vez guardado
                        this.$router.push('/heroes');                    
                    }
                })
                .catch(err => {
                    console.log(err); 
                }); 
            }
        }
    }         
}
</script>