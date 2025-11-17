<script setup>
import FooterLink from './FooterLink.vue';
</script>

<template>
  <footer class="text-center py-4">
    <nav>
      <table>
        <tr>
          <th>User info</th>
          <th>Shop</th>
          <th>Rechtliches</th>
        </tr>

        <tr>
          <td>
            <FooterLink text="Create an account" label="Registrierung" href="/registrierung" />
          </td>

          <td>
            <FooterLink text="standard cake" label="standardCake" href="/standardCake" />
          </td>

          <td>
            <FooterLink text="Impressum" label="Impressum" href="/impressum" />
          </td>
        </tr>

        <tr>
          <td>
            <FooterLink text="Login" label="Login" href="/login" />
          </td>

          <td>
            <FooterLink text="customized cake" label="customizedCake" href="/customizedCake" />
          </td>

          <td>
            <FooterLink text="Datenschutz" label="Datenschutz" href="/datenschutz" />
          </td>
        </tr>

      </table>
    </nav>
  </footer>
</template>

<style scoped></style>
