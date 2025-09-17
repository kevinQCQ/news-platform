<template>
  <div class="learning-article-page">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">{{ getArticleTitle() }}</h1>
        <p class="page-subtitle">{{ getCategoryTitle() }} - 学习园地</p>
      </div>

      <!-- 内容区域 -->
      <div class="content-area">
        <div class="empty-state">
          <div class="empty-icon">📖</div>
          <h3>文章内容开发中</h3>
          <p>该文章的详细内容正在准备中，请稍后再来查看。</p>
          <div class="action-buttons">
            <button class="back-btn" @click="goBack">返回首页</button>
            <button class="category-btn" @click="goToCategory">返回分类</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 获取分类标题
const getCategoryTitle = () => {
  const categoryMap = {
    'gaoduan': '高端观点',
    'shuji': '书记视窗',
    'xuexi': '学而时习'
  };
  return categoryMap[route.params.categoryId] || '学习园地';
};

// 获取文章标题
const getArticleTitle = () => {
  const articleId = route.params.articleId;
  const categoryId = route.params.categoryId;
  
  // 这里可以根据分类和文章ID返回具体标题
  // 目前返回占位标题
  return `学习文章 ${articleId}`;
};

// 返回首页
const goBack = () => {
  router.push('/');
};

// 返回分类页面
const goToCategory = () => {
  router.push('/learning-center');
};
</script>

<style scoped>
.learning-article-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-top: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 16px;
  color: #666;
}

.content-area {
  background: white;
  border-radius: 12px;
  padding: 60px 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.empty-state {
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.empty-state p {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.back-btn, .category-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.back-btn {
  background-color: #ff6700;
  color: white;
}

.back-btn:hover {
  background-color: #e55a00;
}

.category-btn {
  background-color: #f0f0f0;
  color: #333;
}

.category-btn:hover {
  background-color: #e0e0e0;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
  
  .content-area {
    padding: 40px 20px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
