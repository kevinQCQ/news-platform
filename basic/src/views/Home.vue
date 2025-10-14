<!-- ึ๗าณ -->
<template>
  <div class="home-page">
    <t-top-bar class="ttop-bar" v-if="$route.meta.showBar"></t-top-bar>
    <top-bar class="top-bar" v-if="$route.meta.showBar"></top-bar>
    <router-view class="content-area"></router-view>
    <bottom-bar v-if="$route.meta.showBar"></bottom-bar>
  </div>
</template>



<script setup>
import TopBar from "../components/TopBar.vue";
import BottomBar from "../components/BottomBar.vue"
import TTopBar from "../components/TTopbar.vue"

</script>

<style scoped>
.home-page {
  background-color: #f3f3f3;
}
.ttop-bar {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 999;
  height:30px;
}

.top-bar {
  margin-top:50px;
  left: 0;
  right: 0;
  z-index: 999;
  height:0px;
}

.content-area {
  top:0;
  margin-top: 0px;
  padding-top:0px;
  background-color: #bc3131;
}

</style>