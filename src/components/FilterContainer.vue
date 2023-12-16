<script setup>
const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

const query = "";
</script>

<template>
  <div class="flex justify-between flex-wrap gap-10">
    <!-- input search -->
    <div class="bg-darkBlue px-6 py-3 rounded-md flex items-center gap-2">
      <button @click="$emit('handleQuery', query)">
        <img src="../assets/icons/search.svg" alt="" />
      </button>
      <input
        v-model="query"
        class="text-white"
        type="text"
        placeholder="Search for a country..."
      />
    </div>

    <!-- filter by region -->
    <select class="bg-darkBlue px-6 py-3 rounded-md text-white">
      <option selected disabled value="">Filter by Region</option>
      <option v-for="region in regions" :key="region" :value="region">
        {{ region }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
