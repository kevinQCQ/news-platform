import {defineComponent, ref, computed} from "vue";

export default defineComponent({
    setup() {
        // 审核状态选项
        const statusOptions = [
            {id: 'all', name: '全部'},
            {id: 'pending', name: '审核中'},
            {id: 'approved', name: '已通过'},
            {id: 'rejected', name: '未通过'}
        ];

        // 当前选中的审核状态
        const selectedStatus = ref('all');

        // 投稿数据
        const submissions = ref([
            {
                id: 1,
                title: 'Vue 3.0 正式发布，带来众多新特性',
                image: 'https://picsum.photos/300/200?random=1',
                status: 'approved',
                statusText: '已通过',
                publishDate: '2023-05-15'
            },
            {
                id: 2,
                title: 'TailwindCSS 在现代 Web 开发中的应用',
                image: 'https://picsum.photos/300/200?random=2',
                status: 'pending',
                statusText: '审核中',
                publishDate: '2023-05-18'
            },
            {
                id: 3,
                title: 'React 18 新特性详解',
                image: 'https://picsum.photos/300/200?random=3',
                status: 'rejected',
                statusText: '未通过',
                publishDate: '2023-05-20'
            },
            {
                id: 4,
                title: 'TypeScript 在企业级项目中的实践',
                image: 'https://picsum.photos/300/200?random=4',
                status: 'approved',
                statusText: '已通过',
                publishDate: '2023-05-22'
            },
            {
                id: 5,
                title: 'Webpack 5 与 Vite 的性能对比',
                image: 'https://picsum.photos/300/200?random=5',
                status: 'pending',
                statusText: '审核中',
                publishDate: '2023-05-25'
            }
        ]);

        // 根据选中的审核状态筛选投稿
        const filteredSubmissions = computed(() => {
            if (selectedStatus.value === 'all') {
                return submissions.value;
            }
            return submissions.value.filter(submission => submission.status === selectedStatus.value);
        });

        // 切换审核状态
        const switchStatus = (statusId) => {
            selectedStatus.value = statusId;
        };

        // 控制删除确认气泡的显示
        const showDeleteConfirm = ref(null);

        // 显示删除确认气泡
        const showDeleteConfirmation = (id, event) => {
            event.stopPropagation();
            showDeleteConfirm.value = id;
        };

        // 隐藏删除确认气泡
        const hideDeleteConfirmation = () => {
            showDeleteConfirm.value = null;
        };

        // 确认删除投稿
        const confirmDelete = (id) => {
            const index = submissions.value.findIndex(item => item.id === id);
            if (index !== -1) {
                submissions.value.splice(index, 1);
            }
            showDeleteConfirm.value = null;
        };

        return () => (
            <div class="min-h-screen bg-gray-50 select-none" onClick={hideDeleteConfirmation}>
                <div class="container mx-auto px-4 py-6">
                    <div class="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* 页面标题 */}
                        <div class="border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 bg-blue-50">
                            <h2 class="text-xl md:text-2xl font-semibold text-gray-800">投稿中心</h2>
                        </div>

                        {/* 审核状态筛选 */}
                        <div class="p-4 md:p-6 border-b border-gray-200">
                            <div class="flex flex-wrap gap-2">
                                {
                                    statusOptions.map(option => (
                                        <button
                                            key={option.id}
                                            onClick={() => switchStatus(option.id)}
                                            class={`px-3 py-1 md:px-4 md:py-2 rounded-full text-sm font-medium transition-colors ${
                                                selectedStatus.value === option.id
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {option.name}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* 投稿列表 */}
                        <div class="p-4 md:p-6">
                            <div class="space-y-4">
                                {
                                    filteredSubmissions.value.map(submission => (
                                        <div 
                                            key={submission.id}
                                            class="flex border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                                        >
                                            {/* 投稿封面 */}
                                            <div class="w-24 flex-shrink-0">
                                                <img 
                                                    src={submission.image} 
                                                    alt={submission.title}
                                                    class="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* 投稿信息 */}
                                            <div class="flex-1 p-3 md:p-4">
                                                <h3 class="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                                                    {submission.title}
                                                </h3>
                                                
                                                <div class="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-600 mb-3">
                                                    <div>
                                                        <span class="font-medium">状态：</span>
                                                        <span class={
                                                            submission.status === 'approved' ? 'text-green-600' :
                                                            submission.status === 'pending' ? 'text-yellow-600' :
                                                            'text-red-600'
                                                        }>
                                                            {submission.statusText}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span class="font-medium">发布：</span>
                                                        <span>{submission.publishDate}</span>
                                                    </div>
                                                </div>

                                                {/* 操作按钮 */}
                                                <div class="flex space-x-2 relative">
                                                    <button class="px-2 py-1 md:px-3 md:py-1 bg-blue-500 text-white rounded text-xs md:text-sm hover:bg-blue-600 transition-colors">
                                                        修改
                                                    </button>
                                                    <button 
                                                        onClick={(event) => showDeleteConfirmation(submission.id, event)}
                                                        class="px-2 py-1 md:px-3 md:py-1 bg-red-500 text-white rounded text-xs md:text-sm hover:bg-red-600 transition-colors"
                                                    >
                                                        删除
                                                    </button>
                                                    
                                                    {/* 删除确认气泡 */}
                                                    {showDeleteConfirm.value === submission.id && (
                                                        <div 
                                                            class="absolute top-0 right-0 mt-8 mr-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <div class="p-3">
                                                                <p class="text-gray-700 text-sm mb-3">确定要删除这篇投稿吗？</p>
                                                                <div class="flex justify-end space-x-2">
                                                                    <button
                                                                        onClick={hideDeleteConfirmation}
                                                                        class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                                                    >
                                                                        取消
                                                                    </button>
                                                                    <button
                                                                        onClick={() => confirmDelete(submission.id)}
                                                                        class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                                                    >
                                                                        确定
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});