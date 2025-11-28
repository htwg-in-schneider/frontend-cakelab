<script setup>
import { useBannerStore } from '@/stores/banner'
import Button from '@/components/Button.vue'

const bannerStore = useBannerStore()
</script>

<template>
  <div 
    class="versand-info text-center py-2 d-flex justify-content-center align-items-center gap-3"
    v-if="bannerStore.isVisible"
  >
    <p class="m-0">Freier Versand für alle Bestellungen über 50€</p>

    <Button variant="banner" class="small-btn" @click="bannerStore.hideBanner">
      OK
    </Button>
  </div>
</template>

<style scoped>
.versand-info {
  background-color:rgb(72, 105, 94);
  color: var(--light-gray);
  font-weight: 600;
}

/* kleinerer Button */
.small-btn {
  padding: 0.2rem 0.9rem;
  font-size: 0.8rem;
  border-radius: 30px;
}
</style>
