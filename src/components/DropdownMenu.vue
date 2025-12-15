<script setup>
  
import { defineProps, defineModel } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()


const model = defineModel(); // v-model wrapper

const props = defineProps({
  options: { type: Array, required: true },
  placeholder: { type: String, default: "Bitte wählen…" },
  allowAll: { type: Boolean, default: true }
});
</script>

<template>

 <v-select
  :options="props.allowAll ? props.options : props.options.filter(o => o !== 'Alle Kategorien')"
  v-model="model"
  :placeholder="props.placeholder"
  class="styled-dropdown"
/>

</template>

<style scoped>

/* --- Kopfbereich (geschlossener Zustand) --- */
.styled-dropdown :deep(.vs__dropdown-toggle) {
  border-radius: 30px;
  background: var(--white);
  border: 2px solid var(--zweitfarbe);
  padding: 12px 18px;
  display: flex;
  align-items: center;
  height: 46px;
}

/* Cursor entfernen + bessere UX */
.styled-dropdown :deep(.vs__search),
.styled-dropdown :deep(.vs__dropdown-toggle) {
  cursor: pointer;
  caret-color: transparent;
}

/* SELECTED VALUE Farbe */
.styled-dropdown :deep(.vs__selected) {
  color: var(--dark-gray);
 
  font-weight: 500;
  display: flex;
  align-items: center;
}


/* --- Dropdown Menü --- */
.styled-dropdown :deep(.vs__dropdown-menu) {
  background: var(--white);
  border-radius: 16px;
  border: 1px solid var(--rose);
  padding: 6px 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

/* --- Option Normal --- */
.styled-dropdown :deep(.vs__option) {
  padding: 10px 16px;
  font-size: 15px;
  color: var(--dark-gray);
}

/* Hover & Tastatur-Highlight */
.styled-dropdown :deep(.vs__dropdown-option--highlight) {
  background: var(--rose) ;
  color: var(--white);
}

.styled-dropdown :deep(.vs__dropdown-option--selected) {
  background: var(--zweitfarbe);
  color: var(--white) ;
}

/* --- Entfernt das X zum Löschen --- */
.styled-dropdown :deep(.vs__clear) {
  display: none;
}


</style>