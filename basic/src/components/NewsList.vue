<template>
  <van-list
      v-model="loading"
      :finished="finished"
      class="news-list"
  >
    <!-- 核心：用icon插槽自定义封面，title插槽自定义标题 -->
    <van-cell
        v-for="item in retlist()"
        :key="item.id"
        class="news-item"
        clickable>
      <!-- 1. 自定义封面图片（完全手动控制样式） -->
      <template #icon>
        <div class="news-cover-container">
          <!-- 加加载失败的备用图，避免空白 -->
          <img
              :src="item.cover"
              class="news-cover"
              alt="新闻封面"
          >
        </div>
      </template>

      <!-- 2. 自定义标题（避免vant默认样式干扰） -->
      <template #title>
        <div class="news-title">{{ item.name }}</div>
      </template>
    </van-cell>
  </van-list>
</template>

<script setup>
import {ref} from 'vue';

// 新闻数据（不变）
const newsData = ref([
  {id: 1, name: "2025年乡村振兴工作推进会在京召开", cover: "https://picsum.photos/300/200?random=1"},
  {id: 2, name: "多地出台新政策助力农业现代化发展", cover: "https://picsum.photos/300/200?random=2"},
  {id: 3, name: "农业科技成果转化研讨会取得丰硕成果", cover: "https://picsum.photos/300/200?random=3"},
  {id: 4, name: "新型农业经营主体培育工作成效显著", cover: "https://picsum.photos/300/200?random=4"},
  {id: 5, name: "农村人居环境整治三年行动圆满收官", cover: "https://picsum.photos/300/200?random=5"}
]);

const loading = ref(false);
const finished = ref(true);

// 返回列表数据（不变）
const retlist = () => {
  return newsData.value.slice(0, 10);
};

// 图片加载失败时，显示备用图（避免空白）
const handleImgError = (e) => {
  e.target.src = "https://via.placeholder.com/80x60?text=封面缺失"; // 备用图地址
};
</script>

<style scoped>
.news-list {
  padding: 0 16px;
  background-color: #fff;
  min-height: 300px;
}

.news-item {
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
  --van-cell-icon-size: auto;
}

.news-cover-container {
  width: 80px;
  height: 60px;
  overflow: hidden;
  margin-right: 12px;
  background-color: #f5f5f5;
}

.news-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.news-title {
  font-size: 15px;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>