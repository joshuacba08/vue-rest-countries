// importo createRouter y createWebHistory de vue-router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/', // la ruta
        name: 'Home', // el nombre de la ruta
        component: () => import('../pages/Home.vue') // el componente que se va a renderizar
    },
    {
        path: '/detail/:alpha3Code', // le paso un parametro dinamico
        name: 'Detail',
        component: () => import('../pages/Detail.vue')
    }
]

const router = createRouter({
    history: createWebHistory(), // le paso el modo de history
    routes // le paso las rutas que cree arriba
})

export default router