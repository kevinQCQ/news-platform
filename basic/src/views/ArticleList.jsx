import {defineComponent, ref} from "vue";

export default defineComponent({
    setup() {
        // 频道数据
        const channels = ref([
            {id: 1, name: '推荐'},
            {id: 2, name: '热点'},
            {id: 3, name: '科技'},
            {id: 4, name: '娱乐'},
            {id: 5, name: '体育'},
            {id: 6, name: '财经'}
        ]);

        // 当前选中的频道
        const activeChannel = ref(1);
        
        // 菜单显示状态
        const isMenuOpen = ref(false);
        
        // 文章数据
        const articles = ref([
            {
                id: 1,
                title: 'Vue 3.0 正式发布，带来众多新特性',
                image: 'https://picsum.photos/300/200?random=1',
                summary: 'Vue 3.0 是一款渐进式 JavaScript 框架的最新主要版本，带来了 Composition API、更好的 TypeScript 支持等新特性。'
            },
            {
                id: 2,
                title: 'TailwindCSS 在现代 Web 开发中的应用',
                image: 'https://picsum.photos/300/200?random=2',
                summary: 'TailwindCSS 作为一种实用优先的 CSS 框架，正在改变我们编写 CSS 的方式，提供了更快的 UI 开发体验。'
            },
            {
                id: 3,
                title: 'React 18 新特性详解',
                image: 'https://picsum.photos/300/200?random=3',
                summary: 'React 18 引入了自动批处理、新的 root API、Suspense 等新特性，提升了应用的性能和开发体验。'
            },
            {
                id: 4,
                title: 'TypeScript 在企业级项目中的实践',
                image: 'https://picsum.photos/300/200?random=4',
                summary: 'TypeScript 作为一种强类型 JavaScript 超集，在大型项目中提供了更好的代码可维护性和开发体验。'
            },
            {
                id: 5,
                title: 'Webpack 5 与 Vite 的性能对比',
                image: 'https://picsum.photos/300/200?random=5',
                summary: '在现代前端构建工具中，Webpack 5 和 Vite 各有优势，本文将对它们进行详细对比分析。'
            }
        ]);

        // 切换频道
        const switchChannel = (channelId) => {
            activeChannel.value = channelId;
        };

        // 切换菜单显示状态
        const toggleMenu = () => {
            isMenuOpen.value = !isMenuOpen.value;
        };

        return () => (
            <div class="min-h-screen bg-gray-50 select-none">
                {/* 顶部导航栏 */}
                <header class="bg-white shadow-md">
                    <div class="container mx-auto px-4 py-3">
                        <div class="flex items-center justify-between">
                            {/* 左侧频道导航 */}
                            <div class="flex space-x-2 md:space-x-4 overflow-x-auto py-2 md:py-0 scrollbar-hide">
                                {
                                    channels.value.map(channel => (
                                        <button
                                            key={channel.id}
                                            onClick={() => switchChannel(channel.id)}
                                            class={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                                                activeChannel.value === channel.id
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {channel.name}
                                        </button>
                                    ))
                                }
                            </div>

                            {/* 右侧菜单按钮 */}
                            <button
                                onClick={toggleMenu}
                                class="p-2 rounded-md text-gray-700 hover:bg-blue-50 focus:outline-none"
                            >
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* 菜单面板 */}
                {isMenuOpen.value && (
                    <div class="bg-white shadow-lg absolute right-4 mt-1 rounded-md z-10 w-48 py-2">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">首页</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">考勤</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">通知</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">员工</a>
                    </div>
                )}

                {/* 文章列表 */}
                <main class="container mx-auto px-4 py-6">
                    <div class="space-y-4">
                        {
                            articles.value.map(article => (
                                <article 
                                    key={article.id}
                                    class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300 flex"
                                >
                                    {/* 文章封面 - 在移动端也保持在左侧 */}
                                    <div class="w-24 md:w-48 flex-shrink-0">
                                        <img 
                                            src={article.image} 
                                            alt={article.title}
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* 文章标题和摘要 */}
                                    <div class="p-4 md:p-6 flex-1">
                                        <h2 class="text-base md:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                                            {article.title}
                                        </h2>
                                        <p class="text-sm md:text-base text-gray-600 line-clamp-3">
                                            {article.summary}
                                        </p>
                                    </div>
                                </article>
                            ))
                        }
                    </div>
                </main>
            </div>
        );
    }
});