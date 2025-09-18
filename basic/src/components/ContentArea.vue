<template>
  <div class="content-area">
    <div v-show="true" class="menu-container">
      <van-grid
        :column-num="calcColumnNum"
        :class="menu - grid"
        :border="false"
      >
        <van-grid-item
          class="van-item"
          v-for="(item, id) in menuList"
          :key="id"
          :text="item.text"
          @click="handleMenuClick(item.type)"
        />
      </van-grid>
    </div>

      <carousel class="hero-left"></carousel>

    <!-- 主体两列布局：左列（要闻资讯 + 振兴动态），右列（专题专栏） -->
    <div class="main-grid">
      <!-- 左列：依次渲染 tabs，保证“振兴动态”在“要闻资讯”下方且左右对齐 -->
      <div class="left-col">
        <div class="recommend" v-for="(tab, tabIndex) in tabs" :key="tabIndex">
          <div class="recommend-header">
            <div class="recommend-title">{{ tab.title }}</div>
            <div class="more-group" @click="handleMoreClick()">
              <div class="more-text">更多</div>
              <div class="more-icon"></div>
            </div>
          </div>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <NewsList @click="toPage(tab.title)"></NewsList>
          </van-pull-refresh>
        </div>
      </div>

      <!-- 右列：专题专栏（与左列顶部对齐，统一留白与圆角） -->
      <div class="right-col">
        <div class="special-panel">
          <div class="special-header">专题专栏</div>
          <div class="special-body">
            <a class="special-card" href="javascript:void(0)" @click="goToSpecialTopic('lianghui')">
              <img src="https://picsum.photos/360/140?random=21" alt="专题" />
            </a>
            <a class="special-card" href="javascript:void(0)" @click="goToSpecialTopic('tuopingongjian')">
              <img src="https://picsum.photos/360/120?random=22" alt="专题" />
            </a>
            <ul class="special-list">
              <li class="special-item" @click="goToSpecialTopic('lianghui')">2024："两会"聚焦</li>
              <li class="special-item" @click="goToSpecialTopic('tuopingongjian')">我所经历的脱贫攻坚故事</li>
              <li class="special-item" @click="goToSpecialTopic('chengguo')">巩固拓展脱贫攻坚成果典型</li>
              <li class="special-item" @click="goToSpecialTopic('sanxiaxiang')">大学生"三下乡"活动</li>
            </ul>
          </div>
        </div>

        <!-- 学习园地：位于专题专栏下方，与上方面板保持同宽与圆角 -->
        <div class="learning-panel">
          <div class="lp-header">
            <div class="lp-title">学习园地</div>
            <button class="lp-more" @click="goToLearningCenter()">更多></button>
          </div>
          <div class="lp-tabs">
            <button 
              class="lp-tab" 
              :class="{ active: activeLearningTab === 'gaoduan' }"
              @click="switchLearningTab('gaoduan')"
            >高端观点</button>
            <button 
              class="lp-tab" 
              :class="{ active: activeLearningTab === 'shuji' }"
              @click="switchLearningTab('shuji')"
            >书记视窗</button>
            <button 
              class="lp-tab" 
              :class="{ active: activeLearningTab === 'xuexi' }"
              @click="switchLearningTab('xuexi')"
            >学而时习</button>
          </div>
          <div class="lp-body">
            <div class="lp-cards">
              <a class="lp-card" href="javascript:void(0)" @click="goToLearningArticle(1)">
                <img :src="currentLearningData.cards[0].image" :alt="currentLearningData.cards[0].title" />
                <div class="lp-caption">{{ currentLearningData.cards[0].title }}</div>
              </a>
              <a class="lp-card" href="javascript:void(0)" @click="goToLearningArticle(2)">
                <img :src="currentLearningData.cards[1].image" :alt="currentLearningData.cards[1].title" />
                <div class="lp-caption">{{ currentLearningData.cards[1].title }}</div>
              </a>
            </div>
            <ul class="lp-list">
              <li 
                class="lp-item" 
                v-for="(item, index) in currentLearningData.list" 
                :key="index"
                @click="goToLearningArticle(index + 3)"
              >{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import carousel from "./Carousel.vue";
import HeadlinePanel from "./HeadlinePanel.vue";
import NewsList from "./NewsList.vue";
import Grid from "vant/es/grid";

const router = useRouter();

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const calcColumnNum = computed(() => {
  const width = window.innerWidth;
  if (width >= 1200) return 8; // 超大屏幕
  if (width >= 992) return 6; // 大屏幕
  if (width >= 768) return 4; // 中等屏幕
  return 3;
});

function handleMoreClick(){
  router.push('/article-list');
}

function toPage(title) {
  router.push(`/special-topic/lianghui`);
}

// 专题专栏跳转函数
function goToSpecialTopic(topicId) {
  router.push(`/special-topic/${topicId}`);
}

// 学习园地相关状态和数据
const activeLearningTab = ref('gaoduan');

// 学习园地数据配置
const learningData = {
  gaoduan: {
    cards: [
      { 
        title: '中央农办：以进一步推进乡村全面振兴', 
        image: 'https://picsum.photos/360/200?random=41' 
      },
      { 
        title: '韩俊：锚定建设农业强国总体目标', 
        image: 'https://picsum.photos/360/200?random=42' 
      }
    ],
    list: [
      '魏后凯：扎实推进乡村全面振兴的根本遵循',
      '黄承伟：加强农村基层党组织建设 推进乡村全面振兴',
      '黄承伟：中国乡村振兴理论体系构建的基本问题',
      '许健民：牢牢守住不发生规模性返贫底线'
    ]
  },
  shuji: {
    cards: [
      { 
        title: '县委书记谈乡村振兴实践与思考', 
        image: 'https://picsum.photos/360/200?random=51' 
      },
      { 
        title: '村支书分享脱贫攻坚成功经验', 
        image: 'https://picsum.photos/360/200?random=52' 
      }
    ],
    list: [
      '县委书记：党建引领乡村振兴的实践探索',
      '村支书：如何带领村民脱贫致富',
      '第一书记：驻村帮扶工作的心得体会',
      '乡镇书记：推进农业现代化的思考'
    ]
  },
  xuexi: {
    cards: [
      { 
        title: '学习习近平总书记关于乡村振兴重要论述', 
        image: 'https://picsum.photos/360/200?random=61' 
      },
      { 
        title: '乡村振兴政策解读与学习要点', 
        image: 'https://picsum.photos/360/200?random=62' 
      }
    ],
    list: [
      '学习《习近平关于"三农"工作的重要论述学习读本》',
      '乡村振兴战略规划学习要点',
      '巩固拓展脱贫攻坚成果政策解读',
      '新时代"三农"工作学习指南'
    ]
  }
};

// 当前显示的学习园地数据
const currentLearningData = computed(() => {
  return learningData[activeLearningTab.value] || learningData.gaoduan;
});

// 切换学习园地标签
function switchLearningTab(tabId) {
  activeLearningTab.value = tabId;
}

// 学习园地跳转函数
function goToLearningCenter() {
  router.push('/learning-center');
}

function goToLearningArticle(articleId) {
  router.push(`/learning-article/${activeLearningTab.value}/${articleId}`);
}

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

// script 里给 menuList 加上图标地址（用线上 svg 做示例）
const menuList = ref([
  {
    text: "要闻资讯",
    type: "yaowen",
    icon: "https://img.yzcdn.cn/vant/menu-news.svg",
  },
  {
    text: "校园动态",
    type: "dongtai",
    icon: "https://img.yzcdn.cn/vant/menu-campus.svg",
  },
  {
    text: "社团活动",
    type: "huodong",
    icon: "https://img.yzcdn.cn/vant/menu-club.svg",
  },
  {
    text: "学术论坛",
    type: "luntan",
    icon: "https://img.yzcdn.cn/vant/menu-academic.svg",
  },
  {
    text: "人物专访",
    type: "zhuanfang",
    icon: "https://img.yzcdn.cn/vant/menu-interview.svg",
  },
  {
    text: "文艺创作",
    type: "chuangzuo",
    icon: "https://img.yzcdn.cn/vant/menu-art.svg",
  },
  {
    text: "学习交流",
    type: "jiaoliu",
    icon: "https://img.yzcdn.cn/vant/menu-study.svg",
  },
  {
    text: "关于我们",
    type: "about",
    icon: "https://img.yzcdn.cn/vant/menu-about.svg",
  },
]);

// 1. 轮播图数据（保持简洁，实际项目可加alt文案）
const swipeList = ref([
  { imgUrl: "https://picsum.photos/800/300?random=1", alt: "轮播图1" },
  { imgUrl: "https://picsum.photos/800/300?random=2", alt: "轮播图2" },
  { imgUrl: "https://picsum.photos/800/300?random=3", alt: "轮播图3" },
]);

// 3. 列表配置（动态tabs，独立数据状态，避免重复逻辑）
const tabs = ref([
  {
    title: "要闻资讯",
    list: [],
    loading: false,
    finished: false,
    page: 1, // 独立页码，避免交叉影响
  },
  {
    title: "振兴动态",
    list: [],
    loading: false,
    finished: false,
    page: 1,
  },
]);

const retlist = () => {
  return newsData.value.slice(0, 3);
};


function handleMenuClick(){

  router.push('/article-list');
}
</script>

<style scoped>
/* 菜单网格背景改为白色 */
.menu-grid {
  background-color: #fff; /* 修改为白色 */
}
/* 菜单容器背景改为白色 */
.menu-container {
  margin-top: 65px;
  background-color: #fff; /* 添加白色背景 */
}

/* 基础容器：简化高度计算，避免溢出 */
.content-area {
  background-color: #ffffff;
  min-height: calc(100vh - 96px); /* 顶部栏46px + 底部栏50px，简化计算 */
  padding-bottom: 10px; /* 底部留空，避免被底部栏遮挡 */
}

/* 顶部：轮播 + 要闻面板 并排 */
.hero-row {
  display: flex;
  gap: 12px;
  margin: 10px;
  align-items: stretch;
}

.hero-left {
  flex: 3 1 0;
}

.hero-right {
  flex: 2 1 0;
}

/* 覆盖子组件的顶部外边距，保持对齐 */
.hero-right :deep(.panel-wrap) {
  margin-top: 0;
}

/* 去除轮播在并排时的左右外边距，避免把右侧挤出可视区 */
.hero-left :deep(.carousel-container) {
  margin: 0;
}

@media (max-width: 768px) {
  .hero-row {
    flex-direction: column;
  }
}

/* 主体两列布局 */
.main-grid {
  display: flex;
  gap: 12px;
  margin: 10px;
  align-items: flex-start;
}

.left-col {
  flex: 2 1 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.right-col {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 专题专栏样式，与左侧卡片视觉统一 */
.special-panel {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.special-header {
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  background-color: #fff;
}

.special-body {
  padding: 10px 12px 12px;
}

.special-card {
  display: block;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.special-card img {
  width: 100%;
  height: auto;
  display: block;
}

.special-list {
  margin-top: 6px;
}

.special-item {
  font-size: 14px;
  color: #555;
  line-height: 1.8;
  cursor: pointer;
  transition: color 0.2s ease;
}

.special-item:hover {
  color: #ff0000;
}

.special-card {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.special-card:hover {
  opacity: 0.8;
}

/* 学习园地样式（与截图排版一致） */
.learning-panel {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.lp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 6px;
}

.lp-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.lp-more {
  background: none;
  border: none;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.lp-tabs {
  display: flex;
  gap: 16px;
  padding: 6px 16px 8px;
}

.lp-tab {
  border: none;
  background-color: #f7f7f7;
  color: #333;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.lp-tab.active {
  background-color: #ffefe6;
  color: #ff6700;
}

.lp-body {
  padding: 0 12px 12px;
}

.lp-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 8px;
}

.lp-card {
  position: relative;
  display: block;
  border-radius: 8px;
  overflow: hidden;
}

.lp-card img {
  width: 100%;
  height: auto;
  display: block;
}

.lp-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 8px 10px;
  font-size: 14px;
  color: #fff;
  background: linear-gradient(transparent, rgba(0,0,0,0.55));
}

.lp-list { margin-top: 6px; }
.lp-item {
  font-size: 14px;
  color: #333;
  line-height: 1.9;
  list-style: none;
  position: relative;
  padding-left: 16px;
  cursor: pointer;
  transition: color 0.2s ease;
}
.lp-item::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0.85em;
  width: 4px;
  height: 4px;
  background-color: #333;
  border-radius: 50%;
}
.lp-item:hover {
  color: #ff0000;
}

.lp-card {
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.lp-card:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .main-grid {
    flex-direction: column;
  }
}

/* 分类导航：简化间距，统一视觉 */
.category {
  background-color: #fff;
  padding: 12px 0;
  margin: 10px 10px 0; /* 与轮播图错开，增加呼吸感 */
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.category-grid {
  padding: 0 8px;
}
.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px; /* 简化间距写法 */
}
.icon-img {
  width: 36px; /* 缩小图标，更精致 */
  height: 36px;
  border-radius: 50%;
  object-fit: cover; /* 避免图标变形 */
}
.category-name {
  font-size: 12px;
  color: #333; /* 加深颜色，提升可读性 */
}

/* 推荐列表：精简边框，优化间距 */
.recommend {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden; /* 确保圆角生效 */
}
.recommend-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding: 12px 16px; /* 左右加大内边距，更舒展 */
}
.recommend-list {
  padding: 8px 16px 16px; /* 顶部留空，底部加大，避免加载文案拥挤 */
}
/* 卡片：简化样式，增加过渡 */
.recommend-card {
  margin-top: 10px;
  border: none !important; /* 清除vant默认边框 */
  box-shadow: none !important;
}
.van-card__title {
  font-size: 15px !important;
  color: #333 !important;
  line-height: 1.4 !important;
  margin-bottom: 4px !important;
}
.van-card__desc {
  font-size: 12px !important;
  color: #666 !important;
  line-height: 1.3 !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important; /* 最多两行，避免溢出 */
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
}
.van-card__thumb {
  width: 120px !important; /* 增加图片宽度 */
  height: 80px !important;
  border-radius: 6px !important;
}
/* 卡片底部：简化间距 */
.card-footer {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #999;
  margin-top: 6px;
}
/* 卡片点击反馈 */
.card-hover {
  background-color: #fafafa !important;
  transition: background-color 0.2s ease;
}

/* 加载状态优化：居中显示 */
.van-list__loading,
.van-list__finished {
  padding: 12px 0 !important;
  font-size: 12px !important;
  color: #999 !important;
}
.recommend-header {
  display: flex; /* 开启Flex布局 */
  align-items: center; /* 子元素垂直居中（避免文字/图标上下错位） */
  justify-content: space-between; /* 左右元素分别靠最左、最右 */
  padding: 12px 16px; /* 内边距，让内容不贴边 */
  background-color: #fff;
}

/* 2. 左侧标题：基础样式 */
.recommend-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 3. 右侧组合：包裹文字和图标，确保两者紧密排列 */
.more-group {
  display: flex; /* 子元素（文字+图标）水平排列 */
  align-items: center; /* 文字和图标垂直居中 */
  gap: 4px; /* 文字和图标之间的间距（可调整） */
  color: #666; /* 右侧文字/图标的颜色（比标题浅，主次分明） */
  cursor: pointer; /* 鼠标悬浮变指针，提示可点击 */
}

/* 4. 更多文字：基础样式 */
.more-text {
  font-size: 14px;
}

/* 5. 更多图标：用CSS画一个右向箭头（无需额外图片） */
.more-icon {
  width: 8px; /* 图标宽度 */
  height: 8px; /* 图标高度 */
  border-top: 1.5px solid currentColor; /* 上边框（颜色继承父元素） */
  border-right: 1.5px solid currentColor; /* 右边框 */
  transform: rotate(45deg); /* 旋转45度，变成右向箭头 */
}

/* 可选：hover效果，增强交互感 */
.more-group:hover {
  color: #ff6700; /*  hover时变主色，提示可点击 */
}
</style>