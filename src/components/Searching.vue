
<script setup>
</script>
<template>
  <div class="custom-search">
    <ph-magnifying-glass size="20" class="icon search-icon"></ph-magnifying-glass>
    <input type="text" placeholder="Search" />
    <button class="filter-btn">
      <ph-sliders-horizontal size="20" class="icon"></ph-sliders-horizontal>
    </button>
  </div>
</template>




<style scoped>
.custom-search {
  display: flex;
  align-items: center;
  background-color: #BFA3B2;
  padding: 8px 12px;
  border-radius: 12px;
  width: 300px;
}

.custom-search input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  padding: 4px 8px;
  font-size: 14px;
  color: #333;
}

.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.search-icon {
  margin-right: 8px;
}

.filter-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: 8px;
  display: flex;
  align-items: center;
}
</style>



