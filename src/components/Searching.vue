
<script setup>
import { ref, onMounted } from 'vue';
const categoryUrl = 'http://localhost:8081/api/category';

const emit = defineEmits(['productUpdate']);
const category = ref([]);

const searchName = ref('');
const selectedCategory = ref('');
onMounted(async () => {
    await Promise.all([fetchCategory()]);
});

async function fetchCategorys() {
    try {
        const response = await fetch(categoryUrl);
        if (response.ok) {
            flavors.value = await response.json();
        }
    } catch (error) {
        console.error('Error fetching flavors:', error);
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
    <input type="text" placeholder="Search" aria-label="Produktname suchen ..."  @keyup.enter="onSearch" />/>
    <button class="filter-btn"  aria-label="Filter">
        <img src="/src/assets/images/sliders-horizontal.svg" alt="filter" class="icon" > 
    </button>

  </div>

</template>




<style scoped>
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



