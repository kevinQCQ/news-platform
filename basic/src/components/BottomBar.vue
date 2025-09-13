<template>
  <div id="bottom_bar">
    <p class="bottom-text">主办方：大学生报社</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
</script>

<style scoped>
#bottom_bar {
  display: flex;
  justify-content: center;
  background-color: #f3f3f3;
  width: 100%;
  height: 60px;
}

.bottom-text {
  margin-top: 20px;
  font-size: 10px;
  color: #666;
}
@media (min-width: 768px) {
  #bottom_bar {
    display: flex;
    justify-content: center;
    background-color: #f3f3f3;
    width: 100%;
    height: 90px;
  }
  .bottom-text {
    margin-top: 46px;
    font-size: 10px;
    color: #666;
  }
}
</style>