<template>
  <div class="min-h-screen bg-gray-50 select-none flex flex-col pt-5">
    

    <!-- 移动端菜单面板 -->
    <div
      v-if="isMenuOpen"
      class="bg-white border-b border-gray-200 z-20 md:hidden pt-10"
    >
      <div class="px-4 py-3 space-y-1">
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
          >首页</a
        >
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
          >考勤</a
        >
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
          >通知</a
        >
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
          >员工</a
        >
        <div class="pt-2 border-t border-gray-100">
          <button
            class="w-full px-3 py-1 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50"
          >
            登录
          </button>
        </div>
      </div>
    </div>

    <!-- 主体内容：文章列表 -->
    <main class="flex-1 container mx-auto px-4 py-6 pt-10">
      <div class="space-y-4">
        <article
          v-for="article in articles"
          :key="article.id"
          class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row"
        >
          <!-- 文章封面 -->
          <div class="w-full md:w-48 flex-shrink-0 h-48 md:h-auto">
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover"
            />
          </div>
          <!-- 文章内容 -->
          <div class="p-4 md:p-6 flex-1">
            <h2
              class="text-base md:text-xl font-semibold text-gray-800 mb-2 line-clamp-2"
            >
              {{ article.title }}
            </h2>
            <p class="text-sm md:text-base text-gray-600 line-clamp-3">
              {{ article.summary }}
            </p>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
// 1. 导入组合式 API 核心工具（ref 用于创建响应式数据）
import { ref } from "vue";

// 2. 定义响应式数据（直接顶层声明，无需包裹在 data 中）
// 频道列表数据
const channels = ref([
  { id: 1, name: "推荐" },
  { id: 2, name: "热点" },
  { id: 3, name: "科技" },
  { id: 4, name: "娱乐" },
  { id: 5, name: "体育" },
  { id: 6, name: "财经" },
]);

// 当前选中的频道 ID
const activeChannel = ref(1);

// 移动端菜单显示状态
const isMenuOpen = ref(false);

// 文章列表数据
const articles = ref([
  {
    id: 1,
    title: "Vue 3.0 正式发布，带来众多新特性",
    image: "https://picsum.photos/300/200?random=1",
    summary:
      "Vue 3.0 是一款渐进式 JavaScript 框架的最新主要版本，带来了 Composition API、更好的 TypeScript 支持等新特性。",
  },
  {
    id: 2,
    title: "TailwindCSS 在现代 Web 开发中的应用",
    image: "https://picsum.photos/300/200?random=2",
    summary:
      "TailwindCSS 作为一种实用优先的 CSS 框架，正在改变我们编写 CSS 的方式，提供了更快的 UI 开发体验。",
  },
  {
    id: 3,
    title: "React 18 新特性详解",
    image: "https://picsum.photos/300/200?random=3",
    summary:
      "React 18 引入了自动批处理、新的 root API、Suspense 等新特性，提升了应用的性能和开发体验。",
  },
  {
    id: 4,
    title: "TypeScript 在企业级项目中的实践",
    image: "https://picsum.photos/300/200?random=4",
    summary:
      "TypeScript 作为一种强类型 JavaScript 超集，在大型项目中提供了更好的代码可维护性和开发体验。",
  },
  {
    id: 5,
    title: "Webpack 5 与 Vite 的性能对比",
    image: "https://picsum.photos/300/200?random=5",
    summary:
      "在现代前端构建工具中，Webpack 5 和 Vite 各有优势，本文将对它们进行详细对比分析。",
  },
]);

// 3. 定义事件处理函数（直接顶层声明，无需包裹在 methods 中）
// 切换频道
const switchChannel = (channelId) => {
  activeChannel.value = channelId; // 响应式数据通过 .value 访问/修改
};

// 切换移动端菜单显示状态
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>


<!-- 样式补充：滚动条隐藏 + 自定义动画（如需） -->
<style scoped>
/* 隐藏频道导航横向滚动条（保留滚动功能） */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>