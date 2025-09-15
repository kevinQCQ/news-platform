<template>
  <div class="auth-container">
    <!-- 背景装饰 -->
    <div class="auth-bg"></div>
    
    <!-- 主卡片 -->
    <div class="auth-card">
      <!-- 标题区域 -->
      <div class="auth-header">
        <h1 class="auth-title">{{ isLoginMode ? '欢迎登录' : '创建账号' }}</h1>
        <p class="auth-subtitle">
          {{ isLoginMode ? '请输入账号信息登录' : '填写以下信息完成注册' }}
        </p>
      </div>
      
      <!-- 表单区域 -->
      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- 注册模式特有字段 -->
        <template v-if="!isLoginMode">
          <!-- 用户名 -->
          <div class="form-group">
            <label for="username" class="form-label">用户名</label>
            <input
              type="text"
              id="username"
              v-model="formData.username"
              class="form-input"
              placeholder="请设置用户名"
              minlength="2"
              maxlength="16"
              required
            >
            <p class="form-hint">2-16位字符，可包含字母、数字和下划线</p>
          </div>
          
          <!-- 邮箱 -->
          <div class="form-group">
            <label for="email" class="form-label">邮箱</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="form-input"
              placeholder="请输入邮箱"
              required
            >
            <p class="form-hint">用于账号验证和密码找回</p>
          </div>
        </template>
        
        <!-- 手机号（登录/注册都需要） -->
        <div class="form-group">
          <label for="phone" class="form-label">手机号</label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            class="form-input"
            placeholder="请输入手机号"
            pattern="1[3-9]\d{9}"
            required
          >
        </div>
        
        <!-- 密码 -->
        <div class="form-group">
          <label for="password" class="form-label">密码</label>
          <div class="password-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="formData.password"
              class="form-input password-input"
              placeholder="请设置密码"
              minlength="6"
              maxlength="20"
              required
            >
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '隐藏' : '显示' }}
            </button>
          </div>
          <p class="form-hint">6-20位字符，建议包含字母和数字</p>
        </div>
        
        <!-- 提交按钮 -->
        <button type="submit" class="submit-btn">
          {{ isLoginMode ? '登录' : '注册' }}
        </button>
        
        <!-- 切换模式 -->
        <div class="mode-switch">
          <span>
            {{ isLoginMode ? '还没有账号？' : '已有账号？' }}
            <button
              type="button"
              class="switch-btn"
              @click="toggleMode"
            >
              {{ isLoginMode ? '立即注册' : '登录' }}
            </button>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

// 路由实例
const router = useRouter();

// 登录/注册模式切换
const isLoginMode = ref(true);

// 密码显示状态
const showPassword = ref(false);

// 表单数据
const formData = reactive({
  username: '',
  email: '',
  phone: '',
  password: ''
});

// 切换登录/注册模式
const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
  // 清空表单
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
  // 重置密码显示状态
  showPassword.value = false;
};

// 表单提交处理
const handleSubmit = () => {
  if (isLoginMode.value) {
    // 登录逻辑
    console.log('登录信息:', {
      phone: formData.phone,
      password: formData.password
    });
    // 模拟登录成功
    alert('登录成功！');
    router.push('/'); // 登录成功后跳转到首页
  } else {
    // 注册逻辑
    console.log('注册信息:', {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });
    // 模拟注册成功
    alert('注册成功！即将跳转到登录页面');
    toggleMode(); // 注册成功后切换到登录模式
  }
};
</script>

<style scoped>
/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 容器样式 */
.auth-container {
  margin-top:60px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
}

/* 背景样式 */
.auth-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf5 100%);
  z-index: 1;
}

/* 卡片样式 */
.auth-card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.auth-card:hover {
  transform: translateY(-5px);
}

/* 标题样式 */
.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.auth-subtitle {
  font-size: 14px;
  color: #666;
}

/* 表单样式 */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.form-hint {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

/* 密码输入框样式 */
.password-wrapper {
  position: relative;
}

.password-input {
  padding-right: 80px;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.toggle-password:hover {
  color: #4285f4;
  background-color: #f5f7fa;
}

/* 提交按钮样式 */
.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  background-color: #3367d6;
}

.submit-btn:active {
  transform: scale(0.98);
}

/* 模式切换样式 */
.mode-switch {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.switch-btn {
  background: none;
  border: none;
  color: #4285f4;
  font-size: 14px;
  cursor: pointer;
  padding: 0 3px;
  font-weight: 500;
}

.switch-btn:hover {
  text-decoration: underline;
}

/* 响应式调整 */
@media (max-width: 480px) {
  .auth-card {
    padding: 20px 15px;
  }
  
  .auth-title {
    font-size: 22px;
  }
  
  .form-input {
    padding: 11px 12px;
    font-size: 14px;
  }
  
  .submit-btn {
    padding: 12px;
    font-size: 15px;
  }
}
</style>
