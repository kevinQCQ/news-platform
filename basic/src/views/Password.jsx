import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const formData = ref({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    const handleInput = (field, value) => {
      formData.value[field] = value;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // 简单验证
      if (formData.value.newPassword !== formData.value.confirmPassword) {
        alert('新密码与确认密码不一致');
        return;
      }
      
      // 这里应该调用API修改密码
      alert('密码修改成功');
      
      // 清空表单
      formData.value = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    };

    return () => (
      <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 py-6">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="border-b border-gray-200 px-6 py-4 bg-blue-50">
              <h2 class="text-2xl font-semibold text-gray-800">修改密码</h2>
            </div>
            
            <div class="p-6">
              <form onSubmit={handleSubmit}>
                <div class="mb-6">
                  <label class="block text-gray-700 font-medium mb-2">原密码</label>
                  <input
                    type="password"
                    value={formData.value.oldPassword}
                    onInput={(e) => handleInput('oldPassword', e.target.value)}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="请输入原密码"
                    required
                  />
                </div>
                
                <div class="mb-6">
                  <label class="block text-gray-700 font-medium mb-2">新密码</label>
                  <input
                    type="password"
                    value={formData.value.newPassword}
                    onInput={(e) => handleInput('newPassword', e.target.value)}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="请输入新密码"
                    required
                  />
                </div>
                
                <div class="mb-6">
                  <label class="block text-gray-700 font-medium mb-2">确认密码</label>
                  <input
                    type="password"
                    value={formData.value.confirmPassword}
                    onInput={(e) => handleInput('confirmPassword', e.target.value)}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="请再次输入新密码"
                    required
                  />
                </div>
                
                <div class="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      formData.value = {
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      };
                    }}
                    class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    重置
                  </button>
                  <button
                    type="submit"
                    class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});