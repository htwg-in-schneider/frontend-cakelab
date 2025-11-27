<script setup>
import ProductCard from "@/components/ProductCard.vue";
import { torten } from "@/data";
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Navbar />

  <div class="container mt-5 pt-5 pb-5">

    <!-- HEADER + ICON ALS FLEX-BOX -->
    <div class="d-flex align-items-start justify-content-between">

      <div>
        <h1 class="fw-bold mb-2">Standard cakes</h1>
        <p class="text-muted" style="max-width: 500px;">
         Wähle aus unseren beliebtesten Standardtorten, bereit zum Bestellen und Genießen.
        </p>
      </div>

      <img 
        src="@/assets/Images/edit_Icon.png" 
        alt="Edit" 
        class="edit-icon"
      />

    </div>

    <div class="row g-4 mt-4">
      <div v-for="item in torten" :key="item.id" class="col-12 col-md-6 col-lg-4">
        <ProductCard :product="item" />
      </div>
    </div>

  </div>

  <Footer />
</template>

<style scoped>
/* EDIT ICON */
.edit-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.edit-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

</style>