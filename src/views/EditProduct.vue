<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/Button.vue';
import Popup from '@/components/Popup.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { useAuth0 } from '@auth0/auth0-vue';
 const { loginWithRedirect, logout, user, isAuthenticated,  getAccessTokenSilently } = useAuth0(); 


const popup = ref(null);

const route = useRoute();
const router = useRouter();

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/product';

const product = ref(null);
const isLoading = ref(true);
const isSaving = ref(false);


const previousPage = ref(
  router.options.history.state.back || "/"   // fallback: home
);

// 🔧 Body-Padding entfernen
onMounted(() => {
  document.body.classList.add('no-nav-padding');
  fetchProduct();
});
onUnmounted(() => {
  document.body.classList.remove('no-nav-padding');
});

// Produkt laden
async function fetchProduct() {
  try {
    const id = route.params.id;

    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Produkt nicht gefunden');

    product.value = await response.json();
  } catch (error) {
    console.error(error);
    popupRef.value?.show("Produkt konnte nicht geladen werden.", "error");
    router.push(previousPage.value);
  } finally {
    isLoading.value = false;
  }
}

// Produkt aktualisieren
async function updateProduct() {
  try {
    isSaving.value = true;
const token = await getAccessTokenSilently();
    const response = await fetch(`${API_URL}/${product.value.id}`, {
      method: "PUT",
     headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(product.value),
    });

    if (!response.ok) throw new Error();

    popup.value.show("Produkt erfolgreich aktualisiert!", "success");

    setTimeout(() => {
      router.push(previousPage.value);
    }, 800);

  } catch (err) {
    popup.value.show("Fehler beim Aktualisieren!", "error");
  } finally {
    isSaving.value = false;
  }
}



// Produkt löschen
async function deleteProduct() {

  try {
     const token = await getAccessTokenSilently();
    const response = await fetch(`${API_URL}/${product.value.id}`, {
      method: "DELETE",
       headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error();

    popup.value.show("Produkt gelöscht!", "success");

    setTimeout(() => {
      router.push(previousPage.value);
    }, 800);

  } catch (err) {
    popup.value.show("Fehler beim Löschen!", "error");
  }
}


// ✕ Button = intelligentes Zurück
function goBack() {
  router.push(previousPage.value);
}

const categories = ref([]);

async function loadCategories() {
  const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/api/category");
  categories.value = await res.json();
}

function formatCategory(c) {
  return c.charAt(0) + c.slice(1).toLowerCase();
}

onMounted(loadCategories);


</script>


<template>

  <Popup ref="popup" />
  <div class="edit-page">
    <div class="edit-card">
      <!-- Close / Zurück-Knopf -->
      <button type="button" class="close-btn" @click="goBack">
        ✕
      </button>

      <h2 class="edit-title">Produkt bearbeiten</h2>

      <div v-if="isLoading" class="loading-text">
        Lade Produkt…
      </div>

      <div v-else-if="product">
        <!-- Bildvorschau -->
        <div class="image-wrapper">
          <img :src="product.bildUrl" alt="Produktbild" class="product-image" />
        </div>

        <form @submit.prevent="updateProduct" class="edit-form">
          <div class="mb-3">
            <label class="form-label">Produkt-ID</label>
            <input class="form-control" v-model="product.id" readonly />
          </div>

          <div class="mb-3">
            <label class="form-label">Name</label>
            <input class="form-control" v-model="product.name" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Beschreibung</label>
            <textarea class="form-control" rows="3" v-model="product.beschreibung"></textarea>
          </div>

          <div class="mb-3">
            <label class="form-label">Preis</label>
            <input type="number" step="0.01" class="form-control" v-model="product.preis" />
          </div>

          <div class="mb-3">
            <label class="form-label">Bild-URL</label>
            <input class="form-control" v-model="product.bildUrl" />
          </div>


          <div class="mb-3">
            <label class="form-label">Kategorie</label>

            <DropdownMenu v-model="product.category" :options="categories" placeholder="Kategorie auswählen"
              :allowAll="false" />

          </div>


          <div class="button-row">
            <Button :disabled="isSaving" variant="dark" type="submit">
              {{ isSaving ? 'Speichere…' : 'Aktualisieren' }}
            </Button>

            <Button type="button" variant="outline" class="btn-delete" @click="deleteProduct">
              Löschen
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
 
</template>

<style scoped>
.edit-page {
  min-height: calc(100vh - 120px);
  padding: 3rem 1rem;
  background-color: var(--light-gray);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.edit-card {
  position: relative;
  width: 100%;
  max-width: 900px;
  background-color: var(--white);
  border-radius: 1.5rem;
  padding: 2.5rem 3rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
}

.edit-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: var(--zweitfarbe);
}

.loading-text {
  text-align: center;
  color: var(--medium-gray);
}

/* Close-Button oben rechts */
.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: var(--light-gray);
  color: var(--dark-gray);
  font-size: 1.2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
}

.close-btn:hover {
  background-color: var(--rose);
  color: var(--white);
}

/* Bildbereich */
.image-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.product-image {
  max-height: 260px;
  width: auto;
  border-radius: 1rem;
  object-fit: cover;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
}

/* Formular */
.edit-form .form-label {
  font-weight: 600;
  color: var(--dark-gray);
}

.edit-form .form-control,
.edit-form .form-select {
  border-radius: 0.8rem;
  border-color: var(--light-gray);
  padding: 0.6rem 0.9rem;
}

.edit-form .form-control:focus,
.edit-form .form-select:focus {
  border-color: var(--rose);
  box-shadow: 0 0 0 0.15rem rgba(180, 163, 176, 0.25);
}

/* Button-Reihe */
.button-row {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
}

/* Delete-Button im CakeLab-Style */
.btn-delete {
  background-color: #e25252;
  color: var(--white);
  border-radius: 30px;
  border: none;
}

.btn-delete:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 768px) {
  .edit-card {
    padding: 1.75rem 1.25rem;
    border-radius: 1.2rem;
  }

  .edit-page {
    padding-top: 2rem;
  }
}
</style>