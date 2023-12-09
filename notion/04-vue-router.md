# Vue Router

Como hemos visto hasta ahora, lo que estamos creando con Vue es una SPA (Single Page Application), es decir, una aplicación de una sola página. Esto quiere decir que, aunque tengamos varias rutas, todas estas rutas se renderizan en la misma página. Esto es posible gracias a que Vue tiene un sistema de enrutamiento que nos permite cambiar la ruta de la página sin tener que recargarla. Este sistema de enrutamiento se llama Vue Router.

Lo que hace Vue Router es ir cambiando la ruta de la página sin tener que recargarla y mostrar el componente que corresponde a esa ruta. Por ejemplo, si tenemos una ruta `/home` y otra ruta `/about`, Vue Router va a mostrar el componente `Home` cuando la ruta sea `/home` y va a mostrar el componente `About` cuando la ruta sea `/about`.

## Qué es Vue Router

Vue Router es un sistema de enrutamiento para Vue.js. Este sistema de enrutamiento nos permite crear una SPA (Single Page Application) con múltiples rutas. Esto quiere decir que, aunque tengamos varias rutas, todas estas rutas se renderizan en la misma página. Esto es posible gracias a que Vue Router tiene un sistema de enrutamiento que nos permite cambiar la ruta de la página sin tener que recargarla.

## Instalación

Para instalar Vue Router, debemos ejecutar el siguiente comando:

```bash
npm install vue-router@4
```

## Configuración

Para configurar Vue Router, debemos crear un archivo llamado `router.js` dentro de la carpeta `src` y dentro de este archivo debemos escribir el siguiente código:

```js
import { createRouter, createWebHistory } from 'vue-router'

const routes = []

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```

En este código, primero importamos las funciones `createRouter` y `createWebHistory` de `vue-router`. Luego, creamos una constante llamada `routes` que es un arreglo vacío. Luego, creamos una constante llamada `router` que es el resultado de ejecutar la función `createRouter` y le pasamos como argumento un objeto con dos propiedades:

- `history`: Esta propiedad es el resultado de ejecutar la función `createWebHistory`.

- `routes`: Esta propiedad es el arreglo `routes` que creamos anteriormente.

Finalmente, exportamos la constante `router`.

## Usando Vue Router

Para usar Vue Router, debemos importar el archivo `router.js` en el archivo `main.js` y luego pasarlo como argumento a la función `createApp`. Por ejemplo:

```js   
import { createApp } from 'vue'
import App from './App.vue'


import router from './router'

createApp(App).use(router).mount('#app')
```
