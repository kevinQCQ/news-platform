<template>
  <div class="article-upload-page">
    <!-- 主要内容区 -->
    <main class="main-content container">
      <div class="upload-container">
        <!-- 页面标题 -->
        <div class="page-title">
          <h1>发布新闻文章</h1>
          <p>分享校园动态，记录青春足迹</p>
        </div>

        <!-- 表单区域 -->
        <form @submit.prevent="handleSubmit" class="upload-form">
          <!-- 标题输入 -->
          <div class="form-group">
            <label for="title" class="form-label required">文章标题</label>
            <input
              type="text"
              id="title"
              v-model="articleForm.title"
              class="form-input"
              placeholder="请输入吸引人的文章标题"
              maxlength="100"
              required
            />
            <p class="form-hint">建议标题不超过20个字，突出文章核心内容</p>
          </div>

          <!-- 分类选择 -->
          <div class="form-group">
            <label for="category" class="form-label required">文章分类</label>
            <select
              id="category"
              v-model="articleForm.category"
              class="form-select"
              required
            >
              <option value="">请选择分类</option>
              <option value="校园活动">校园活动</option>
              <option value="人物专访">人物专访</option>
              <option value="校园公告">校园公告</option>
              <option value="政策解读">政策解读</option>
              <option value="学习指导">学习指导</option>
              <option value="文化艺术">文化艺术</option>
              <option value="就业信息">就业信息</option>
              <option value="校园建设">校园建设</option>
              <option value="其他">其他</option>
            </select>
          </div>

          <!-- 封面图上传 -->
          <div class="form-group">
            <label class="form-label">封面图片</label>
            <div class="image-upload-area">
              <div
                class="upload-preview"
                :class="{ 'has-image': articleForm.coverImage }"
              >
                <img
                  :src="articleForm.coverImage"
                  alt="封面预览"
                  class="preview-img"
                  v-if="articleForm.coverImage"
                />
                <div class="upload-placeholder" v-else>
                  <i class="upload-icon">🖼️</i>
                  <p>点击上传封面图（建议尺寸1200×600）</p>
                  <p class="placeholder-hint">支持JPG、PNG格式，不超过5MB</p>
                </div>
                <input
                  type="file"
                  class="file-input"
                  accept="image/jpeg, image/png"
                  @change="handleImageUpload"
                />
                <button
                  type="button"
                  class="remove-image"
                  v-if="articleForm.coverImage"
                  @click="removeImage"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- 文章摘要 -->
          <div class="form-group">
            <label for="summary" class="form-label">文章摘要</label>
            <textarea
              id="summary"
              v-model="articleForm.summary"
              class="form-textarea"
              placeholder="简要介绍文章内容（可选）"
              maxlength="300"
              rows="3"
            ></textarea>
            <p class="form-hint">
              <span>{{ articleForm.summary.length }}/300</span>
              <span>摘要将显示在文章列表页，帮助读者快速了解内容</span>
            </p>
          </div>

          <!-- 文章内容编辑器 -->
          <div class="form-group">
            <label for="content" class="form-label required">文章内容</label>
            <div class="editor-container">
              <!-- 编辑器工具栏 -->
              <div class="editor-toolbar">
                <button
                  type="button"
                  class="toolbar-btn"
                  @click="formatText('bold')"
                  title="加粗"
                >
                  B
                </button>
                <button
                  type="button"
                  class="toolbar-btn"
                  @click="formatText('italic')"
                  title="斜体"
                >
                  <i>I</i>
                </button>
                <button
                  type="button"
                  class="toolbar-btn"
                  @click="formatText('underline')"
                  title="下划线"
                >
                  <u>U</u>
                </button>
                <span class="toolbar-divider"></span>
                <button
                  type="button"
                  class="toolbar-btn"
                  @click="formatText('h1')"
                  title="标题1"
                >
                  H1
                </button>
                <button
                  type="button"
                  class="toolbar-btn"
                  @click="formatText('h2')"
                  title="标题2"
                >
                  H2
                </button>
                <button
                  type="button"
                  class="toolbar-btn"
                  @click="formatText('h3')"
                  title="标题3"
                >
                  H3
                </button>
                <span class="toolbar-divider"></span>
                <button
                  type="button"
                  class="toolbar-btn"
                  @click="formatText('list')"
                  title="列表"
                >
                  • 列表
                </button>
                <button
                  type="button"
                  class="toolbar-btn"
                  @click="formatText('quote')"
                  title="引用"
                >
                  "" 引用
                </button>
                <span class="toolbar-divider"></span>
                <button
                  type="button"
                  class="toolbar-btn"
                  @click="insertImage"
                  title="插入图片"
                >
                  图片
                </button>
              </div>

              <!-- 编辑器内容区 -->
              <div
                id="content"
                class="editor-content"
                v-html="articleForm.content"
                contenteditable="true"
                @input="handleContentChange"
                required
              ></div>
            </div>
            <p class="form-hint">请输入文章正文内容，支持基本格式编辑</p>
          </div>

          <!-- 提交按钮区域 -->
          <div class="form-actions">
            <button type="button" class="btn draft-btn" @click="saveAsDraft">
              保存草稿
            </button>
            <button
              type="button"
              class="btn preview-btn"
              @click="togglePreview"
            >
              {{ isPreviewMode ? "返回编辑" : "预览" }}
            </button>
            <button type="submit" class="btn submit-btn">发布文章</button>
          </div>
        </form>
      </div>

      <!-- 预览模式 -->
      <div class="preview-container" v-if="isPreviewMode">
        <div class="preview-header">
          <h2>文章预览</h2>
          <button class="close-preview" @click="togglePreview">×</button>
        </div>
        <div class="preview-content">
          <h1 class="preview-title">{{ articleForm.title || "标题预览" }}</h1>
          <div class="preview-meta">
            <span class="preview-category">{{
              articleForm.category || "未分类"
            }}</span>
            <span class="preview-date">{{ formatDate(new Date()) }}</span>
          </div>
          <img
            :src="articleForm.coverImage"
            alt="封面预览"
            class="preview-cover"
            v-if="articleForm.coverImage"
          />
          <div class="preview-summary" v-if="articleForm.summary">
            <strong>摘要：</strong>{{ articleForm.summary }}
          </div>
          <div
            class="preview-body"
            v-html="articleForm.content || '<p>请在编辑器中输入文章内容...</p>'"
          ></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from "vue";
import { useRouter } from "vue-router";

// 路由实例
const router = useRouter();

// 文章表单数据
const articleForm = reactive({
  title: "",
  category: "",
  coverImage: "",
  summary: "",
  content: "",
  isDraft: false,
});

// 预览模式状态
const isPreviewMode = ref(false);

// 导航到首页
const navigateToHome = () => {
  router.push("/");
};

// 处理封面图片上传
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    // 验证文件大小
    if (file.size > 5 * 1024 * 1024) {
      alert("图片大小不能超过5MB");
      return;
    }

    // 验证文件类型
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("请上传JPG或PNG格式的图片");
      return;
    }

    // 预览图片
    const reader = new FileReader();
    reader.onload = (event) => {
      articleForm.coverImage = event.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 移除封面图片
const removeImage = () => {
  articleForm.coverImage = "";
  // 重置文件输入，允许重新选择同一文件
  const fileInput = document.querySelector(".file-input");
  if (fileInput) {
    fileInput.value = "";
  }
};

// 处理编辑器内容变化
const handleContentChange = () => {
  const editor = document.getElementById("content");
  if (editor) {
    articleForm.content = editor.innerHTML;
  }
};

// 格式化文本（简单的富文本功能）
const formatText = (command) => {
  switch (command) {
    case "bold":
      document.execCommand("bold", false, null);
      break;
    case "italic":
      document.execCommand("italic", false, null);
      break;
    case "underline":
      document.execCommand("underline", false, null);
      break;
    case "h1":
      document.execCommand("formatBlock", false, "<h1>");
      break;
    case "h2":
      document.execCommand("formatBlock", false, "<h2>");
      break;
    case "h3":
      document.execCommand("formatBlock", false, "<h3>");
      break;
    case "list":
      document.execCommand("insertUnorderedList", false, null);
      break;
    case "quote":
      document.execCommand("formatBlock", false, "<blockquote>");
      break;
  }

  // 更新内容绑定
  handleContentChange();

  // 聚焦编辑器
  nextTick(() => {
    document.getElementById("content").focus();
  });
};

// 插入图片
const insertImage = () => {
  const url = prompt("请输入图片URL:");
  if (url) {
    document.execCommand("insertImage", false, url);
    handleContentChange();
  }
};

// 切换预览模式
const togglePreviewMode = () => {
  isPreviewMode.value = !isPreviewMode.value;
  // 滚动到顶部
  window.scrollTo(0, 0);
};

// 格式化日期
const formatDate = (date) => {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// 保存为草稿
const saveAsDraft = () => {
  if (!validateForm(true)) return;

  articleForm.isDraft = true;
  // 模拟保存草稿
  console.log("保存草稿:", articleForm);
  alert("草稿已保存");
  router.push("/personal");
};

// 提交表单（发布文章）
const handleSubmit = () => {
  if (!validateForm(false)) return;

  // 模拟发布文章
  console.log("发布文章:", articleForm);
  alert("文章发布成功，将在审核后展示");
  router.push("/personal");
};

// 表单验证
const validateForm = (isDraft) => {
  // 草稿可以缺少部分内容，但标题必须有
  if (!articleForm.title.trim()) {
    alert("请输入文章标题");
    return false;
  }

  // 正式发布需要完整内容
  if (!isDraft) {
    if (!articleForm.category) {
      alert("请选择文章分类");
      return false;
    }

    if (!articleForm.content.trim()) {
      alert("请输入文章内容");
      return false;
    }
  }

  return true;
};
</script>

<style scoped>
/* 基础样式 */
.article-upload-page {
  margin-top: 38px;
  min-height: 100vh;
  background-color: #f9fafb;
  color: #333;
  font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

/* 主要内容区 */
.main-content {
  padding: 30px 0;
}

.upload-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  padding: 30px;
  margin-bottom: 30px;
}

.page-title {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.page-title h1 {
  font-size: 1.8rem;
  margin-bottom: 8px;
  color: #1f2937;
}

.page-title p {
  color: #6b7280;
}

/* 表单样式 */
.upload-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
}

.form-label.required::after {
  content: "*";
  color: #ef4444;
  margin-left: 4px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.form-textarea {
  resize: vertical;
}

.form-hint {
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
}

/* 图片上传区域 */
.image-upload-area {
  margin-top: 5px;
}

.upload-preview {
  width: 100%;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  min-height: 180px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s;
}

.upload-preview:hover {
  border-color: #93c5fd;
  background-color: #f8fafc;
}

.upload-preview.has-image {
  border-style: solid;
  min-height: auto;
}

.preview-img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 180px;
  color: #6b7280;
  text-align: center;
  padding: 20px;
}

.upload-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.placeholder-hint {
  font-size: 12px;
  margin-top: 5px;
  color: #9ca3af;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.remove-image {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.remove-image:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

/* 编辑器样式 */
.editor-container {
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.editor-container:focus-within {
  border-color: #4285f4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.editor-toolbar {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  background-color: #f9fafb;
  border-bottom: 1px solid #eee;
  gap: 5px;
  flex-wrap: wrap;
}

.toolbar-btn {
  background: none;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.toolbar-btn:hover {
  background-color: #e5e7eb;
}

.toolbar-btn i {
  font-style: italic;
}

.toolbar-btn u {
  text-decoration: underline;
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  background-color: #ddd;
  margin: 0 5px;
}

.editor-content {
  min-height: 400px;
  padding: 20px;
  outline: none;
  line-height: 1.8;
}

.editor-content h1,
.editor-content h2,
.editor-content h3 {
  margin: 1.5rem 0 1rem;
  color: #1f2937;
}

.editor-content p {
  margin-bottom: 1rem;
}

.editor-content blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #6b7280;
}

.editor-content ul {
  margin: 1rem 0 1rem 1.5rem;
}

.editor-content img {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 4px;
}

/* 表单按钮区域 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 14px;
}

.draft-btn {
  background-color: #f3f4f6;
  color: #6b7280;
}

.draft-btn:hover {
  background-color: #e5e7eb;
}

.preview-btn {
  background-color: #e0f2fe;
  color: #0284c7;
}

.preview-btn:hover {
  background-color: #bae6fd;
}

.submit-btn {
  background-color: #2563eb;
  color: white;
}

.submit-btn:hover {
  background-color: #1d4ed8;
}

/* 预览模式样式 */
.preview-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  padding: 30px;
  margin-bottom: 30px;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.close-preview {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-preview:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.preview-content {
  max-width: 800px;
  margin: 0 auto;
}

.preview-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #1f2937;
  line-height: 1.3;
}

.preview-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  color: #6b7280;
  font-size: 0.9rem;
}

.preview-category {
  background-color: #eff6ff;
  color: #2563eb;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.preview-cover {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 30px;
  object-fit: cover;
}

.preview-summary {
  font-size: 1.1rem;
  color: #4b5563;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f9fafb;
  border-radius: 6px;
  border-left: 4px solid #93c5fd;
}

.preview-body {
  line-height: 1.8;
  color: #374151;
}

.preview-body h2,
.preview-body h3 {
  margin: 1.5rem 0 1rem;
  color: #1f2937;
}

.preview-body p {
  margin-bottom: 1.2rem;
}

.preview-body img {
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 4px;
}

.preview-body blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #6b7280;
  font-style: italic;
}

.preview-body ul {
  margin: 1rem 0 1rem 1.5rem;
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

/* 响应式调整 */
@media (max-width: 768px) {
  .upload-container {
    padding: 20px 15px;
  }

  .page-title h1 {
    font-size: 1.5rem;
  }

  .form-actions {
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn {
    flex: 1;
    min-width: 120px;
    padding: 10px;
  }

  .editor-content {
    min-height: 300px;
  }

  .preview-title {
    font-size: 1.5rem;
  }
}
</style>