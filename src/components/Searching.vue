
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
    <div class="search-input-wrapper">
      <img src="/src/assets/images/magnifying-glass.svg" alt="Suchleiste" class="icon search-icon">
    <input type="text" placeholder="Produktname suchen ..." aria-label="Produktname suchen ..."   v-model="searchName"
           @keyup.enter="onSearch" />
    <button class="filter-toogle" @click="showFilter = !showFilter" aria-label="Filter">
        <img src="/src/assets/images/sliders-horizontal.svg" alt="filter"  /> 
    </button>
  </div>
                       <div v-if="showFilter" class="filter-dropdown">
          <select v-model="selectedCategory" @change="onSearch">
              <option value="">Alle Kategorien</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
          <button class="btn search-btn" @click="onSearch">Suchen</button>
          <button id= "btn reset-btn" @click="onReset">Reset</button>
                        
  
  </div>
</div>

</template>




<style scoped>
#search, #Reset{
  background-color: white;
}
.custom-search {
  width:100%;
  max-width: 600px;
  margin: 1rem auto;
 
  background-color: #BFA3B2;
  border-radius:12px; 
  padding: 0.5rem; 
 display : flex; 
  flex-direction:column; 
}

.search-input-wrapper input {
  flex:1;
  border: none;
 outline:none;
  flex: 1;
  padding: 0.5 rem;
  border-radius:8px; 
  font-size: 14px;
  
}
.filter-toggle{ background: transparent;
border:none;
cursor:pointer;
margin-left: 0.5rem;}
.icon {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}
.filter-drogdown{ margin-top:0.5rem;
display:flex;
flex-direction:column;
gap:0.5rem;}
.filter-buttons{ 
  display:flex;
  gap: 0.5rem;
}

.filter-buttons .btn {
  border: none;
  padding:0.5rem;
  border-radius:8px;
  cursor: pointer;
 
}
search-btn{ background-color: #6c4a5f;
color:white;}
reset-btn{ background-color: #ddd; }
</style>



