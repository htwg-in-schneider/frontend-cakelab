<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
const profileData = ref(null)
const bearerToken = ref('')
const error = ref('')

const API_PROFILE = import.meta.env.VITE_API_BASE_URL + "/api/profile";

function getRoleName(constant) {
  switch (constant) {
    case 'KUNDE':
      return 'Kunde'
    case 'ADMIN':
      return 'Admin'
    case 'Gast':
      return 'Gast'
    default:
      return constant;
  }
}
onMounted(async () => {
  if (isAuthenticated.value) {
    try {
      const token = await getAccessTokenSilently()
      bearerToken.value = token
      const response = await fetch(`${API_PROFILE}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        profileData.value = await response.json()
      } else {
        error.value = `Fehler beim Laden des Profils: ${response.status} ${response.statusText}`
      }
    } catch (e) {
      error.value = `Fehler beim Laden des Profils: ${e.message}`
      console.warn('Could not get token:', e)
    }
  }
})

</script>
<template>
  <Navbar />

  <div class="whole-page">
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="isAuthenticated && user" class="whole-page">
      <div class="eclipse">

          <RouterLink to="/profile" class="circle mein-profile" active-class="active-circle">
            Mein Profil
          </RouterLink>

          <RouterLink to="/profile/orders" class="circle meine-Bestellungen" active-class="active-circle">
            Meine Bestellungen
          </RouterLink>
        </div>
        <div class="profile-card">
          <div class="card-body">

            <h3 class="profile-title">Mein Profil</h3>

            <div v-if="profileData" class="profile-info">
              <img :src="user.picture" :alt="user.name" class="profile-picture">
              <div class="profile-details">
                <h4>{{ profileData.name }}</h4>
                <p class="email">{{ profileData.email }}</p>
                <p><strong>Rolle:</strong> {{ getRoleName(profileData.role) }}</p>
              </div>
            </div>

            <div v-else class="loading-text">
              {{ error || 'Lade Profildaten...' }}
            </div>
            <div class="button-row">
              <button class="btn-updating" @click="$router.push(`/profile/${profileData.id}`)">
                Bearbeiten →
              </button>

              <RouterLink v-if="isAuthenticated" to="/login" class="btn-secondary">
                Abmelden
              </RouterLink>
            </div>
          </div>

        </div>

      </div>

      <div v-else class="alert alert-warning text-center">
        Sie sind nicht eingeloggt.
      </div>

    </div>

    <Footer />
</template>

<style scoped>
.eclipse {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: -20px; 
  gap: 20px;
  margin-bottom: 40px;
}

.circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  text-align: center;
  text-decoration: none;

  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  z-index: 2;
}

.active-circle {
  outline: 4px solid white;
  box-shadow: 0 0 0 6px var(--dark-gray);
}


.mein-profile,
.meine-Bestellungen {

  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;

  z-index: 2;
}

.meine-Bestellungen {
  color: white;
  background-color: var(--zweitfarbe);

}

.mein-profile {
  color: white;
  background-color: var(--rose);
}

.eclipse::after {
  content: "";
  position: absolute;

  height: 6px;
  width: calc(140px + 80px);

  background: #999;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1;
}

.profile-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: var(--zweitfarbe);
}

.whole-page {
  min-height: 100vh;
  background-color: var(--light-gray);

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem;
  gap: 20px;
}

.profile-card {
  width: 100%;
  height:80%;

  max-width: 1200px;       
  background: white;
  border-radius: 18px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  padding: 1rem 1.5rem;
  font-family: Poppins, sans-serif;
  font-size: 1.5rem;
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
   padding: 3rem 4rem;
  gap: 1rem;
}

.profile-info {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;

}

.profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid var(--rose);
  object-fit: cover;
}

.profile-details h4 {
  font-size: 24px;
  margin: 0 0 0.25rem 0;
  font-size: 1.4rem;
}

.profile-details .email {
  font-size: 0.95rem;
  color: var(--dark-gray);
  margin-bottom: 0.5rem;
}

.debug-info {
  margin-top: 1rem;
  background: var(--light-gray);
  padding: 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
}

.debug-info summary {
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.btn-updating {

  background: var(--rose);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 22px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
}



.btn-secondary {
  background: var(--medium-gray);
  color: white;
  border-radius: 30px;
  padding: 10px 22px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.alert-warning {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
@media (max-width: 768px) {
  .profile-card {
    max-width: 100%;
  }
   .debug-info {
    display: none;
  }
  .whole-page {
    justify-content: center;
  }
}
</style>
