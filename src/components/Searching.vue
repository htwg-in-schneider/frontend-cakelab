<script setup>
import { ref, onMounted } from 'vue';
const categoryUrl = 'http://localhost:8081/api/category';

const emit = defineEmits(['productUpdate']);
const categories = ref([]);

const searchName = ref('');
const selectedCategory = ref('');
const showFilter = ref(false);

onMounted(async () => {
    await fetchCategories();
});

async function fetchCategories() {
    try {
        const response = await fetch(categoryUrl);
        if (response.ok) {
            categories.value = await response.json();
        }
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}

function onSearch() {
    emit('productUpdate', { name: searchName.value, category: selectedCategory.value });
}

function onReset() {
    searchName.value = '';
    selectedCategory.value = '';
    emit('productUpdate');
}
</script>

<template>
  <div class="custom-search">
    <div class="search-input-wrapper">
      <input type="text" placeholder="Produktname suchen ..." aria-label="Produktname suchen ..." v-model="searchName"
             @keyup.enter="onSearch" />
      <button class="filter-toggle" @click="showFilter = !showFilter" aria-label="Filter">
        <img src="/src/assets/images/sliders-horizontal.svg" alt="filter" /> 
      </button>
    </div>

    <div v-if="showFilter" class="filter-dropdown">
      <select v-model="selectedCategory" @change="onSearch">
        <option value="">Alle Kategorien</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
      <div class="filter-buttons">
        <button class="btn search-btn" @click="onSearch">Suchen</button>
        <button class="btn reset-btn" @click="onReset">Reset</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-search {
  width: 100%;
  max-width: 600px;
  margin: 1rem auto;
  background-color: #BFA3B2;
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 14px;
}

.filter-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-toggle img {
  width: 24px;
  height: 24px;
}

.filter-dropdown {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-dropdown select {
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-buttons .btn {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.search-btn {
  background-color: #6c4a5f;
  color: white;
}

.reset-btn {
  background-color: #ddd;
  color: black;
}
</style>
