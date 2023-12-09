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