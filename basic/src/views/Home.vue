<template>
  <div class="home-page">
    <top-bar class="top-bar"></top-bar>
    <router-view></router-view>
    <bottom-bar></bottom-bar>
  </div>
</template>



<script setup>
import TopBar from "../components/TopBar.vue";
import ContentArea from "../components/ContentArea.vue"
import BottomBar from "../components/BottomBar.vue"

</script>

<style scoped>
.home-page {
  background-color: #f3f3f3; /* 页面背景色 */
}

/* 顶部栏样式 - 类名使用中划线匹配模板 */
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0; /* 与left:0配合使元素占满整个宽度 */
  z-index: 999;
}

</style>