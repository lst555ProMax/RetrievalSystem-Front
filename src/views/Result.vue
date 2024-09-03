<template>
    <div class="result">
      <!-- Header -->
      <header>
        <div class="brand-logo">系统Logo</div>
        <h1>检索结果展示</h1>
      </header>
  
      <!-- Main Content -->
      <div class="main-content">
        <div class="results-container">
          <!-- Example result card -->
          <div class="result-card" v-for="(result, index) in results" :key="index">
            <img :src="result.image" alt="结果图像">
            <div class="card-content">
              <div class="card-title">{{ result.title }}</div>
              <div class="card-text">{{ result.description }}</div>
            </div>
          </div>
        </div>
      </div>
  
        <button class="refresh-button" :class="{ loading: isLoading }" @click="refreshResults">
          <div v-if="isLoading" class="loading-icon"></div>
          {{ isLoading ? ' 正在刷新...' : '刷新结果' }}
        </button>

        <FooterComponent></FooterComponent>

    </div>
  </template>
  
  <script setup>
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";
import {getUsername} from "@/utils/Auth";

import FooterComponent from '../components/FooterComponent.vue';

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
  
  // Mock data for search results
  const results = ref([
    { image: 'example-image.jpg', title: '图像标题', description: '这是与输入文本匹配的图像描述。' },
    // Repeat similar objects for additional results
  ]);
  
  const isLoading = ref(false);
  
  const refreshResults = () => {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
      alert('结果已刷新！'); // 模拟刷新完成后的操作
    }, 2000); // 模拟2秒的刷新过程
  };

  onMounted(() => {
  const username = getUsername();

  if (!username) {
    router.push("/");
  }
})
  </script>
  
  <style scoped>
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #001f3f; /* 深海蓝色调 */
    color: #D3D3D3; /* 淡雅灰色调 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    color: #D3D3D3; /* 淡雅灰色调 */
    margin: 0;
  }

  .result{
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 使页面内容至少充满整个视口 */
}
  
  .brand-logo {
    font-size: 18px;
    font-weight: bold;
    color: #39D353; /* 草绿色调 */
  }
  
  .main-content {
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height:auto;
    flex:1;
  }
  
  .results-container {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .result-card {
    background-color: #021E39; /* 深海蓝色调 */
    border: 1px solid #D3D3D3; /* 淡雅灰色调 */
    border-radius: 10px;
    overflow: hidden;
    width: 260px;
    transition: background-color 0.3s, border-color 0.3s;
  }
  
  .result-card:hover {
    background-color: #002A50; /* 鼠标悬停时背景色略微加深 */
    border-color: #39D353; /* 鼠标悬停时边框变为草绿色 */
  }
  
  .result-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
  
  .result-card .card-content {
    padding: 15px;
    color: #D3D3D3; /* 淡雅灰色调 */
  }
  
  .card-title {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 10px 0;
  }
  
  .card-text {
    font-size: 14px;
    margin: 0;
  }
  
  .refresh-button {
    padding: 15px 30px;
    background-color: #39D353; /* 草绿色调 */
    color: #D3D3D3; /* 淡雅灰色调 */
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .refresh-button:hover {
    background-color: #33B045; /* 鼠标悬停时草绿色加深 */
  }
  
  .refresh-button.loading {
    pointer-events: none;
    background-color: #33B045;
  }
  
  .loading-icon {
    border: 4px solid #D3D3D3; /* 淡雅灰色调 */
    border-radius: 50%;
    border-top: 4px solid #39D353; /* 草绿色调 */
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    display: inline-block;
    vertical-align: middle;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  