<template>
  <navbar/>

  <img src="/alodo.jpeg" alt="ALODO" class="h-15 w-auto mx-auto justify-center px-5 mt-24" />
  <div class="min-h-screen flex flex-col">
    <router-view />
  </div>
  <Footer/>
</template>

<script setup>
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';


</script>

