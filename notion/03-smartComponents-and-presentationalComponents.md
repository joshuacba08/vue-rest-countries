# Componentes inteligentes y componentes presentacionales

## Componentes inteligentes

Los componentes inteligentes son componentes que tienen lógica y estado, estos componentes son los que se encargan de hacer las peticiones a la API y de manejar el estado de la aplicación. En nuestro caso tenemos un componente llamado `CountriesContainer.vue` que es el componente inteligente de nuestra aplicación.

### CountriesContainer.vue

Este componente será el encargado de hacer las peticiones a la API y de manejar el estado de la aplicación. Para ello usaremos fetch para hacer las peticiones a la API.

```vue
<script setup>

</script>

<template>

</template>

<style scoped>

</style>
```

### Ciclo de vida de un componente

Todos los componentes tienen un ciclo de vida, el cual se compone de diferentes hooks (funciones) que se ejecutan en diferentes momentos del ciclo de vida del componente. En nuestro caso vamos a usar el hook `onMounted` para hacer la petición a la API cuando el componente se monte en el DOM.

```vue
<script setup>
    import { onMounted } from 'vue'; // importamos el hook onMounted

    onMounted(() => {
        console.log('El componente se ha montado en el DOM');
    });
</script>

<template>

</template>

<style scoped>

</style>
```

Como se puede apreciar en la consola del navegador el mensaje se muestra cuando el componente se monta en el DOM.

![1702123227980](image/03-smartComponents-and-presentationalComponents/1702123227980.png)

### Haciendo la petición a la API

Para hacer la petición a la API vamos a usar fetch, para ello vamos a crear una función llamada `fetchCountries` dentro del bloque `<script setup>` y vamos a llamar esta función dentro del hook `onMounted` para que se ejecute cuando el componente se monte en el DOM.

```vue
<script setup>
    import { onMounted } from 'vue'; // importamos el hook onMounted

    onMounted(() => { // llamamos la función fetchCountries cuando el componente se monte en el DOM
        fetchCountries();
    });

    const fetchCountries = async () => { // función para hacer la petición a la API
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log(data);
    }
</script>

<template>

</template>

<style scoped>

</style>
```

Lo que hemos logrado es comunicarnos con la API de países y obtener los datos de todos los países del mundo, aunque por el momento solo los estamos mostrando en la consola del navegador.

![1702123775856](image/03-smartComponents-and-presentationalComponents/1702123775856.png)

Sin embargo, hay algo que nos ha quedado abstracto, y es la función `fetchCountries` que hemos creado, ya que no sabemos que hace esta función. Para abordar este tema, vamos a ver todo lo que hace esta función y explicaremos cómo JavaScript nos permite realizar tareas asíncronas.

### Asincronismo en JavaScript

JavaScript es un lenguaje de programación asíncrono, lo que quiere decir que puede ejecutar varias tareas al mismo tiempo. Para entender esto mejor, vamos a ver un ejemplo.

```js
setTimeout(() => {
    console.log('Hola');
}, 4000);

    console.log('Mundo');
```

En este ejemplo tenemos dos tareas, la primera es la función `setTimeout` que se encarga de mostrar un mensaje en la consola después de 4 segundos, y la segunda es la función `console.log` que se encarga de mostrar un mensaje en la consola de forma instantánea. Si ejecutamos este código, veremos que primero se muestra el mensaje de la función `console.log` y después de 4 segundos se muestra el mensaje de la función `setTimeout`.

Podés acceder a la doc de [setTimeout](https://developer.mozilla.org/es/docs/Web/API/setTimeout) en la MDN.

Habiendo visto esto, hablaremos sobre una de las formas más usadas que tiene JavaScript para realizar tareas asíncronas, y es mediante el uso de **promesas**.

### Promesas

Las promesas son objetos que representan la terminación o el fracaso eventual de una operación asíncrona. Las promesas son una forma de manejar las tareas asíncronas en JavaScript, y nos permiten encadenar tareas de forma asíncrona.

Podemos decir que las promesas son un valor a futuro, ya que no sabemos cuándo se va a cumplir la promesa, pero sabemos que en algún momento se va a cumplir.

Las promesas tienen tres estados:

- **Pendiente:** es el estado inicial, es decir, cuando se crea la promesa.
- **Cumplida:** es cuando la promesa se cumple.
- **Rechazada:** es cuando la promesa no se cumple.

![1702125476608](image/03-smartComponents-and-presentationalComponents/1702125476608.png)

- **then:** es un método que se ejecuta cuando la promesa se cumple.
- **catch:** es un método que se ejecuta cuando la promesa no se cumple.

Vamos a trabajar con promesas para poder realizar una solicitud a la API de países y obtener los datos de todos los países del mundo.

```js
const response = fetch('https://restcountries.com/v3.1/all')
console.log(response);
```

Si ejecutamos este código, veremos que en la consola del navegador se muestra un objeto de tipo Promise, esto quiere decir que la función `fetch` nos devuelve una promesa.

![1702125801518](image/03-smartComponents-and-presentationalComponents/1702125801518.png)

Sin embargo, este objeto de tipo Promise no nos sirve de mucho, ya que no podemos acceder a los datos de la API porque el estado de la promesa es pendiente. Para poder acceder a los datos de la API, debemos esperar a que la promesa se resuelva a través del método `then`.

```js
fetch('https://restcountries.com/v3.1/all').then( (resp)=>{
    console.log(resp);
});
```

Lo que hemos hecho es encadenar el método `then` a la promesa, y dentro de este método hemos creado una función que recibe como parámetro la respuesta de la promesa, y dentro de esta función mostramos la respuesta en la consola del navegador.

![1702126056429](image/03-smartComponents-and-presentationalComponents/1702126056429.png)

Ahora esta información ya es útil pero aún tenemos que procesarla para poder mostrarla en nuestra aplicación. Para ello vamos a convertir la respuesta de la promesa en un objeto JSON, para ello usaremos el método `json` que también nos devuelve una promesa.

```js
fetch('https://restcountries.com/v3.1/all')
    .then( resp => resp.json() )
    .then( data => console.log(data));
```

Lo que hemos hecho es encadenar otro método `then` a la promesa, el primer método `then` se encarga de convertir la respuesta de la promesa en un objeto JSON, y el segundo método `then` se encarga de mostrar los datos en la consola del navegador, esto ya que el método `json` también nos devuelve una promesa.

![1702126380486](image/03-smartComponents-and-presentationalComponents/1702126380486.png)

Ahora que ya tenemos los datos de la API en un objeto JSON, podemos acceder a los datos de los países del mundo.

#### Manejando errores con catch

Como hemos visto, las promesas tienen tres estados, y uno de ellos es el estado rechazado (`reject`), es decir, cuando la promesa no se cumple. Para manejar este estado, podemos encadenar el método `catch` a la promesa, y dentro de este método podemos crear una función que recibe como parámetro el error de la promesa, y dentro de esta función podemos mostrar el error en la consola del navegador.

```js
fetch('https://restcountries.com/v3.1/all')
    .then( resp => resp.json() )
    .then( data => console.log(data))
    .catch( error => console.log(error));
```

Evidentemente no nos va a mostrar ningún error, ya que la promesa se cumple, pero si cambiamos la URL de la API por una URL que no existe, veremos que nos muestra un error en la consola del navegador.

```js
fetch('https://restcountries.co/v3.1/all')
    .then( resp => resp.json() )
    .then( data => console.log(data))
    .catch( error => console.log(error));
```

Como se puede observar, el error que nos muestra es que la URL no existe, ya que a propósito hemos cambiado la URL de la API retirando la letra `m` de la URL.

### Async / Await una forma más simple de trabajar con promesas

Hemos visto que las promesas nos permiten realizar tareas asíncronas, pero hay una forma más simple de trabajar con promesas, y es mediante el uso de `async` y `await`.

Para esto volveremos a ver la función `fetchCountries` que habíamos creado anteriormente, y explicaremos cómo podemos usar `async` y `await` para hacer la petición a la API.

```js
const fetchCountries = async () => { // función para hacer la petición a la API
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log(data);
    }
```

Esta función es de tipo Async, lo que quiere decir que es una función asíncrona, y dentro de esta función tenemos dos variables, la primera es `response` que es la respuesta de la promesa, y la segunda es `data` que es la respuesta de la promesa convertida en un objeto JSON.

En lugar de aplicar el método `then` a la promesa, podemos usar la palabra reservada `await` para esperar a que la promesa se cumpla, y cuando la promesa se cumpla, podemos guardar la respuesta de la promesa en una variable. Para lograr que una función sea asíncrona, debemos usar la palabra reservada `async` antes de la palabra reservada `function` para funciones regulares y antes de los paréntesis de parámetros para funciones flecha.

#### Refactorizando el código para manejo de errores

Ahora que ya sabemos cómo usar `async` y `await` para hacer la petición a la API, vamos a refactorizar el código para manejar los errores de la petición a la API.

```js
const fetchCountries = async () => { // función para hacer la petición a la API
    try{
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.log(error)
    }
}
```

Lo que hemos hecho es usar la palabra reservada `try` para intentar hacer la petición a la API, y si la petición a la API falla, usamos la palabra reservada `catch` para capturar el error y mostrarlo en la consola del navegador.

Por último, reescribiremos la función `fetchCountries` para que retorne los datos de la API.

```vue
<script setup>
    import { onMounted } from 'vue'; // importamos el hook onMounted

    onMounted(() => { // llamamos la función fetchCountries cuando el componente se monte en el DOM
        fetchCountries();
    });

    const fetchCountries = async () => { // función para hacer la petición a la API
    try{
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.log(error)
    }
}
</script>

<template>

</template>

<style scoped>

</style>
```


### Guardando los datos de la API en el estado de la aplicación

Ahora que ya tenemos los datos de la API, vamos a guardarlos en el estado de la aplicación, para ello usaremos el hook `reactive` que nos permite crear un objeto reactivos, es decir, un objeto que cuando cambia sus propiedades, el componente se vuelve a renderizar.

```vue
<script setup>
    import { onMounted, reactive } from 'vue'; // importamos el hook onMounted

    const state = reactive({
        countries: [], // creamos un array vacío para almacenar los países
    }); // creamos un objeto reactivo

    onMounted(() => { // llamamos la función fetchCountries cuando el componente se monte en el DOM
        fetchCountries();
    });

    const fetchCountries = async () => { // función para hacer la petición a la API
    try{
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        state.countries = data; // asignamos los datos al array de países
    }catch(error){
        console.log(error)
    }
}
</script>

<template>

</template>

<style scoped>

</style>
```

Como podemos observar, hemos creado un objeto reactivo llamado `state` que tiene una propiedad llamada `countries` que es un array vacío, y dentro de la función `fetchCountries` hemos guardado los datos de la API en la propiedad `countries` del objeto reactivo `state`.


#### Mostrando los datos de la API en la aplicación

Ahora que ya tenemos los datos de la API en el estado de la aplicación, vamos a mostrarlos en la aplicación, para ello usaremos por el momento una etiqueta `<ul>` y dentro de esta etiqueta vamos a iterar el array de países usando la directiva `v-for` y vamos a mostrar el nombre de cada país.

```vue
<script setup>
    import { onMounted, reactive } from 'vue'; // importamos el hook onMounted

    const state = reactive({
        countries: [], // creamos un array vacío para almacenar los países
    }); // creamos un objeto reactivo

    onMounted(() => { // llamamos la función fetchCountries cuando el componente se monte en el DOM
        fetchCountries();
    });

    const fetchCountries = async () => { // función para hacer la petición a la API
    try{
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        state.countries = data; // asignamos los datos al array de países
    }catch(error){
        console.log(error)
    }
}
</script>

<template>
    <div class="text-white mt-12">
        <ul class="flex gap-8 flex-wrap justify-center">
           <article class="w-80 h-96 bg-darkBlue rounded shadow overflow-hidden" v-for="country in state.countries" :key="country.name.common">
               <img class="h-1/2 w-full object-cover" :src="country.flags.png" alt="">
            <div class="p-6">
                <h2 class="text-xl font-bold mb-4">{{country.name.common }}</h2>
                <p>Region: {{ country.region }}</p>
                <p>Population: {{ country.population }}</p>
            </div>
            </article>
        </ul>
    </div>
</template>

<style scoped>

</style>
```

Como podemos observar, hemos usado la directiva `v-for` para iterar el array de países y hemos usado la directiva `:key` para asignarle una clave única a cada país, y dentro de la etiqueta `<article>` hemos mostrado el nombre, la región y la población de cada país interpolando las propiedades del objeto `country`.

![1702130579502](image/03-smartComponents-and-presentationalComponents/1702130579502.png)

Lo que sucede es que en un momento dado el componente se monta y declara un estado inicial para el array de países, y después de un tiempo la petición a la API se cumple y el array de países cambia, pero el componente no se vuelve a renderizar, por lo que no se muestran los países en la aplicación.

