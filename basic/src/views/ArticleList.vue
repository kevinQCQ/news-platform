<template>
  <main class="mx-auto px-4 py-6 pt-20 bg-gray-50">
    <div class="space-y-4">
      <article
          v-for="article in articles"
          :key="article.id"
          class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row">
        <div class="w-full md:w-48 flex-shrink-0 h-48 md:h-auto">
          <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover"/>
        </div>
        <div class="p-4 md:p-6 flex-1">
          <h2 class="text-base md:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
            {{ article.title }}
          </h2>
          <p class="text-sm md:text-base text-gray-600 line-clamp-3">
            {{ article.summary }}
          </p>
        </div>
      </article>
    </div>
  </main>
</template>

<script setup>
import {ref} from "vue";

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
  }
])
</script>


<style scoped>
</style>