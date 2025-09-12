import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    // 用户信息数据
    const userInfo = ref({
      avatar: 'https://picsum.photos/200',
      username: '张三',
      password: '********',
      email: 'zhangsan@example.com',
      phone: '138****8888'
    });

    return () => (
      <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 py-6">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="border-b border-gray-200 px-6 py-4 bg-blue-50">
              <h2 class="text-2xl font-semibold text-gray-800">用户中心</h2>
            </div>
            
            <div class="p-6">
              <div class="flex flex-col items-center mb-8">
                <img 
                  src={userInfo.value.avatar} 
                  alt="用户头像" 
                  class="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
                />
                <h3 class="text-xl font-semibold mt-4 text-blue-600">{userInfo.value.username}</h3>
              </div>
              
              <div class="space-y-4">
                <div class="flex flex-col md:flex-row md:items-center py-3 border-b border-gray-100 hover:bg-blue-5 transition-colors">
                  <label class="font-medium text-gray-700 w-24 mb-1 md:mb-0">用户名:</label>
                  <div class="text-gray-900">{userInfo.value.username}</div>
                </div>
                
                <div class="flex flex-col md:flex-row md:items-center py-3 border-b border-gray-100 hover:bg-blue-5 transition-colors">
                  <label class="font-medium text-gray-700 w-24 mb-1 md:mb-0">密码:</label>
                  <div class="text-gray-900">{userInfo.value.password}</div>
                </div>
                
                <div class="flex flex-col md:flex-row md:items-center py-3 border-b border-gray-100 hover:bg-blue-5 transition-colors">
                  <label class="font-medium text-gray-700 w-24 mb-1 md:mb-0">邮箱:</label>
                  <div class="text-gray-900">{userInfo.value.email}</div>
                </div>
                
                <div class="flex flex-col md:flex-row md:items-center py-3 border-b border-gray-100 hover:bg-blue-5 transition-colors">
                  <label class="font-medium text-gray-700 w-24 mb-1 md:mb-0">手机号:</label>
                  <div class="text-gray-900">{userInfo.value.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});