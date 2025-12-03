<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/Button.vue';

const route = useRoute();
const router = useRouter();

const API_URL = 'http://localhost:8081/api/product';

const product = ref(null);
const isLoading = ref(true);
const isSaving = ref(false);

// Produkt laden
async function fetchProduct() {
  try {
    const id = route.params.id;

    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Produkt nicht gefunden");
    }

    product.value = await response.json();
  } catch (error) {
    console.error(error);
    alert("Produkt konnte nicht geladen werden.");
    router.push("/");
  } finally {
    isLoading.value = false;
  }
}

// Produkt aktualisieren
async function updateProduct() {
  try {
    isSaving.value = true;

    const response = await fetch(`${API_URL}/${product.value.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product.value),
    });

    if (!response.ok) {
      throw new Error("Fehler beim Aktualisieren");
    }

    alert("Produkt erfolgreich aktualisiert!");
    router.push("/");
  } catch (err) {
    console.error(err);
    alert("Produkt konnte nicht aktualisiert werden.");
  } finally {
    isSaving.value = false;
  }
}

// Produkt löschen
async function deleteProduct() {
  if (!confirm("Willst du dieses Produkt wirklich löschen?")) return;

  try {
    const response = await fetch(`${API_URL}/${product.value.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Fehler beim Löschen");
    }

    alert("Produkt gelöscht!");
    router.push("/");
  } catch (err) {
    console.error(err);
    alert("Produkt konnte nicht gelöscht werden.");
  }
}

onMounted(fetchProduct);
</script>

<template>
  <div class="container py-5" style="max-width: 600px">
    <h2 class="fw-bold mb-4">Produkt bearbeiten</h2>

    <div v-if="isLoading">Lade Produkt…</div>

    <div v-else-if="product">
      <!-- Bildvorschau -->
      <div class="text-center mb-4">
        <img
          :src="product.bildUrl"
          alt="Produktbild"
          class="img-fluid rounded"
          style="max-height: 250px; object-fit: cover"
        />
      </div>

      <form @submit.prevent="updateProduct">

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
          <select class="form-select" v-model="product.category">
            <option value="KARAMELL">Karamell</option>
            <option value="SCHOKOLADIG">Schokoladig</option>
            <option value="FRUCHTIG">Fruchtig</option>
          </select>
        </div>

        <div class="d-flex gap-2">
          <Button :disabled="isSaving" variant="dark" type="submit">
            {{ isSaving ? "Speichere…" : "Aktualisieren" }}
          </Button>

          <Button type="button" variant="outline" class="btn-danger text-white" @click="deleteProduct">
            Löschen
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
img {
  border-radius: 8px;
}
</style>
