<!-- 内容导航栏 -->
<template>
  <div v-show="true" class="menu-container">
    <van-grid :column-num="calcColumnNum" class="menu-grid" :border="false">
      <van-grid-item
        class="van-item"
        v-for="item in menuList"
        :key="item.type"
        @click="handleMenuClick(item.type)"
      >
        <span class="menu-text">{{ item.text }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Grid, GridItem } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();

const menuList = ref([
  { text: "要闻资讯", type: "yaowen" },
  { text: "校园动态", type: "dongtai" },
  { text: "社团活动", type: "huodong" },
  { text: "学术论坛", type: "luntan" },
  { text: "人物专访", type: "zhuanfang" },
  { text: "文艺创作", type: "chuangzuo" },
  { text: "学习交流", type: "jiaoliu" },
  { text: "关于我们", type: "about" },
]);

const calcColumnNum = ref(3);
const largeScreenWidth = 1024;

const updateColumnNum = () => {
  calcColumnNum.value =
    window.innerWidth >= largeScreenWidth ? menuList.value.length : 3;
};

onMounted(() => {
  updateColumnNum();
  window.addEventListener("resize", updateColumnNum);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateColumnNum);
});

const handleMenuClick = (type) => {
  console.log(`触发菜单点击：${type}`);
  router.push('article-list');
};
</script>

<style scoped>
/* 最外层容器设置红色背景 */
.menu-container {
  background-color: #e63946;
}

.menu-grid {
  margin: 0;
  padding: 0 15px;
}

/* 关键修复：使用新的 :deep() 语法替代 ::v-deep */
.van-item :deep(.van-grid-item__content) {
  background-color: transparent !important; /* 移除Vant内部默认白色背景 */
}

/* 网格项本身保持透明，透出外层红色 */
.van-item {
  background-color: transparent !important;
  border: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  border-radius: 6px;
  cursor: pointer;
}

/* 文字设置为白色 */
.menu-text {
  color: #ffffff !important;
  font-size: 20px;
  font-weight: 400;
}

@media (min-width: 1024px) {
  .van-item :deep(.van-grid-item__text) {
    font-size: 15px !important; /* 大屏字号 */
  }
  
}
@media (max-width: 768px) {
  /* 文字设置为白色 */
  .menu-text {
    color: #ffffff !important;
    font-size: 15px;
    font-weight: 400;
  }
}
</style>
