<!-- zum Starten der webseite : npm run dev-->

<script setup>
import { ref } from 'vue';
import TortenGrid from './components/TortenGrid.vue'
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import ZusatzInfo from './components/ZusatzInfo.vue';
import Feedback from './components/Feedback.vue';
import Footer from './components/Footer.vue';
import AboutUs from './components/AboutUs.vue';

const showBanner = ref(true);

function closeBanner() {
    showBanner.value = false;
}
</script>

<template>
    <!-- Navbar -->
    <Navbar />

    <!-- Hero -->
    <Hero />

    <!-- Zusatzinfo -->
    <ZusatzInfo />
    <!-- Shop -->
    <TortenGrid />

    <!-- About -->
    <AboutUs />

    <!-- Feedback -->
    <Feedback />

    <!-- Footer -->
    <Footer />
</template>

<style scoped></style>
