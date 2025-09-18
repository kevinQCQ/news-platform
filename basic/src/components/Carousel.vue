<template>
  <div class="layout-container">
    <!-- 左侧轮播：保持不变 -->
    <div class="carousel-container">
      <van-swipe
        class="swipe"
        :autoplay="3000"
        :loop="true"
        transition="fade"
        :show-indicators="false"  
      >
        <van-swipe-item v-for="(item, index) in swipeList" :key="index" class="swipe-item">
          <div class="img-wrapper">
            <img 
              :src="item.imgUrl" 
              :alt="item.alt || '轮播图片'" 
              class="swipe-img" 
              loading="lazy"  
            />
            <div class="img-overlay"></div>
          </div>
          <div class="img-caption">{{ item.title }}</div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 1. 给右侧组件加外层容器：控制高度对齐 + 宽度占比 -->
    <div class="right-panel-container">
      <HeadlinePanel></HeadlinePanel>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swipe from 'vant/es/swipe';
import SwipeItem from 'vant/es/swipe-item';
import HeadlinePanel from './HeadlinePanel.vue';

const swipeList = ref([
  { 
    imgUrl: 'https://picsum.photos/800/300?random=1', 
    alt: '乡村振兴政策解读',
    title: '乡村振兴最新政策发布'
  },
  { 
    imgUrl: 'https://picsum.photos/800/300?random=2', 
    alt: '农业科技发展',
    title: '智慧农业技术应用案例'
  },
  { 
    imgUrl: 'https://picsum.photos/800/300?random=3', 
    alt: '农村风貌改造',
    title: '美丽乡村建设成果展示'
  }
])
</script>

<style scoped>
/* 外层布局容器：保持flex，新增align-items确保子元素高度基准一致 */
.layout-container {
background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
  max-width: 1400px;
  margin: 0 auto;
  align-items: flex-start; /* 子元素顶部对齐，避免小屏时拉伸异常 */
}

/* 左侧轮播容器：新增固定高度，作为右侧对齐的基准 */
.carousel-container {
  flex: 1 1 60%;
  margin: 4px;
  min-width: 170px;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 240px; /* 关键：给左侧加固定高度，大屏时240px */
}

/* 2. 右侧组件外层容器：关键样式！强制高度与左侧对齐 */
.right-panel-container {
  flex: 1 1 35%; /* 宽度占比与左侧匹配 */
  min-width: 320px; /* 小屏最小宽度 */
  align-self: stretch; /* 核心：让容器高度拉伸到与左侧轮播一致 */
  display: flex; /* 让内部HeadlinePanel填满容器 */
}

/* 3. 让HeadlinePanel填满外层容器（关键：避免内容少导致高度不足） */
.right-panel-container > .HeadlinePanel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; /* 内部内容垂直排列 */
}

/* 原轮播样式：swipe高度与carousel-container一致，保持稳定 */
.swipe {
  height: 100%; /* 改为100%，继承父容器高度，避免双重固定高度冲突 */
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

/* 轮播其他样式保持不变 */
.swipe-item {
  position: relative;
  transition: transform 0.3s ease;
  height: 100%; /* 确保轮播项填满swipe */
}

.img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.swipe-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.5s ease;
}

.swipe-item:hover .swipe-img {
  filter: brightness(1.05);
}

.img-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  pointer-events: none;
}

.img-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 16px 16px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  z-index: 10;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}

/* 响应式调整：小屏时统一高度 */
@media (max-width: 768px) {
  .layout-container {
    gap: 12px;
    padding: auto;
  }

  /* 小屏时轮播高度降低，右侧也同步降低 */
  .carousel-container {
    height: 180px; 
    margin: 4px;
  }

  .img-caption {
    font-size: 14px;
    padding: 16px 12px 12px;
  }
}
</style>