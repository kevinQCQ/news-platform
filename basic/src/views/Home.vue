<template>
  <div class="home-page">
    <top-bar class="top-bar"></top-bar>
    <router-view></router-view>
    <bottom-bar></bottom-bar>
  </div>
</template>



<script setup>
import TopBar from "../components/TopBar.vue";
import BottomBar from "../components/BottomBar.vue"

</script>

<style scoped>
.home-page {
  background-color: #f3f3f3;
}


.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

</style>