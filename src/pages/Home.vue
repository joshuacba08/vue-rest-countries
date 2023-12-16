<script setup>
  import FilterContainer from '../components/FilterContainer.vue';
  import CountriesContainer from '../components/CountriesContainer.vue';

  import { onMounted, reactive } from 'vue';

  const state = reactive({
    query: '',
  });

  
</script>

<template>
    <main class="px-4 py-6">
        <FilterContainer @handleQuery=" (query) => { state.query = query }" />
        <CountriesContainer :query="state.query"/>
    </main>
</template>

<style scoped>

</style>
