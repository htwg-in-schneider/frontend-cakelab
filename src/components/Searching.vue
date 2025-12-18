<script setup>
import { ref, onMounted } from 'vue';
import DropdownMenu from '@/components/DropdownMenu.vue';

const categoryUrl = import.meta.env.VITE_API_BASE_URL + '/api/category';

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
  emit("productUpdate", {
    name: searchName.value,
    category: selectedCategory.value === "Alle Kategorien" ? "" : selectedCategory.value
  });
}


function onReset() {
  searchName.value = '';
  selectedCategory.value = '';
  emit('productUpdate');
}
</script>

<template>
  <div class="search-container">

    <!-- Suchleiste -->
    <div class="search-bar">
      <span class="search-icon">🔍</span>

      <input type="text" placeholder="Produktname suchen …" v-model="searchName" @keyup.enter="onSearch" />

      <button class="filter-btn" @click="showFilter = !showFilter">
        <img src="/src/assets/images/sliders-horizontal.svg" alt="Filter" />
      </button>
    </div>

    <!-- Dropdown -->
    <transition name="slide">
      <div v-if="showFilter" class="filter-panel">

        <label class="filter-label">Kategorie</label>
        <DropdownMenu v-model="selectedCategory" :options="['Alle Kategorien', ...categories]"
          placeholder="Alle Kategorien" :allowAll="true" />


        <div class="filter-actions">
          <button class="btn btn-primary" @click="onSearch">Suchen</button>
          <button class="btn btn-reset" @click="onReset">Reset</button>
        </div>

      </div>
    </transition>

  </div>
</template>


<style scoped>
.search-container {
  width: 100%;
  max-width: 650px;
  margin: 2rem auto;
  padding: 1rem;
  border-radius: 30px;
  background: var(--rose);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

/* Suchfeld */
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--white);
  border-radius: 30px;
  padding: 0.7rem 1rem;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.05);
}

.search-icon {
  opacity: 0.6;
  font-size: 18px;
  color: var(--dark-gray);
}

.search-bar input {
  flex: 1;
  font-size: 15px;
  border: none;
  outline: none;
  background: transparent;
}

/* Filter Button */
.filter-btn {
  background: var(--zweitfarbe);
  border: none;
  padding: 0.45rem 0.6rem;
  border-radius: 10px;
  cursor: pointer;
}

.filter-btn img {
  width: 18px;
  filter: invert(100%);
}

/* Panel */
.filter-panel {
  margin-top: 0.9rem;
  background: var(--white);
  padding: 1rem;
  border-radius: 30px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.filter-label {
  font-weight: 600;
  color: var(--dark-gray);
}

.filter-panel select {
  width: 100%;
  padding: 0.7rem;
  border-radius: 30px;
  border: 1px solid var(--zweitfarbe);
  font-size: 15px;
  background: var(--light-gray);
}

/* Buttons */
.filter-actions {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.8rem;
}

.btn {
  flex: 1;
  padding: 0.6rem;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

.btn-primary {
  background: var(--zweitfarbe);
  color: var(--white);
}

.btn-reset {
  background: var(--light-gray);
  color: var(--dark-gray);
}

/* Animation */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>