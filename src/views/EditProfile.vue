<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/Button.vue';
import Popup from '@/components/Popup.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { useAuth0 } from '@auth0/auth0-vue';
const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();


const popup = ref(null);
const route = useRoute();
const router = useRouter();

const API_URL = import.meta.env.VITE_API_BASE_URL + '/api/profile';
const profile = ref(null);
const isLoading = ref(true);
const isSaving = ref(false);


const previousPage = ref(
    router.options.history.state.back || "/"   // fallback: home
);


onUnmounted(() => {
    document.body.classList.remove('no-nav-padding');
});

// Profile laden
async function fetchProfile() {
    try {
        const id = route.params.id;
        const token = await getAccessTokenSilently();
        const response = await fetch(`${API_URL}/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        if (!response.ok) throw new Error('Profile nicht gefunden');

        profile.value = await response.json();
    } catch (error) {
        console.error(error);
        popup.value?.show("Profile konnte nicht geladen werden.", "error");
        router.push(previousPage.value);
    } finally {
        isLoading.value = false;
    }
}

// Profile aktualisieren
async function updateProfile() {
    try {
        const id = route.params.id;
        isSaving.value = true;
        const token = await getAccessTokenSilently();
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(profile.value),
        });

        if (!response.ok) throw new Error();

        popup.value.show("Profile erfolgreich aktualisiert!", "success");

        setTimeout(() => {
            router.push(previousPage.value);
        }, 800);

    } catch (err) {
        popup.value.show("Fehler beim Aktualisieren!", "error");
    } finally {
        isSaving.value = false;
    }
}



// Profile löschen
async function deleteProfile() {

    try {
        const id = route.params.id;
        const token = await getAccessTokenSilently();
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error();

        popup.value.show("Profile gelöscht!", "success");

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

const roles = ref([]);


onMounted(async () => {
    document.body.classList.add('no-nav-padding');

    if (isAuthenticated.value){ 
        await fetchProfile();
    }
}) ;

    

watch(isAuthenticated, async (loggedIn) => {
    if (loggedIn) {
        await fetchProfile();
    }
});

</script>


<template>

    <Popup ref="popup" />
    <div class="user-container" v-if="isAuthenticated">
        <div class="edit-page">
            <div class="edit-card">
                <!-- Close / Zurück-Knopf -->
                <button type="button" class="close-btn" @click="goBack">
                    ✕
                </button>

                <h2 class="edit-title">Profile bearbeiten</h2>

                <div v-if="isLoading" class="loading-text">
                    Lade Benutzer
                </div>

                <div v-else-if="profile">


                    <form @submit.prevent="updateProfile" class="edit-form">

                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input class="form-control" v-model="profile.name" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input class="form-control" rows="3" v-model="profile.email"></input>
                        </div>

                    
              

                <div class="button-row">
                    <Button :disabled="isSaving" variant="dark" type="submit">
                        {{ isSaving ? 'Speichere…' : 'Aktualisieren' }}
                    </Button>

                    <Button type="button" variant="outline" class="btn-delete" @click="deleteProfile">
                        Löschen
                    </Button>
                </div>
                    </form>
  </div>
               
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

.cake-image {
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