import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash, faPlus, faThumbsUp, faThumbsDown, faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faEdit, faTrash, faPlus, faThumbsUp, faThumbsDown, faArrowLeft, faSave)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)