<template>
  <!-- 文章卡片：统一结构，根据传入props显示不同内容 -->
  <div class="article-card">
    <!-- 文章封面图 -->
    <div class="article-img-container" v-if="article.image">
      <img :src="article.image" :alt="article.title" class="article-img">
    </div>
    
    <!-- 文章内容区域 -->
    <div class="article-content">
      <!-- 文章分类标签 -->
      <span class="article-category">{{ article.category }}</span>
      
      <!-- 文章标题（可点击跳转详情页） -->
      <h3 class="article-title" @click="navigateToDetail">
        {{ article.title }}
      </h3>
      
      <!-- 文章摘要 -->
      <p class="article-summary">{{ article.summary }}</p>
      
      <!-- 文章底部信息：作者/日期/阅读量 + 操作按钮 -->
      <div class="article-footer">
        <!-- 左侧：基础信息（根据场景显示不同内容） -->
        <div class="article-meta">
          <!-- 我的文章/收藏：显示作者+发布日期 -->
          <span v-if="!showDate" class="meta-item">
            {{ article.author || '我' }} · {{ article.publishDate }}
          </span>
          <!-- 阅读历史：显示阅读日期（优先级高于发布日期） -->
          <span v-if="showDate" class="meta-item">
            阅读于 {{ article.readDate }}
          </span>
          
          <!-- 显示阅读量（所有场景都显示） -->
          <span class="meta-item">
            <i class="icon-eye"></i> {{ formatNumber(article.readCount) }}
          </span>
          
          <!-- 我的文章：额外显示评论数 -->
          <span v-if="isOwner && article.commentCount" class="meta-item">
            <i class="icon-comment"></i> {{ formatNumber(article.commentCount) }}
          </span>
        </div>
        
        <!-- 右侧：操作按钮（根据场景差异化显示） -->
        <div class="article-actions">
          <!-- 我的文章：显示“删除”按钮 -->
          <button 
            class="action-btn delete-btn" 
            v-if="isOwner"
            @click="handleDelete"
          >
            删除
          </button>
          
          <!-- 我的收藏：显示“取消收藏”按钮 -->
          <button 
            class="action-btn cancel-collect-btn" 
            v-if="showCollection"
            @click="handleCancelCollection"
          >
            取消收藏
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';  // 注意这里移除了对 emit 的导入

// 1. 定义接收的props
const props = defineProps({
  // 保持不变...
  article: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      title: '',
      summary: '',
      category: '',
      publishDate: '',
      readCount: 0,
      image: ''
    })
  },
  isOwner: {
    type: Boolean,
    default: false
  },
  showCollection: {
    type: Boolean,
    default: false
  },
  showDate: {
    type: Boolean,
    default: false
  }
});

// 2. 路由实例
const router = useRouter();

// 3. 事件派发（直接使用 defineEmits，无需声明变量）
defineEmits(['delete-article', 'remove-collection']);

// 4. 点击文章标题，跳转至文章详情页
const navigateToDetail = () => {
  router.push(`/article/detail/${props.article.id}`);
};

// 5. 处理“删除文章”
const handleDelete = () => {
  // 直接使用 emit 函数（由 defineEmits 自动创建）
  emit('delete-article', props.article.id);
};

// 6. 处理“取消收藏”
const handleCancelCollection = () => {
  emit('remove-collection', props.article.id);
};

// 7. 格式化数字
const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
};
</script>

<style scoped>
/* 文章卡片整体样式 */
.article-card {
  display: flex;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.article-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* 文章封面图（左侧，占比30%） */
.article-img-container {
  width: 30%;
  min-width: 120px;
}

.article-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; /* 消除图片底部空隙 */
}

/* 文章内容区域（右侧，占比70%，带内边距） */
.article-content {
  width: 70%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 文章分类标签 */
.article-category {
  display: inline-block;
  font-size: 12px;
  color: #2563eb;
  background-color: #eff6ff;
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}

/* 文章标题 */
.article-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.article-title:hover {
  color: #2563eb;
}

/* 文章摘要 */
.article-summary {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 最多显示2行，超出省略 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 文章底部：元信息 + 操作按钮 */
.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9ca3af;
}

/* 左侧元信息（作者/日期/阅读量） */
.article-meta {
  display: flex;
  gap: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 图标样式（模拟简单图标，实际项目可用Icon组件） */
.icon-eye::before {
  content: '👁️';
  font-size: 14px;
}

.icon-comment::before {
  content: '💬';
  font-size: 14px;
}

/* 右侧操作按钮 */
.article-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

/* 删除按钮样式（红色系） */
.delete-btn {
  background-color: #fee2e2;
  color: #ef4444;
}

.delete-btn:hover {
  background-color: #fca5a5;
}

/* 取消收藏按钮样式（蓝色系） */
.cancel-collect-btn {
  background-color: #eff6ff;
  color: #2563eb;
}

.cancel-collect-btn:hover {
  background-color: #dbeafe;
}

/* 响应式：手机端（屏幕≤768px）调整布局为上下结构 */
@media (max-width: 768px) {
  .article-card {
    flex-direction: column;
  }
  
  .article-img-container {
    width: 100%;
    height: 140px; /* 固定图片高度，避免拉伸 */
  }
  
  .article-content {
    width: 100%;
    padding: 12px;
  }
  
  .article-summary {
    -webkit-line-clamp: 1; /* 手机端只显示1行摘要 */
  }
  
  .article-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>