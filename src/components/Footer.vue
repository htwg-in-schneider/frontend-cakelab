<script setup>
import FooterLink from './FooterLink.vue';
</script>

<template>
  <footer class="text-center py-4">
    <nav>
       <div class="container">
            <div class="row">
                <div class="col-md-3 mb-4">
                    <img src="./assets/images/Logo.png" alt="CakeLab Logo" class="logo-img mb-2">
                </div>
                <div class="col-md-3 mb-3">
                    <h6>User info</h6>
                    <a href="#">Create an account</a><br>
                    <a href="#">Login</a>
                </div>
                <div class="col-md-3 mb-3">
                    <h6>Shop</h6>
                    <a href="#">Standard cake</a><br>
                    <a href="#">Customize cake</a>
                </div>
                <div class="col-md-3 mb-3">
                    <h6>Rechtliches</h6>
                    <a href="#">Impressum</a><br>
                    <a href="#">Datenschutz</a>
                </div>
            </div>
        </div>
    </nav>
  </footer>
</template>

<style scoped></style>
