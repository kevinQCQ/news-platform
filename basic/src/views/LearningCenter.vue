<template>
  <div class="learning-center-page">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">学习园地</h1>
        <p class="page-subtitle">深入学习乡村振兴理论与实践</p>
      </div>

      <!-- 标签切换 -->
      <div class="tab-nav">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'gaoduan' }"
          @click="switchTab('gaoduan')"
        >高端观点</button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'shuji' }"
          @click="switchTab('shuji')"
        >书记视窗</button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'xuexi' }"
          @click="switchTab('xuexi')"
        >学而时习</button>
      </div>

      <!-- 内容区域 -->
      <div class="content-area">
        <div class="empty-state">
          <div class="empty-icon">📚</div>
          <h3>{{ getTabTitle() }}内容开发中</h3>
          <p>该分类的详细内容正在准备中，请稍后再来查看。</p>
          <button class="back-btn" @click="goBack">返回首页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('gaoduan');

// 切换标签
const switchTab = (tabId) => {
  activeTab.value = tabId;
};

// 获取标签标题
const getTabTitle = () => {
  const tabMap = {
    'gaoduan': '高端观点',
    'shuji': '书记视窗',
    'xuexi': '学而时习'
  };
  return tabMap[activeTab.value] || '学习园地';
};

// 返回首页
const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.learning-center-page {
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

.tab-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.tab-btn {
  padding: 12px 24px;
  border: 2px solid #ddd;
  background: white;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  border-color: #ff6700;
  color: #ff6700;
}

.tab-btn.active {
  background-color: #ff6700;
  border-color: #ff6700;
  color: white;
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

.back-btn {
  background-color: #ff6700;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.back-btn:hover {
  background-color: #e55a00;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
  
  .content-area {
    padding: 40px 20px;
  }
  
  .tab-nav {
    flex-direction: column;
    align-items: center;
  }
}
</style>
