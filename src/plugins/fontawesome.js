import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faEraser, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faEdit, faEraser, faPlus)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)