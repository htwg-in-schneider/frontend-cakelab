<script setup>
import FooterLink from './FooterLink.vue';
</script>

<template>
  <footer class="footer row align-items-center">
    <nav>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-3 mb-4">
            <img src="/src/assets/images/Logo.png" alt="CakeLab Logo" class="logo-img mb-2">
          </div>
          <div class="col-md-3 mb-3">
            <h6>User info</h6>
            <FooterLink text="Create an account" />
            <FooterLink text="Login" />
          </div>
          <div class="col-md-3 mb-3">
            <h6>Shop</h6>
            <FooterLink text="Standard cake" />
            <FooterLink text="Customize cake" />
          </div>
          <div class="col-md-3 mb-3">
            <h6>Rechtliches</h6>
            <FooterLink text="Impressum" />
            <FooterLink text="Datenschutz" />
          </div>
        </div>


      </div>

    </nav>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--zweitfarbe);
  color: var(--black);
}
h6 {
  font-weight: bold;
}

.footer a {
  color: var(--black);
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
