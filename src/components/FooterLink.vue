<script setup>
const props = defineProps({
  text: { type: String, required: true },
  label: { type: String, default: '' },
  href: { type: String, default: '#' }
});
</script>

<template>
  <a :href="href" class="footer-link" :aria-label="label">
    {{ text }}
  </a>
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
