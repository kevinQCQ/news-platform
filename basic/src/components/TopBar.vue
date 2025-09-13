<template>
  <div id="top-bar">
    <!-- 外层容器：统一控制布局，通过媒体查询切换手机/电脑端样式 -->
    <div class="top-container">
      <!-- 左侧区域：包裹标题和标语，电脑端靠左，手机端居中 -->
      <div class="left-content">
        <div class="text-content">
          <span class="logo-text" @click="toHome()">大学生报社</span>
          <span class="slogan">传递校园资讯 记录青春足迹</span>
        </div>
      </div>

      <!-- 右侧区域：下拉菜单（更多），电脑端靠右，手机端随布局自适应 -->
      <div class="right-content">
        <van-dropdown-menu class="icon-only">
          <van-dropdown-item
            v-model="value1"
            :options="option1"
            class="dropdown-content"
          >
            <template #title>
              <van-icon name="wap-nav" size="20" />
            </template>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Icon, Grid, GridItem } from "vant";
import { DropdownMenu, DropdownItem } from "vant";

const router = useRouter();

const value1 = ref(0);
const value2 = ref("a");
const option1 = [
  { text: "全部商品", value: 0 },
  { text: "新款商品", value: 1 },
  { text: "活动商品", value: 2 },
];
const option2 = [
  { text: "默认排序", value: "a" },
  { text: "好评排序", value: "b" },
  { text: "销量排序", value: "c" },
];

function toHome() {
  router.push("/");
}
</script>

<style scoped>
/* 1. 基础容器样式：手机端默认居中布局 */
.top-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center; /* 手机端：整体居中（标题+菜单） */
  background-color: #fff;
  padding: 10px 15px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  height: 45px;
}

/* 2. 左侧标题区域：手机端随容器居中，电脑端单独控制 */
.left-content {
  /* 手机端：默认样式，无额外定位 */
}

/* 3. 右侧下拉菜单区域：手机端默认显示，电脑端初始隐藏（后续媒体查询显示） */
.right-content {
  display: none; /* 手机端隐藏右侧菜单（原布局靠中间图标触发） */
}

/* 4. 文字内容样式：保持原有对齐和间距 */
.text-content {
  display: inline-flex;
  align-items: center;
  gap: 10px; /* 标题与标语间距 */
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  cursor: pointer; /* 增加鼠标指针，提示可点击 */
}

.slogan {
  font-size: 12px;
  color: #666;
  white-space: nowrap; /* 防止标语换行 */
}

/* 5. 下拉菜单基础样式（保持原有） */
.icon-only ::v-deep(.van-dropdown-menu__bar) {
  box-shadow: none !important;
  border: none !important;
  background: none !important;
  height: auto;
}

.icon-only ::v-deep(.van-dropdown-item__content) {
  box-shadow: none !important;
}

.icon-only {
  width: 50px;
  box-shadow: none;
}

.dropdown-content {
  box-shadow: none;
  padding: 4px 0;
}

/* 6. 媒体查询：屏幕宽度 > 768px（电脑端）时调整布局 */
@media (min-width: 768px) {
  /* 电脑端：容器改为左右布局（标题左、菜单右） */
  .top-container {
    justify-content: space-between; /* 左右两端对齐 */
    padding: 10px 40px; /* 增加左右内边距，避免贴边 */
  }

  /* 电脑端：左侧标题区域靠左显示 */
  .left-content {
    display: flex;
    align-items: center;
  }

  /* 电脑端：显示右侧下拉菜单（更多） */
  .right-content {
    display: block;
  }

  /* 电脑端：调整标题文字大小，适配大屏 */
  .logo-text {
    font-size: 20px;
  }

  .slogan {
    font-size: 14px;
  }
}

/* 7. 手机端小屏幕适配（保持原有，微调优化） */
@media (max-width: 375px) {
  .slogan {
    font-size: 11px;
  }

  .logo-text {
    font-size: 16px;
  }

  .top-container {
    padding: 10px 10px; /* 减小手机端左右内边距 */
  }
}

/* 8. 其他原有样式（保持不变） */
.menu-grid {
  background-color: #fff;
}

.menu-container {
  margin-top: 57px;
  background-color: #fff;
}

.menu-row {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  cursor: pointer;
}

.menu-row:active {
  background: #f2f3f5;
}

.menu-icon-img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.menu-text {
  font-size: 14px;
  color: #323233;
}
</style>