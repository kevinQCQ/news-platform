<template>
  <div id="top-bar">
    <div class="top-container">
      <div class="logo-area">
        <!-- 文字内容在同一行显示 -->
        <div class="text-content">
          <span class="logo-text">大学生报社</span>
          <span class="slogan">传递校园资讯 记录青春足迹</span>

          <!-- 下拉菜单按钮 -->
          <van-dropdown-menu class="icon-only">
            <van-dropdown-item
              v-model="value1"
              :options="option1"
              class="dropdown-content"
            >
              <!-- 自定义标题区域 = 图标 -->
              <template #title>
                <van-icon name="wap-nav" size="20" />
              </template>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
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



const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const handleMenuClick = (type) => {
  menuVisible.value = false;
  switch (type) {
    case "yaowen":
      router.push("/yaowen");
      break;
    case "dongtai":
      router.push("/dongtai");
      break;
    default:
      break;
  }
};
</script>

<style scoped>
/* 菜单网格背景改为白色 */
.menu-grid {
  background-color: #fff; /* 修改为白色 */
}
/* 菜单容器背景改为白色 */
.menu-container {
  margin-top: 57px;
  background-color: #fff; /* 添加白色背景 */
}
/* 深度选择器：把 van-dropdown-menu 内部 bar 的边框/阴影全干掉 */
.icon-only ::v-deep(.van-dropdown-menu__bar) {
  box-shadow: none !important;
  border: none !important;
  background: none !important;
  height: auto; /* 让高度由图标撑开 */
}

/* 如果你想把下拉面板本身的阴影也去掉，再写一条 */
.icon-only ::v-deep(.van-dropdown-item__content) {
  box-shadow: none !important;
}
/* 把下拉菜单压成图标大小 */
.icon-only {
  width: 50px; /* 图标 + 箭头刚好 48 */
  box-shadow: none; /* 去掉边框更干净 */
}
.dropdown-content {
  box-shadow: none; /* 去掉边框更干净 */
}
.top-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0; /* 与left:0配合使元素占满整个宽度 */
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 左右布局，中间内容自动居中 */
  background-color: #fff; /* 保持白色背景 */
  padding: 10px 15px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  height: 45px;
}

/* 中间文字区域 - 自动居中 */
.logo-area {
  flex: 1; /* 占满中间空间 */
  text-align: center; /* 文字水平居中 */
}

/* 使用span确保同行显示 */
.text-content {
  display: inline-flex;
  align-items: center;
  gap: 10px; /* 文字间间距 */
}

.logo-text {
  left: 8%;
  font-size: 18px;
  font-weight: bold;
}

.slogan {
  font-size: 12px;
  color: #666;
  white-space: nowrap; /* 防止标语换行 */
}

.menu-icon {
  cursor: pointer;
  width: 40px; /* 固定宽度，辅助中间内容居中 */
  height: 40px;
  text-align: center;
}

/* style 里追加 */
.dropdown-content {
  padding: 4px 0;
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

/* 适配小屏幕 */
@media (max-width: 375px) {
  .slogan {
    font-size: 11px;
  }
  .logo-text {
    font-size: 16px;
  }
}
</style>
