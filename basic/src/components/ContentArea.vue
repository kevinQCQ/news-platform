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

    <div class="defen">
      <!-- 3. 合并列表（用动态标题区分，独立数据加载） -->
      <div class="recommend" v-for="(tab, tabIndex) in tabs" :key="tabIndex">
        <!-- 父容器：用Flex控制整体排列 -->
        <div class="recommend-header">
          <!-- 左侧标题 -->
          <div class="recommend-title">{{ tab.title }}</div>

          <!-- 右侧组合：更多文字 + 图标（用div包裹，确保两者紧密联动） -->
          <div class="more-group" @click="handleMoreClick()">
            <div class="more-text" >更多</div>
            <!-- 用CSS画简单箭头图标（也可替换为img/svg） -->
            <div class="more-icon"></div>
          </div>
        </div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <NewsList></NewsList>
        </van-pull-refresh>
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

@media (min-width: 768px) {
  .defen {
    background-color: #ffffff;
    min-height: calc(100vh - 96px); /* 顶部栏46px + 底部栏50px，简化计算 */
    padding-bottom: 10px; /* 底部留空，避免被底部栏遮挡 */
    display: flex;
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
  margin: 10px;
  border-radius: 12px;
  overflow: hidden; /* 确保圆角生效 */
}
@media (min-width: 768px) {
  .recommend {
    width: 50%;
    height: 100%;
    margin: 10px auto; /* 居中显示 */
  }
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