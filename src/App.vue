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
