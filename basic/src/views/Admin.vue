<template>
  <div class="personal-homepage">
    <main class="main-content container">
      <!-- 用户信息区域 -->
      <section class="user-profile">
        <div class="profile-header">
          <div class="cover-image">
            <img
              :src="userInfo.coverImage"
              alt="个人主页封面"
              class="cover-img"
              v-if="!isEditing"
            />
            <div class="image-upload" v-if="isEditing">
              <input type="file" accept="image/*" @change="handleCoverUpload" />
              <span>更换封面</span>
            </div>
          </div>

          <div class="user-info">
            <div class="avatar-container">
              <img
                :src="userInfo.avatar"
                alt="用户头像"
                class="avatar"
                v-if="!isEditing"
              />
              <div class="image-upload avatar-upload" v-if="isEditing">
                <input
                  type="file"
                  accept="image/*"
                  @change="handleAvatarUpload"
                />
                <span>更换头像</span>
              </div>
            </div>

            <div class="basic-info">
              <h1 class="username">
                <template v-if="isEditing">
                  <input
                    type="text"
                    v-model="userInfo.username"
                    class="edit-input"
                  />
                </template>
                <template v-else>{{ userInfo.username }}</template>
              </h1>

              <p class="bio">
                <template v-if="isEditing">
                  <textarea
                    v-model="userInfo.bio"
                    class="edit-textarea"
                    placeholder="添加个人简介..."
                  ></textarea>
                </template>
                <template v-else>{{
                  userInfo.bio || "该用户尚未填写简介"
                }}</template>
              </p>

              <div class="stats">
                <div class="stat-item">
                  <span class="stat-value">{{ userInfo.stats.articles }}</span>
                  <span class="stat-label">发布文章</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ userInfo.stats.followers }}</span>
                  <span class="stat-label">关注者</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ userInfo.stats.following }}</span>
                  <span class="stat-label">关注中</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{
                    userInfo.stats.collections
                  }}</span>
                  <span class="stat-label">收藏</span>
                </div>
              </div>
              <div class="user-actions">
                <button class="edit-btn" @click="toggleEditMode">
                  {{ isEditing ? "保存" : "编辑资料" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 内容标签页 -->
      <section class="content-tabs">
        <div class="tabs-nav">
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'articles' }"
            @click="activeTab = 'articles'"
          >
            我的文章
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'collections' }"
            @click="activeTab = 'collections'"
          >
            我的收藏
          </button>
          <button
            class="tab-btn"
            :class="{ active: activeTab === 'history' }"
            @click="activeTab = 'history'"
          >
            阅读历史
          </button>
        </div>

        <!-- 我的文章 -->
        <div class="tab-content" v-if="activeTab === 'articles'">
          <div class="articles-list">
            <article-item
              v-for="article in userArticles"
              :key="article.id"
              :article="article"
              :is-owner="true"
              @delete-article="deleteArticle(article.id)"
            ></article-item>
          </div>

          <div class="empty-state" v-if="userArticles.length === 0">
            <img
              src="https://picsum.photos/100/100?random=10"
              alt="暂无文章"
              class="empty-icon"
            />
            <p>您还没有发布任何文章</p>
            <button class="create-btn" @click="navigateToCreateArticle">
              发布第一篇文章
            </button>
          </div>
        </div>

        <!-- 我的收藏 -->
        <div class="tab-content" v-if="activeTab === 'collections'">
          <div class="articles-list">
            <article-item
              v-for="article in collections"
              :key="article.id"
              :article="article"
              :show-collection="true"
              @remove-collection="removeCollection(article.id)"
            ></article-item>
          </div>

          <div class="empty-state" v-if="collections.length === 0">
            <img
              src="https://picsum.photos/100/100?random=11"
              alt="暂无收藏"
              class="empty-icon"
            />
            <p>您还没有收藏任何文章</p>
          </div>
        </div>

        <!-- 阅读历史 -->
        <div class="tab-content" v-if="activeTab === 'history'">
          <div class="articles-list">
            <article-item
              v-for="article in readingHistory"
              :key="article.id"
              :article="article"
              :show-date="true"
            ></article-item>
          </div>

          <div class="empty-state" v-if="readingHistory.length === 0">
            <img
              src="https://picsum.photos/100/100?random=12"
              alt="暂无阅读历史"
              class="empty-icon"
            />
            <p>您还没有阅读任何文章</p>
          </div>

          <button
            class="clear-history"
            v-if="readingHistory.length > 0"
            @click="clearReadingHistory"
          >
            清除全部历史
          </button>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p class="copyright">© 2025 校园新闻平台 版权所有</p>
        <div class="footer-links">
          <a href="#" class="footer-link">关于我们</a>
          <a href="#" class="footer-link">使用条款</a>
          <a href="#" class="footer-link">隐私政策</a>
          <a href="#" class="footer-link">帮助中心</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import ArticleItem from "../components/ArticleItem.vue";

// 路由实例
const router = useRouter();

// 编辑模式状态
const isEditing = ref(false);

// 活跃标签页
const activeTab = ref("articles");

// 用户信息
const userInfo = reactive({
  username: "张同学",
  avatar: "https://picsum.photos/200/200?random=1",
  coverImage: "https://picsum.photos/1200/300?random=2",
  bio: "热爱新闻写作的大三学生，关注校园动态与社会热点",
  stats: {
    articles: 8,
    followers: 124,
    following: 36,
    collections: 23,
  },
});

// 用户发布的文章
const userArticles = ref([
  {
    id: 1,
    title: "校园秋季运动会圆满落幕",
    summary: "为期两天的校园秋季运动会于昨日圆满结束，各院系运动员表现出色...",
    category: "校园活动",
    publishDate: "2023-10-15",
    readCount: 1254,
    commentCount: 42,
    image: "https://picsum.photos/400/200?random=3",
  },
  {
    id: 2,
    title: "专访：校园十大杰出学生李华",
    summary:
      "李华同学在学术研究和社会实践中均有出色表现，让我们一起来了解他的故事...",
    category: "人物专访",
    publishDate: "2023-10-08",
    readCount: 987,
    commentCount: 36,
    image: "https://picsum.photos/400/200?random=4",
  },
  {
    id: 3,
    title: "校园图书馆新增电子资源数据库",
    summary:
      "我校图书馆近期新增了5个专业数据库，涵盖多个学科领域，为师生提供更多资源...",
    category: "校园公告",
    publishDate: "2023-09-28",
    readCount: 756,
    commentCount: 18,
    image: "https://picsum.photos/400/200?random=5",
  },
]);

// 收藏的文章
const collections = ref([
  {
    id: 101,
    title: "大学生创业扶持政策解读",
    author: "王老师",
    summary:
      "本文详细解读了最新的大学生创业扶持政策，包括资金支持、场地优惠等...",
    category: "政策解读",
    publishDate: "2023-10-12",
    readCount: 3245,
    image: "https://picsum.photos/400/200?random=6",
  },
  {
    id: 102,
    title: "如何高效备考研究生入学考试",
    author: "学习部",
    summary:
      "考研备考周期长、压力大，本文分享了高效备考的方法和时间管理技巧...",
    category: "学习指导",
    publishDate: "2023-10-05",
    readCount: 2890,
    image: "https://picsum.photos/400/200?random=7",
  },
]);

// 阅读历史
const readingHistory = ref([
  {
    id: 201,
    title: "校园艺术节精彩回顾",
    author: "文艺部",
    summary:
      "本届校园艺术节包含音乐、舞蹈、戏剧等多个板块，展现了学生们的艺术才华...",
    category: "文化艺术",
    readDate: "2023-10-16",
    image: "https://picsum.photos/400/200?random=8",
  },
  {
    id: 202,
    title: "毕业生就业质量报告发布",
    author: "就业指导中心",
    summary:
      "我校发布2023届毕业生就业质量报告，就业率和就业满意度均有所提升...",
    category: "就业信息",
    readDate: "2023-10-14",
    image: "https://picsum.photos/400/200?random=9",
  },
  {
    id: 203,
    title: "校园绿化工程新进展",
    author: "后勤处",
    summary:
      "我校持续推进校园绿化工程，新增多处绿化景观，为师生创造更好的校园环境...",
    category: "校园建设",
    readDate: "2023-10-10",
    image: "https://picsum.photos/400/200?random=10",
  },
]);

// 切换编辑模式
const toggleEditMode = () => {
  if (isEditing.value) {
    // 保存编辑，这里可以添加保存到服务器的逻辑
    alert("个人信息已更新");
  }
  isEditing.value = !isEditing.value;
};

// 处理头像上传
const handleAvatarUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    // 实际项目中这里会上传文件到服务器
    // 这里用随机图片模拟上传成功
    userInfo.avatar = `https://picsum.photos/200/200?random=${Math.random()}`;
  }
};

// 处理封面上传
const handleCoverUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    // 实际项目中这里会上传文件到服务器
    // 这里用随机图片模拟上传成功
    userInfo.coverImage = `https://picsum.photos/1200/300?random=${Math.random()}`;
  }
};

// 删除文章
const deleteArticle = (id) => {
  if (confirm("确定要删除这篇文章吗？")) {
    userArticles.value = userArticles.value.filter(
      (article) => article.id !== id
    );
    userInfo.stats.articles--;
  }
};

// 移除收藏
const removeCollection = (id) => {
  collections.value = collections.value.filter((article) => article.id !== id);
  userInfo.stats.collections--;
};

// 清除阅读历史
const clearReadingHistory = () => {
  if (confirm("确定要清除所有阅读历史吗？")) {
    readingHistory.value = [];
  }
};

// 导航到首页
const navigateToHome = () => {
  router.push("/");
};

// 导航到发布文章页
const navigateToCreateArticle = () => {
  router.push("/create-article");
};
</script>

<style scoped>
/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    sans-serif;
}

.personal-homepage {
  margin-top: 100px;
  min-height: 100vh;
  background-color: #f9fafb;
  color: #333;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 导航栏样式 */
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo {
  cursor: pointer;
}

.news-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2563eb;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-item {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-item:hover,
.nav-item.active {
  color: #2563eb;
}

.edit-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-btn:hover {
  background-color: #1d4ed8;
}

/* 用户资料区域 */
.user-profile {
  margin-top: 20px;
  margin-bottom: 40px;
}

.profile-header {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
}

.cover-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.cover-image:hover .cover-img {
  transform: scale(1.02);
}

.user-info {
  display: flex;
  padding: 20px;
  margin-top: -80px;
  position: relative;
}

.avatar-container {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.basic-info {
  margin-left: 30px;
  flex: 1;
}

.username {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.bio {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 800px;
}

.stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.4rem;
  font-weight: 700;
  color: #2563eb;
}

.stat-label {
  color: #6b7280;
  font-size: 0.9rem;
}

/* 内容标签页 */
.content-tabs {
  margin-bottom: 60px;
}

.tabs-nav {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 20px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab-btn:hover {
  color: #2563eb;
}

.tab-btn.active {
  color: #2563eb;
}

.tab-btn.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #2563eb;
  border-radius: 3px 3px 0 0;
}

.tab-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
}

/* 文章列表 */
.articles-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.empty-icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
  opacity: 0.5;
  margin-bottom: 20px;
}

.create-btn {
  margin-top: 15px;
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.create-btn:hover {
  background-color: #1d4ed8;
}

/* 清除历史按钮 */
.clear-history {
  background: none;
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.2s;
}

.clear-history:hover {
  background-color: #ef4444;
  color: white;
}

/* 编辑模式样式 */
.image-upload {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  cursor: pointer;
  color: #6b7280;
  border: 2px dashed #d1d5db;
  transition: all 0.2s;
}

.image-upload:hover {
  background-color: #e5e7eb;
  color: #374151;
}

.image-upload input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.avatar-upload {
  border-radius: 50%;
}

.edit-input {
  font-size: 2rem;
  font-weight: 700;
  padding: 5px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: auto;
  min-width: 200px;
}

.edit-textarea {
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  resize: vertical;
  font-size: 1rem;
  line-height: 1.6;
}

/* 页脚样式 */
.footer {
  background-color: #fff;
  border-top: 1px solid #e5e7eb;
  padding: 40px 0 20px;
  margin-top: 60px;
}

.copyright {
  color: #6b7280;
  text-align: center;
  margin-bottom: 20px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .user-info {
    flex-direction: column;
    align-items: center;
    margin-top: -60px;
  }

  .avatar-container {
    width: 120px;
    height: 120px;
  }

  .basic-info {
    margin-left: 0;
    text-align: center;
    margin-top: 20px;
  }

  .stats {
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .username {
    font-size: 1.5rem;
  }

  .cover-image {
    height: 140px;
  }

  .tabs-nav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab-btn {
    padding: 10px 16px;
    font-size: 0.9rem;
    white-space: nowrap;
  }
}
</style>