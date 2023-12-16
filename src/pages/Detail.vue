<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const state = reactive({
  country: null, // creamos un estado vacío para almacenar el país
}); // creamos un objeto reactivo

onMounted(() => {
  // llamamos la función fetchCountries cuando el componente se monte en el DOM
  fetchCountry();
});

const fetchCountry = async () => {
  // función para hacer la petición a la API
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${route.params.alpha3Code}`);
    const data = await response.json();
    state.country = data; // asignamos los datos al array de países
    console.log(state.country);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <main class="text-white">
    <h1>Country Detail {{ route.params.alpha3Code }}</h1>
    
  </main>
</template>

<style scoped></style>
