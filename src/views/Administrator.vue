<template>
    <div class="administrator">
      <header>
        <div class="brand-logo">系统Logo</div>
        <h1>后台管理面板</h1>
      </header>
  
      <main class="main-content">
        <div class="module-container">
          <div class="module" v-for="(module, index) in modules" :key="index">
            <h2>{{ module.title }}</h2>
            <a :href="module.link">{{ module.buttonText }}</a>
          </div>
        </div>
        <div class="button-container">
          <button class="logout-button" @click="logout">
            退出后台
            <span v-if="isLoggingOut" class="loading-icon"></span>
          </button>
        </div>
      </main>
  
      <footer>
        <p>&copy; 2024 系统公司 | <a href="#">版权信息</a></p>
      </footer>
    </div>
  </template>
  
  <script setup>
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
  
  const isLoggingOut = ref(false);
  
  const modules = [
    { title: '用户管理', link: '#', buttonText: '管理用户' },
    { title: '图像管理', link: '#', buttonText: '管理图像' },
    { title: '系统日志', link: '#', buttonText: '查看日志' },
    // 添加更多功能模块
  ];
  
  const logout = () => {
    router.push("/")
  };
  </script>
  
  <style scoped>
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #001f3f; /* 深海蓝色调 */
    color: #d3d3d3; /* 淡雅灰色调 */
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  header {
    background-color: #001732; /* 深海蓝色的略深调 */
    padding: 20px;
    text-align: center;
  }
  
  header h1 {
    font-size: 24px;
    font-weight: bold;
    color: #d3d3d3; /* 淡雅灰色调 */
    margin: 0;
  }

  .administrator{
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 使页面内容至少充满整个视口 */
}
  
  .brand-logo {
    font-size: 18px;
    font-weight: bold;
    color: #39d353; /* 草绿色调 */
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: auto;
    flex:1;
  }
  
  .module-container {
    width: 100%;
    max-width: 1200px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .module {
    background-color: #001f3f; /* 深海蓝色调 */
    border: 1px solid #d3d3d3; /* 淡雅灰色调 */
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    color: #d3d3d3; /* 淡雅灰色调 */
    transition: background-color 0.3s;
  }
  
  .module:hover {
    background-color: #001732; /* 深海蓝色的略深调 */
  }
  
  .module a {
    display: block;
    padding: 15px;
    background-color: #39d353; /* 草绿色调 */
    color: #d3d3d3; /* 淡雅灰色调 */
    text-decoration: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  .module a:hover {
    background-color: #33b045; /* 草绿色加深 */
  }
  
  .button-container {
    text-align: center;
    padding: 20px;
  }
  
  .logout-button {
    padding: 15px 30px;
    background-color: #39d353; /* 草绿色调 */
    color: #d3d3d3; /* 淡雅灰色调 */
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .logout-button:hover {
    background-color: #33b045; /* 鼠标悬停时草绿色加深 */
  }
  
  footer {
    text-align: center;
    padding: 10px;
    background-color: #001732; /* 深海蓝色的略深调 */
    color: #d3d3d3; /* 淡雅灰色调 */
  }
  
  footer p {
    margin: 0;
  }
  
  footer a {
    color: #d3d3d3; /* 淡雅灰色调 */
    text-decoration: none;
    transition: text-decoration 0.3s;
  }
  
  footer a:hover {
    text-decoration: underline;
  }
  
  .loading-icon {
    border: 4px solid #d3d3d3; /* 淡雅灰色调 */
    border-radius: 50%;
    border-top: 4px solid #39d353; /* 草绿色调 */
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  