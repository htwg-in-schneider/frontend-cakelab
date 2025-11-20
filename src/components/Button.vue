<script setup>
const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'accent' },
  onClick: { type: Function, default: null }
});

const buttonClass = `btn btn-${props.variant}`;
</script>

<template>
  <button :type="type" :class="buttonClass" @click="onClick">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border-radius: 30px;

}

.btn-accent {
  background-color: var(--rose);
  color: black;
  padding: 0.5rem 1.5rem;
  transition: .3s;
  font-weight: 700;
  font-size: larger;
}

.btn-accent:hover {
  background-color: #a68291;
}

.btn-dark {
  background-color: var(--black);
    color: var(--white);
  padding: 0.5rem 1.5rem;
  transition: .3s;
}
.btn-dark:hover {
  opacity: 0.8;
}

</style>
