<template>
  <div class="carousel-container">
    <!-- 移除指示器，增加容器阴影 -->
    <van-swipe
      class="swipe"
      :autoplay="3000"
      :loop="true"
      transition="fade"
      :show-indicators="false"  
    >
      <van-swipe-item v-for="(item, index) in swipeList" :key="index" class="swipe-item">
        <!-- 增加图片容器，用于实现阴影和边框效果 -->
        <div class="img-wrapper">
          <img 
            :src="item.imgUrl" 
            :alt="item.alt || '轮播图片'" 
            class="swipe-img" 
            loading="lazy"  
          />
          <!-- 底部渐变遮罩，增加层次感 -->
          <div class="img-overlay"></div>
        </div>
        <!-- 可选：添加图片标题文字 -->
        <div class="img-caption">{{ item.title }}</div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swipe from 'vant/es/swipe';
import SwipeItem from 'vant/es/swipe-item';

// 轮播图数据，增加标题信息用于展示
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
.carousel-container {
  /* 外层容器增加内边距和阴影，营造悬浮感 */
  padding: 10px;
  margin: 0 10px;
  border-radius: 16px;
  background-color: #fff;
}

.swipe {
  height: 180px; /* 适当增加高度 */
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.swipe-item {
  position: relative;
  transition: transform 0.3s ease;
}

/* 鼠标悬停时轻微放大，增强交互感 */
.swipe-item:hover {
  transform: scale(1.01);
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

/* 悬停时图片略微提亮，增强层次感 */
.swipe-item:hover .swipe-img {
  filter: brightness(1.05);
}

/* 底部渐变遮罩，让文字更清晰 */
.img-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  pointer-events: none; /* 不影响图片点击 */
}

/* 图片标题文字 */
.img-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 16px 16px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  z-index: 10; /* 确保在遮罩上方 */
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); /* 文字阴影增强可读性 */
  box-sizing: border-box;
}
</style>
