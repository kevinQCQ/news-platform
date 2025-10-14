<!-- 点击更多后的新闻列表 -->
<template>
  <main class="article-container">
    <h1 class="main-title">最新文章</h1>
    <div class="red-line"></div>
    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-indicator">
      <div class="spinner"></div>
    </div>
    
    <!-- 错误状态 -->
    <div v-if="hasError" class="error-message">
      加载文章时出错，请稍后重试
    </div>
    
    <!-- 文章列表 -->
    <div v-else class="articles-wrapper">
      <article
        v-for="article in articles"
        :key="article.id"
        class="article-card"
      >
        <div class="article-image-container">
          <img
            :src="article.image"
            :alt="article.title"
            class="article-image"
          />
        </div>
        <div class="article-content">
          <div class="article-meta">
            <span class="article-category">{{ article.category }}</span>
            <span class="article-date">{{ formatDate(article.publishedAt) }}</span>
          </div>
          <h2 class="article-title">
            {{ article.title }}
          </h2>
          <p class="article-summary">
            {{ article.summary }}
          </p>
          <button class="read-more-btn">
            阅读全文
            <svg class="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </article>
      
      <!-- 空状态 -->
      <div v-if="articles.length === 0" class="empty-state">
        暂无文章数据
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 定义文章数据
const articles = ref([]);
const isLoading = ref(true);
const hasError = ref(false);

// 格式化日期函数
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// 模拟API请求
const fetchArticles = async () => {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 模拟API返回数据
    articles.value = [
      {
        id: 1,
        title: "Vue 3.0 正式发布，带来众多新特性",
        image: "https://picsum.photos/300/200?random=1",
        summary: "Vue 3.0 是一款渐进式 JavaScript 框架的最新主要版本，带来了 Composition API、更好的 TypeScript 支持等新特性，同时保持了对Vue 2的兼容性。",
        category: "Vue",
        publishedAt: "2023-11-15T08:30:00Z"
      },
      {
        id: 2,
        title: "TailwindCSS 在现代 Web 开发中的应用",
        image: "https://picsum.photos/300/200?random=2",
        summary: "TailwindCSS 作为一种实用优先的 CSS 框架，正在改变我们编写 CSS 的方式，提供了更快的 UI 开发体验和更一致的设计系统。",
        category: "CSS",
        publishedAt: "2023-11-10T14:20:00Z"
      },
      {
        id: 3,
        title: "React 18 新特性详解",
        image: "https://picsum.photos/300/200?random=3",
        summary: "React 18 引入了自动批处理、新的 root API、Suspense 等新特性，提升了应用的性能和开发体验，同时保持了向后兼容性。",
        category: "React",
        publishedAt: "2023-11-05T10:15:00Z"
      },
      {
        id: 4,
        title: "TypeScript 在企业级项目中的实践",
        image: "https://picsum.photos/300/200?random=4",
        summary: "TypeScript 作为一种强类型 JavaScript 超集，在大型项目中提供了更好的代码可维护性和开发体验，本文分享一些企业级项目中的最佳实践。",
        category: "TypeScript",
        publishedAt: "2023-11-01T09:45:00Z"
      },
      {
        id: 5,
        title: "Webpack 5 与 Vite 的性能对比",
        image: "https://picsum.photos/300/200?random=5",
        summary: "在现代前端构建工具中，Webpack 5 和 Vite 各有优势，本文将对它们的构建速度、热更新性能和配置复杂度进行详细对比分析。",
        category: "构建工具",
        publishedAt: "2023-10-28T16:30:00Z"
      }
    ];
    
    hasError.value = false;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    hasError.value = true;
    articles.value = [];
  } finally {
    isLoading.value = false;
  }
};

// 组件挂载时获取数据
onMounted(() => {
  fetchArticles();
});
</script>

<style scoped>
/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.red-line{
  background-color: #d74339;
  width:100%;
  height:6px;
  margin-bottom: 5px;
}

/* 主容器样式 */
.article-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px;
  padding-top: 80px;
  background-color: #f9fafb;
  min-height: 100vh;
}

/* 标题样式 */
.main-title {
  font-size: 28px;
  font-weight: 700;
  color: #d74339;
  margin-bottom: 24px;
}

/* 文章列表容器 */
.articles-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 文章卡片样式 */
.article-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.article-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 文章图片容器 */
.article-image-container {
  width: 100%;
  height: 180px;
  flex-shrink: 0;
  overflow: hidden;
}

/* 文章图片样式 */
.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .article-image {
  transform: scale(1.05);
}

/* 文章内容区域 */
.article-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 文章元数据 */
.article-meta {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
}

/* 文章分类标签 */
.article-category {
  background-color: #eff6ff;
  color: #2563eb;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 500;
}

/* 文章日期 */
.article-date {
  color: #6b7280;
  margin-left: 8px;
}

/* 文章标题 */
.article-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.article-card:hover .article-title {
  color: #2563eb;
}

/* 文章摘要 */
.article-summary {
  color: #4b5563;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  margin-bottom: 12px;
  line-height: 1.5;
}

/* 阅读更多按钮 */
.read-more-btn {
  color: #2563eb;
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease;
  margin-top: auto;
}

.read-more-btn:hover {
  color: #1d4ed8;
}

/* 箭头图标 */
.arrow-icon {
  width: 16px;
  height: 16px;
  margin-left: 4px;
}

/* 加载指示器 */
.loading-indicator {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

/* 加载动画 */
.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #dbeafe;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 错误消息 */
.error-message {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 24px;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #6b7280;
}

/* 响应式调整 - 中等屏幕及以上 */
@media (min-width: 768px) {
  .article-card {
    flex-direction: row;
  }
  
  .article-image-container {
    width: 192px;
    height: auto;
  }
  
  .article-content {
    padding: 24px;
  }
  
  .main-title {
    font-size: 32px;
  }
  
  .article-title {
    font-size: 20px;
  }
  
  .article-summary {
    font-size: 16px;
  }
}
</style>
