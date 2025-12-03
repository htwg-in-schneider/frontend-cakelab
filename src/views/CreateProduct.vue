<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/Button.vue';

const router = useRouter();
const API_URL = 'http://localhost:8081/api/product';

const product = ref({
  name: '',
  beschreibung: '',
  preis: 0,
  bildUrl: '',
  category: 'KARAMELL', // Default, kannst du ändern
});

const isSaving = ref(false);

async function createProduct() {
  try {
    isSaving.value = true;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product.value),
    });

    if (!response.ok) {
      throw new Error(`Fehler beim Erstellen: ${response.status}`);
    }

    alert('Produkt erfolgreich erstellt!');
    router.push('/'); // zurück zur Übersicht
  } catch (error) {
    console.error('Fehler beim Erstellen des Produkts:', error);
    alert('Produkt konnte nicht erstellt werden.');
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <div class="container py-5" style="max-width: 600px;">
    <h2 class="fw-bold mb-4">Neue Torte erstellen</h2>

    <form @submit.prevent="createProduct">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input
          v-model="product.name"
          type="text"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Beschreibung</label>
        <textarea
          v-model="product.beschreibung"
          class="form-control"
          rows="3"
        ></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Preis (€)</label>
        <input
          v-model.number="product.preis"
          type="number"
          step="0.01"
          min="0"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Bild-URL</label>
        <input
          v-model="product.bildUrl"
          type="text"
          class="form-control"
          placeholder="/assets/images/Kuchen_Schokolade.png"
        />
        <div class="form-text">
          Für deine lokalen Kuchenbilder z.B.:
          <code>/assets/images/Kuchen_Schokolade.png</code>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">Kategorie</label>
        <select v-model="product.category" class="form-select">
          <option value="KARAMELL">Karamell</option>
          <option value="SCHOKOLADIG">Schokoladig</option>
          <option value="FRUCHTIG">Fruchtig</option>
        </select>
      </div>

      <Button
        type="submit"
        variant="dark"
        :disabled="isSaving"
      >
        {{ isSaving ? 'Speichere…' : 'Erstellen' }}
      </Button>
    </form>
  </div>
</template>
