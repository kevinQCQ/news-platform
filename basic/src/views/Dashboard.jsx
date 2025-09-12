import { defineComponent, ref } from "vue";
import Profile from "./Profile.jsx";
import Password from "./Password.jsx";
import SubmissionList from "./SubmissionList.jsx";

export default defineComponent({
  setup() {
    const activePage = ref('profile');

    const switchPage = (page) => {
      activePage.value = page;
    };

    return () => (
      <div class="min-h-screen bg-gray-50 flex">
        {/* 侧边菜单 - 移动端缩略展示，PC端正常展示 */}
        <div class="bg-white shadow-md md:shadow-lg z-10 w-16 md:w-64 flex-shrink-0 overflow-hidden">
          {/* 用户信息区域 */}
          <div class="p-4 border-b border-gray-200 bg-blue-50">
            <div class="flex items-center">
              <img 
                src="https://picsum.photos/200" 
                alt="用户头像" 
                class="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-300"
              />
              <div class="ml-2 md:ml-4 hidden md:block">
                <h2 class="font-semibold text-gray-800 text-sm md:text-base">张三</h2>
                <p class="text-xs md:text-sm text-blue-600">普通用户</p>
              </div>
            </div>
          </div>
          
          {/* 菜单导航 */}
          <nav class="p-2">
            <button
              onClick={() => switchPage('profile')}
              class={`w-full text-left px-2 md:px-4 py-3 rounded-lg transition-colors flex items-center justify-center md:justify-start mb-1 ${
                activePage.value === 'profile'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-blue-50'
              }`}
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="hidden md:inline md:ml-3">用户中心</span>
            </button>
            <button
              onClick={() => switchPage('password')}
              class={`w-full text-left px-2 md:px-4 py-3 rounded-lg transition-colors flex items-center justify-center md:justify-start mb-1 ${
                activePage.value === 'password'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-blue-50'
              }`}
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <span class="hidden md:inline md:ml-3">修改密码</span>
            </button>
            <button
              onClick={() => switchPage('submissions')}
              class={`w-full text-left px-2 md:px-4 py-3 rounded-lg transition-colors flex items-center justify-center md:justify-start ${
                activePage.value === 'submissions'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-blue-50'
              }`}
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span class="hidden md:inline md:ml-3">投稿中心</span>
            </button>
          </nav>
        </div>

        {/* 主内容区域 */}
        <div class="flex-1 overflow-auto">
          {activePage.value === 'profile' && <Profile />}
          {activePage.value === 'password' && <Password />}
          {activePage.value === 'submissions' && <SubmissionList />}
        </div>
      </div>
    );
  }
});