<template>
  <div class="login-container">
    <!-- 背景层 -->
    <div class="background"></div>
    
    <!-- 主容器：包含插画和登录表单 -->
    <div class="main-content">
      <!-- 插画区域 -->
      <div class="illustration">
        <img src="https://picsum.photos/800/600?random=10" alt="背景插画" class="illustration-img" />
        
        <!-- 装饰性文字元素 -->
        <div class="illustration-text">
          <h2>欢迎使用通讯员系统</h2>
          <p>高效、安全的信息管理平台</p>
        </div>
      </div>
      
      <!-- 登录表单卡片（嵌入在插画上） -->
      <div class="login-card"  v-if="isLogin">
        <div class="card-header">
          <div class="logo">
            <span class="system-name">通讯员系统</span>
          </div>
          <h3 class="login-title">账号登录</h3>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- 用户名输入 -->
          <div class="form-group">
            <input
              type="text"
              v-model="formData.username"
              placeholder="请输入用户名/手机号"
              class="form-input"
              required
            />
          </div>
          
          <!-- 密码输入 -->
          <div class="form-group">
            <input
              type="password"
              v-model="formData.password"
              placeholder="请输入密码"
              class="form-input"
              required
            />
          </div>
          
          <!-- 验证码区域 -->
          <div class="form-group captcha-group">
            <input
              type="text"
              v-model="formData.captcha"
              placeholder="请输入验证码"
              class="form-input captcha-input"
              required
            />
            <img
              :src="captchaImg"
              alt="验证码"
              class="captcha-img"
              @click="refreshCaptcha"
            />
          </div>
          
          <!-- 自动登录选项 -->
          <div class="form-options">
            <label class="auto-login">
              <input
                type="checkbox"
                v-model="formData.autoLogin"
                class="auto-login-checkbox"
              />
              自动登录
            </label>
            <a href="#" class="forgot-password" @click="isLogin = !isLogin">注册账号</a>
          </div>
          
          <!-- 登录按钮 -->
          <button type="submit" class="login-btn">登录</button>
        </form>
      </div>

      <!-- 注册表单卡片（嵌入在插画上） -->
      <div class="login-card" v-if="!isLogin">
        <div class="card-header">
          <div class="logo">
            <span class="system-name">通讯员系统</span>
          </div>
          <h3 class="login-title">账号注册</h3>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form" >
          <!-- 用户名输入 -->
          <div class="form-group">
            <input
              type="text"
              v-model="formData.username"
              placeholder="请输入邮箱号"
              class="form-input"
              required
            />
          </div>
          
          <!-- 密码输入 -->
          <div class="form-group">
            <input
              type="password"
              v-model="formData.password"
              placeholder="请输入密码"
              class="form-input"
              required
            />
          </div>

          <!-- 确认密码输入 -->
          <div class="form-group">
            <input
              type="password"
              v-model="formData.password"
              placeholder="请输入密码"
              class="form-input"
              required
            />
          </div>
          
          <!-- 验证码区域 -->
          <div class="form-group captcha-group">
            <input
              type="text"
              v-model="formData.captcha"
              placeholder="请输入验证码"
              class="form-input captcha-input"
              required
            />
            <button class="captcha-img" @click="refreshCaptcha">获取验证码</button>
          </div>
          
          <!-- 自动登录选项 -->
          <div class="form-options">
            <label class="auto-login">
              <input
                type="checkbox"
                v-model="formData.autoLogin"
                class="auto-login-checkbox"
              />
              自动登录
            </label>
            <a href="#" class="forgot-password" @click="isLogin = !isLogin">返回登录</a>
          </div>
          
          <!-- 登录按钮 -->
          <button type="submit" class="login-btn">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLogin = ref(true);

// 表单数据
const formData = ref({
  username: '',
  password: '',
  captcha: '',
  autoLogin: false
});

// 验证码图片
const captchaImg = ref(`https://picsum.photos/120/40?random=${Math.random()}`);

// 刷新验证码
const refreshCaptcha = () => {
  captchaImg.value = `https://picsum.photos/120/40?random=${Math.random()}`;
  formData.value.captcha = '';
};

// 登录处理
const handleLogin = () => {
  console.log('登录数据:', formData.value);
  // 实际项目中这里会调用登录接口
};



</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 背景层 */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #cdd3db;
  z-index: 1;
}

/* 主内容容器 */
.main-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  max-width: 1700px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 插画区域 */
.illustration {
  position: relative;
  width: 95%;
  height: 90vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.illustration-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 插画上的文字 */
.illustration-text {
  position: absolute;
  top: 30px;
  left: 40px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.illustration-text h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

.illustration-text p {
  font-size: 16px;
  opacity: 0.9;
}

/* 登录卡片（嵌入在插画上） */
.login-card {
  position: absolute;
  right: 130px;
  width: 350px;
  height: 70vh;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 15px;
  z-index: 10;
  transform: translateY(-10px);
}

/* 卡片头部 */
.card-header {
  text-align: center;
  margin-bottom: 25px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.logo-img {
  width: 20px;
  height: 36px;
  margin-right: 10px;
  border-radius: 50%;
}

.system-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.login-title {
  font-size: 18px;
  color: #666;
  font-weight: 500;
}

/* 表单样式 */
.login-form {
  width: 90%;
}

.form-group {
  margin-bottom: 18px;
}

.form-input {
  width: 100%;
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #4285f4;
  box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
}

/* 验证码区域 */
.captcha-group {
  display: flex;
  gap: 10px;
}

.captcha-input {
  flex: 1;
}

.captcha-img {
  width: 120px;
  height: 44px;
  border-radius: 6px;
  cursor: pointer;
  object-fit: cover;
}

/* 表单选项 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 13px;
}

.auto-login {
  display: flex;
  align-items: center;
  color: #666;
  cursor: pointer;
}

.auto-login-checkbox {
  margin-right: 5px;
}

.forgot-password {
  color: #4285f4;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  padding: 8px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #3367d6;
}

/* 响应式调整 */
@media (max-width: 900px) {
  .illustration {
    width: 100%;
  }
  
  .login-card {
    position: relative;
    right: 0;
    margin-top: -100px;
    width: 90%;
    max-width: 350px;
  }
  
  .main-content {
    flex-direction: column;
  }
}
</style>
    