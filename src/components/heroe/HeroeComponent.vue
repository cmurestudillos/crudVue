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
                <form (ngSubmit)="guardar(formulario)" #formulario="ngForm">
                <!-- Id del registro -->
                <div class="form-group">
                    <label>Id Firebase</label>
                    <input type="text" class="form-control" placeholder="Id Firebase" [(ngModel)]="heroe.id" name="id" disabled>
                    <small class="form-text text-muted">Este campo se genera automaticamente.</small>
                </div>
                <!-- Nombre -->
                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-control" placeholder="Nombre" [(ngModel)]="heroe.nombre" name="nombre" required>
                </div>
                <!-- Poder -->
                <div class="form-group">
                    <label>Poder</label>
                    <input type="text" class="form-control" placeholder="Poder" [(ngModel)]="heroe.poder" name="poder">
                </div>
                <!-- Estado -->
                <div class="form-group">
                    <label>Estado</label>
                    <br>
                    <button v-if="heroe.estado" @click="heroe.estado = false" class="btn btn-outline-success w-25" type="button" title="Vivo"><font-awesome-icon icon="thumbs-up" title="Vivo"> Vivo </button>
                    <button v-if="!heroe.estado" @click="heroe.estado = true" class="btn btn-outline-danger w-25" type="button" title="Muerto"><font-awesome-icon icon="thumbs-down" title="Muerto"> Muerto </button>
                </div>
                <hr>
                <div class="form-group text-center">
                    <button type="submit" class="btn btn-outline-primary w-25" title="Guardar"><font-awesome-icon icon="save" title="Guardar"> Guardar </button>
                </div>
                </form>
            </div>
        </div>           
    </div>
</template>

<script>

export default {
    name: 'HeroeComponent'
}
</script>