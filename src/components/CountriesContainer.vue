<script setup>
import { onMounted, onUpdated, reactive, watch } from "vue"; // importamos el hook onMounted
import CountryCard from "./CountryCard.vue";

const state = reactive({
  countries: [], // creamos un array vacío para almacenar los países filtrados
  dataCountries: [], // creamos un array vacío para almacenar los países sin filtrar que vengan de la API
}); // creamos un objeto reactivo

const props = defineProps({
  query: {
    type: String,
    required: false,
  },
});

onMounted(() => {
  // llamamos la función fetchCountries cuando el componente se monte en el DOM
  fetchCountries();
});

watch(
  () => props.query,
  () => {
    if (props.query) {
      const regex = new RegExp(`^${props.query.toLocaleLowerCase()}`, 'i'); // creamos una expresión regular para filtrar los países por nombre de acuerdo al orden de las letras
      state.countries = state.dataCountries.filter((country) =>
        regex.test(country.name.common.toLocaleLowerCase())
      );
    } else {
      state.countries = state.dataCountries;
    }
  }
);

const fetchCountries = async () => {
  // función para hacer la petición a la API
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    state.countries = data; // asignamos los datos al array de países
    state.dataCountries = data; // asignamos los datos al array de países
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="text-white mt-12">
    <ul class="flex gap-8 flex-wrap justify-center">
      <CountryCard
        v-for="country in state.countries"
        :key="country.name.common"
        :country="country"
      />
    </ul>
  </div>
</template>

<style scoped></style>
