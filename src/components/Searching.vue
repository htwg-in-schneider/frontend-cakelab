
<script setup>
import { ref, onMounted } from 'vue';
const categoryUrl = 'http://localhost:8081/api/category';

const emit = defineEmits(['productUpdate']);
const categories = ref([]);

const searchName = ref('');
const selectedCategory = ref('');
const showFilter = ref(false);

onMounted(async () => {
    await Promise.all([fetchCategories()]);
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
      <img src="/src/assets/images/magnifying-glass.svg" alt="Suchleiste" class="icon search-icon">
    <input type="text" placeholder="Produktname suchen ..." aria-label="Produktname suchen ..."   v-model="searchName"
           @keyup.enter="onSearch" />/>
    <button class="filter-btn" @click="showFilter = !showFilter" aria-label="Filter">
        <img src="/src/assets/images/sliders-horizontal.svg" alt="filter"    @keyup.enter="onSearch" /> 
    </button>
                       <div v-if="showFilter" class="filter-dropdown">
          <select v-model="selectedCategory" @change="onSearch">
              <option value="">Alle Kategorien</option>
              <option v-for="category in categories" :key="category" :value="category"></option>
          </select>
          <button id="search" @click="onSearch">Suchen</button>
          <button id= "Reset" @click="onReset">Reset</button>
                        
  
  </div>
  </div>

</template>




<style scoped>
#search, #Reset{
  background-color: white;
}
.custom-search {
  display: flex;
  align-items: center;
  background-color: #BFA3B2;
  padding: 8px 12px;
  border-radius: 12px;
  width: 100%;
}

.custom-search input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  padding: 4px 8px;
  font-size: 14px;
  color: #333;
}

.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.search-icon {
  margin-right: 8px;
}

.filter-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: 8px;
  display: flex;
  align-items: center;
}
</style>



