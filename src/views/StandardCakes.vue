<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ZusatzInfo from '@/components/ZusatzInfo.vue';
import Searching from '@/components/Searching.vue';
import ProductCard from '@/components/ProductCard.vue';
import { ref, onMounted, watch } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { isAuthenticated, getAccessTokenSilently } = useAuth0();
const isAdmin = ref(false);
const url = import.meta.env.VITE_API_BASE_URL + '/api/product';

const torten = ref([]);
onMounted(async () => {
  fetchProducts();
  if (isAuthenticated.value) {
    checkAdminRole();
  }
});

watch(isAuthenticated, (newValue) => {
  if (newValue) {
    checkAdminRole();
  }
});
async function checkAdminRole() {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      isAdmin.value = data.role === 'ADMIN';
    }
  } catch (error) {
    console.error('Error checking admin role:', error);
  }
}
async function fetchProducts(filters = {}) {
  try {
    const params = new URLSearchParams();

    if (filters.name && filters.name.trim() !== "") {
      params.append("name", filters.name.trim());
    }

    if (filters.category && filters.category.trim() !== "") {
      params.append("category", filters.category.trim());
    }

    const response = await fetch(`${url}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    torten.value = await response.json(); 
    console.log("Produkte geladen:", torten.value);

  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

onMounted(() => {
  fetchProducts(); 
});
</script>

<template>
  <Navbar />
  <ZusatzInfo />
  <Searching @productUpdate="fetchProducts" />
  

    <!-- HEADER + ICON ALS FLEX-BOX -->
  <div class="d-flex align-items-center justify-content-between mb-3">
  <div>
    <h1 class="fw-bold mb-2 d-flex align-items-center">
      Standard cakes
    </h1>
    <p class="text-muted" style="max-width: 500px;">
      Wähle aus unseren beliebtesten Standardtorten, bereit zum Bestellen und Genießen.
    </p>
  </div>

  <!-- Add Icon -->
   <div v-if="isAdmin">
  <RouterLink to="/product/create" class="icon-wrapper">
    <img src="\assets\images\plus_icon.png" alt="Torte hinzufügen" class="add-icon" />
  </RouterLink>
</div>
  

    <div class="row g-4 mt-4">
      <div v-for="item in torten" :key="item.id" class="col-12 col-md-6 col-lg-4">
        <ProductCard :product="item" :show-edit-button="isAdmin"  />
      </div>
    </div>

  </div>

  <Footer />
</template>

<style scoped>
.add-icon {
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: 0.2s ease;
}

.add-icon:hover {
  transform: scale(1.1);
}

.icon-wrapper {
  display: flex;
  align-items: center;
}
</style>