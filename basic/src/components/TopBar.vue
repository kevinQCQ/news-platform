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

      <!-- 右侧区域：用户头像和下拉菜单 -->
      <div class="right-content">
        <!-- 用户头像 -->
        <div class="user-avatar" @click="toggleUserMenu">
          <div class="avatar-circle">
            <span class="avatar-text">{{ userInitial }}</span>
          </div>
        </div>
        
        <!-- 用户下拉菜单 -->
        <van-popover
          v-model:show="showUserMenu"
          placement="bottom-end"
          :offset="[0, 8]"
          class="user-menu-popover"
        >
          <div class="user-menu">
            <div class="user-info">
              <div class="user-name">{{ displayUserName }}</div>
            </div>
            <div class="menu-divider"></div>
            <div class="menu-item logout" @click="logout">
              <span>退出登录</span>
              <van-icon name="arrow" size="12" />
            </div>
          </div>
        </van-popover>

        <!-- 原有的三条横杠菜单 -->
        <van-dropdown-menu class="icon-only">
          <van-dropdown-item
            v-model="value1"
            :options="option1"
            class="dropdown-content"
            @click="toPage(value1)"
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const value1 = ref(-2);
const showUserMenu = ref(false);

// 模拟用户数据（实际项目中应该从状态管理或API获取）
const userEmail = ref("askn2005@qq.com");
const userName = ref("艾斯卡诺"); // 改为中文用户名
const isLoggedIn = ref(true); // 模拟登录状态

// 计算用户首字母
const userInitial = computed(() => {
  if (!isLoggedIn.value || !userName.value) {
    return "未";
  }
  return userName.value.charAt(0);
});

// 计算显示的用户名
const displayUserName = computed(() => {
  if (!isLoggedIn.value || !userName.value) {
    return "未注册";
  }
  return userName.value;
});

const option1 = [
  { text: "首页", value: -1 },
  { text: "个人主页", value: 0 },
  { text: "登录注册" ,value: 1 },
  { text: "发布文章", value: 2 },
  { text: "振兴动态", value: 3 },
  { text: "校园活动", value: 4 },
  { text: "校园风采", value: 5 },
  { text: "校园公告", value: 6 },
  { text: "联系我们", value: 7 },
];

function toHome() {
  router.push("/");
}

function toPage(val){
  if(val === 1){
    router.push("/login");
  }
  if(val === 0){
    router.push("/admin");
  }
  if(val === -1){
    router.push("/");
  }
  if(val === 2){
    router.push("/article-upload");
  }
}

// 用户菜单相关函数
function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
}


function logout() {
  // 退出登录的逻辑
  console.log("Logout");
  showUserMenu.value = false;
  // 可以跳转到登录页面
  router.push("/login");
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



/* 4. 文字内容样式：保持原有对齐和间距 */
.text-content {
  display: inline-flex;
  align-items: center;
  gap: 10px; /* 标题与标语间距 */
}

.logo-text {
  font-size: 16px; /* 减小字体大小，让标题在一行显示 */
  font-weight: bold;
  cursor: pointer; /* 增加鼠标指针，提示可点击 */
  white-space: nowrap; /* 防止标题换行 */
}

.slogan {
  font-size: 12px;
  color: #666;
  white-space: nowrap; /* 防止标语换行 */
}

/* 5. 用户头像样式 */
.user-avatar {
  background-color: rgb(247, 247, 247);
  margin-right: 8px; /* 适中的右边距，让头像与菜单图标距离合适 */
  cursor: pointer;
}

.avatar-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.avatar-circle:hover {
  background-color: #555;
}

.avatar-text {
  color: white;
  font-size: 14px;
  font-weight: bold;
}

/* 6. 用户下拉菜单样式 */
.user-menu-popover ::v-deep(.van-popover__content) {
  padding: 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: rgb(154, 97, 27);
}

.user-menu {
  background: #333;
  border-radius: 8px;
  min-width: 160px;
  padding: 8px 0;
}

.user-info {
  padding: 8px 16px;
}

.user-name {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.menu-divider {
  height: 1px;
  background-color: #555;
  margin: 8px 0;
}

.menu-item {
  padding: 8px 16px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: #444;
}

.menu-item.logout {
  color: #ff6b6b;
}

.menu-item.logout:hover {
  background-color: #444;
}

/* 7. 右侧内容区域布局 */
.right-content {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px; /* 恢复正常的间距 */
  margin-right: 8px; /* 适中的右边距 */
  margin-left: 6px;
}

/* 8. 下拉菜单基础样式（保持原有） */
.icon-only ::v-deep(.van-dropdown-menu__bar) {
  box-shadow: none !important;
  border: none !important;
  background: #ffffff !important;
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
  background-color: #4f0505;
}



/* 9. 媒体查询：屏幕宽度 > 768px（电脑端）时调整布局 */
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

  /* 电脑端：显示右侧内容区域 */
  .right-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* 电脑端：调整标题文字大小，适配大屏 */
  .logo-text {
    font-size: 18px; /* 减小电脑端字体，确保在一行显示 */
  }

  .slogan {
    font-size: 14px;
  }

  /* 电脑端：调整头像大小 */
  .avatar-circle {
    width: 36px;
    height: 36px;
  }

  .avatar-text {
    font-size: 16px;
  }
}

/* 10. 手机端小屏幕适配（保持原有，微调优化） */
@media (max-width: 375px) {
  .slogan {
    font-size: 11px;
  }

  .logo-text {
    font-size: 14px; /* 手机端进一步减小字体 */
  }

  .top-container {
    padding: 10px 10px; /* 减小手机端左右内边距 */
  }

  /* 手机端：调整头像大小 */
  .avatar-circle {
    width: 24px;
    height: 24px;
  }

  .avatar-text {
    font-size: 10px;
  }

  /* 手机端：调整右侧内容间距 */
  .right-content {
    gap: 6px;
  }

  .user-avatar {
    margin-right: 0px; /* 手机端适中的右边距 */
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