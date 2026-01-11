<script setup>
import { ref, onMounted, watch } from "vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { useAuth0 } from "@auth0/auth0-vue";
const { isAuthenticated, getAccessTokenSilently } = useAuth0();
import { useRouter } from "vue-router";
const router = useRouter();
const users = ref([]);
const isAdmin = ref(false);
const error = ref("");
const API_USERS = import.meta.env.VITE_API_BASE_URL + "/api/users";
const API_PROFILE = import.meta.env.VITE_API_BASE_URL + "/api/profile";


async function checkAdminRole() {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_PROFILE}`, {
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

async function loadUsers() {
  try {
    const token = await getAccessTokenSilently();
    const res = await fetch(API_USERS, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    users.value = await res.json();
  } catch (e) {
    error.value = "Fehler beim Laden der Nutzer";
    console.error(e);
  }
}

onMounted(async () => {
  if (isAuthenticated.value) {
    await checkAdminRole();
    if (isAdmin.value) {
      await loadUsers();
    }
  }
});

watch(isAuthenticated, async (v) => {
  if (v) {
    await checkAdminRole();
    if (isAdmin.value) {
      await loadUsers();
    }
  }
});
</script>

<template>
  <Navbar />
<section class="page-content">
  <div class="admin-container" v-if="isAdmin">

    <h1 class="admin-dashboard"> Admin Dashboard</h1>
    <div class="titles">
      <h2 class="user-info">Kundenübersicht</h2>
      <div class="info-box" @click="router.push('/admin/orders')">
        <h2 class="admin-title">Bestellübersicht</h2>
      </div>
    </div>

    <div class="users-list">
      <div class="user-card" v-for="user in users" :key="user.id">
        <div class="user-header">
          <div>
            <div class="user-name">{{ user.name }}</div>
            <div class="user-meta">Email: {{ user.email }}</div>
            <div class="user-meta">
              Rolle:
              <span class="role-badge" :class="user.role.toLowerCase()">
                {{ user.role }}
              </span>
            </div>
          </div>
        </div>

        <div class="user-actions">
          <button class="btn-user" @click="$router.push(`/users/${user.id}`)">
            Profil →
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
  <Footer />
</template>
<style scoped>
  .page-content {
  min-height: calc(100vh - 350px);
}

.admin-container {
  padding: 30px;
  max-width: 1100px;
  margin: auto;
}

.titles {
  display: flex;
  justify-content: space-between;
  align-items: center;


}

.admin-dashboard {
  text-align: center;

}

.admin-container {
  padding: 30px;
  max-width: 1100px;
  margin: auto;
}

.admin-title,
.user-info {
  color: var(--zweitfarbe);
  font-size: 2rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 25px;
}

.user-info {
  color: var(--zweitfarbe);
}


.admin-title {
  color: var(--rose);
}

.users-list {
  display: grid;
  gap: 20px;
}

.user-card {
  background: var(--light-gray);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #ddd;
  transition: 0.25s ease;
}

.user-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.user-name {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.user-meta {
  color: var(--dark-gray);
  font-size: 0.9rem;
}

.user-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.btn-user {
  background: var(--rose);
  border: none;
  padding: 8px 18px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
  color: white;
}

.btn-order:hover {
  background: var(--zweitfarbe);
  transform: translateY(-2px);
}

.role-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 6px;
}

.role-badge.admin {
  background: var(--zweitfarbe);
  color: white;
}

.role-badge.user {
  background: #ccc;
  color: black;
}
@media (max-width: 768px) {
  .titles {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
