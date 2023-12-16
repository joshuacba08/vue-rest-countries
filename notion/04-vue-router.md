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

Para configurar Vue Router, debemos crear un archivo llamado `src/routes/router.js` dentro de la carpeta `src/routes` y dentro de este archivo debemos escribir el siguiente código:

```js
			

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

## Creando rutas

Para crear rutas, debemos hacer lo siguiente:

```js
// importo createRouter y createWebHistory de vue-router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/', // la ruta
        name: 'Home', // el nombre de la ruta
        component: () => import('../pages/Home.vue') // el componente que se va a renderizar
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import('../pages/Detail.vue')
    }
]

const router = createRouter({
    history: createWebHistory(), // le paso el modo de history
    routes // le paso las rutas que cree arriba
})

export default router
```

## Usando rutas

Para usar rutas, debemos importar el componente `router-view` en el componente `App.vue` y luego usarlo en el template. Por ejemplo:

```vue
<script setup>
    import Navbar from './components/Navbar.vue';
    import Home from './pages/Home.vue';
</script>

<template>
    <div class="bg-veryDarkBlueDark min-h-screen">
        <Navbar />

        <router-view />
    </div>
</template>

<style scoped>

</style>
```


## Rutas dinámicas

Para crear rutas dinámicas, debemos hacer lo siguiente:

```js
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
```

Luego, en el componente `Detail.vue`, podemos acceder al parámetro dinámico usando la propiedad `params` del objeto `route`. Por ejemplo:

```vue
<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const country = ref({});

    onMounted(async () => {
        const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${route.params.alpha3Code}`);
        country.value = await response.json();
    });

</script>

```

### Navegando a rutas dinámicas

Para navegar a rutas dinámicas, debemos usar el método `push` del objeto `router`. Por ejemplo:

```vue

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// props
const props = defineProps({
  country: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <article
    @click="router.push(`/detail/${country.cca3}`)"
    class="w-80 h-96 bg-darkBlue rounded shadow overflow-hidden cursor-pointer"

  >
    <img class="h-1/2 w-full object-cover" :src="country.flags.png" alt="" />
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">{{ country.name.common }}</h2>
      <p>Region: {{ country.region }}</p>
      <p>Population: {{ country.population }}</p>
    </div>
  </article>
</template>

<style scoped></style>
```

como vemos, en el evento `click` del artículo, usamos el método `push` del objeto `router` para navegar a la ruta `/detail/:alpha3Code` y le pasamos como argumento el parámetro dinámico `alpha3Code`.