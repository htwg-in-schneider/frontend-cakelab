<script setup>
const props = defineProps({
  text: { type: String, required: true },
  to:   { type: String, required: true }
});
</script>

<template>
  <router-link :to="to" class="footer-link">
    {{ text }}
  </router-link>
</template>

<style scoped>
.footer-link {
  display: block;
  color: #aaa;
  text-decoration: none;
  margin-bottom: 4px;
}

.footer-link:hover {
  opacity: 0.8;
}
</style>
