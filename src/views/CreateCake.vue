<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/Button.vue';
import Popup from '@/components/Popup.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { useAuth0 } from '@auth0/auth0-vue';
 const {  getAccessTokenSilently  } = useAuth0(); 
const router = useRouter();
const popup = ref(null);
const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/cake';




// Body-Padding entfernen (wie Edit-Seite)
onMounted(() => {
    document.body.classList.add("no-nav-padding");
});
onUnmounted(() => {
    document.body.classList.remove("no-nav-padding");
});

// Produkt-Template
const cake = ref({
    name: '',
    beschreibung: '',
    preis: 0,
    bildUrl: '',
    category: 'KARAMELL',
});

const isSaving = ref(false);

// Zurück (✕ Button)
function goBack() {
    router.push("/standard-cakes");

}

// Neues Produkt erstellen
async function createCake() {
    try {
        isSaving.value = true;
 const token = await getAccessTokenSilently();
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
            body: JSON.stringify(cake.value),
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Erstellen: ${response.status}`);
        }

        popup.value.show("Produkt erstellt!", "success");
        setTimeout(() => {
            router.push("/standard-cakes");
        }, 800);

    } catch (error) {
        console.error('Fehler beim Erstellen:', error);
        popup.value.show("Produkt konnte nicht erstellt werden!", "error");
    } finally {
        isSaving.value = false;
    }
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
    <div class="create-page">
        <div class="create-card">

            <!-- Close Button -->
            <button type="button" class="close-btn" @click="goBack">✕</button>

            <h2 class="create-title">Neue Torte erstellen</h2>

            <form @submit.prevent="createCake" class="create-form">

                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input v-model="cake.name" class="form-control" required />
                </div>

                <div class="mb-3">
                    <label class="form-label">Beschreibung</label>
                    <textarea v-model="cake.beschreibung" rows="3" class="form-control"></textarea>
                </div>

                <div class="mb-3">
                    <label class="form-label">Preis (€)</label>
                    <input v-model.number="cake.preis" type="number" step="0.01" min="0" class="form-control"
                        required />
                </div>

                <div class="mb-3">
                    <label class="form-label">Bild-URL</label>
                    <input type="url"v-model="cake.bildUrl" class="form-control"
                        placeholder="https://htwg-in-schneider.github.io/frontend-static-cakelab/Images/Kuchen_Schokolade.png" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Kategorie</label>

                    <DropdownMenu v-model="cake.category" :options="categories" placeholder="Kategorie auswählen"
                        :allowAll="false" />

                </div>


                <div class="button-row">
                    <Button type="submit" variant="dark" :disabled="isSaving">
                        {{ isSaving ? 'Speichere…' : 'Erstellen' }}
                    </Button>
                </div>

            </form>
        </div>
    </div>
    
</template>

<style scoped>
/* Page Layout */
.create-page {
    min-height: calc(100vh - 120px);
    padding: 3rem 1rem;
    background-color: var(--light-gray);
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

/* Card */
.create-card {
    position: relative;
    width: 100%;
    max-width: 900px;
    background-color: var(--white);
    border-radius: 1.5rem;
    padding: 2.5rem 3rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
}

/* Title */
.create-title {
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: 700;
    color: var(--zweitfarbe);
}

/* Close Button */
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
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
}

.close-btn:hover {
    background-color: var(--rose);
    color: var(--white);
}

/* Form styles */
.create-form .form-label {
    font-weight: 600;
    color: var(--dark-gray);
}

.create-form .form-control,
.create-form .form-select {
    border-radius: 0.8rem;
    border-color: var(--light-gray);
    padding: 0.6rem 0.9rem;
}

.create-form .form-control:focus,
.create-form .form-select:focus {
    border-color: var(--rose);
    box-shadow: 0 0 0 0.15rem rgba(180, 163, 176, 0.25);
}

/* Buttons */
.button-row {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
}

/* Responsive */
@media (max-width: 768px) {
    .create-card {
        padding: 1.75rem 1.25rem;
    }
}
</style>