<template>
    <div class="recommendation">
      <headbar></headbar>

      <div class="non-header">
      <sidebar></sidebar>
  
      <div class="main-content">
        <!-- 推荐列表 -->
        <div class="recommendation-list">
          <h2>推荐列表</h2>
          <div class="recommendation-item" v-for="(item, index) in recommendationItems" :key="index">
            <img :src="item.image" :alt="item.altText">
            <p>{{ item.description }}</p>
          </div>
        </div>
  
        <!-- 推荐算法设置 -->
        <div class="settings-panel">
          <h2>推荐算法设置</h2>
          <label for="keywords">关键词：</label>
          <input type="text" id="keywords" v-model="keywords" placeholder="输入关键词">
  
          <label for="tags">标签：</label>
          <select id="tags" v-model="selectedTag">
            <option v-for="(tag, index) in tags" :key="index" :value="tag">{{ tag }}</option>
          </select>
  
          <label for="user-profile">用户画像：</label>
          <input type="text" id="user-profile" v-model="userProfile" placeholder="输入用户画像">
  
          <button class="btn" @click="applySettings">应用设置</button>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import sidebar from '../components/Sidebar.vue';
  import headbar from "../components/Headbar.vue";

const router = useRouter();
const route = useRoute();

// 定义响应式数据
const recommendationItems = ref([
  { image: 'image1.jpg', altText: '推荐图片1', description: '图片描述1 - 来源1' },
  { image: 'image2.jpg', altText: '推荐图片2', description: '图片描述2 - 来源2' },
  { image: 'image3.jpg', altText: '推荐图片3', description: '图片描述3 - 来源3' },
]);

const keywords = ref('');
const tags = ref(['标签1', '标签2', '标签3']);
const selectedTag = ref('');
const userProfile = ref('');

// 方法定义
const applySettings = () => {
  console.log('关键词:', keywords.value);
  console.log('选择的标签:', selectedTag.value);
  console.log('用户画像:', userProfile.value);
};

  const returnToFrame =() =>{
    router.push("/")
  }
  </script>
  
  <style scoped>
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: #001f3f; /* 深海蓝色调 */
    color: #D3D3D3; /* 淡雅灰色调 */
  }
  

  .recommendation{
    display: flex; /* 使用Flexbox布局 */
  height: calc(100vh - 10px); /* 视口高度减去外边距总和，调整为适合的高度 */
  margin: 5px;
  border-radius: 5px; /* 设置圆角 */
  overflow: hidden; /* 确保圆角不会因内容溢出而被破坏 */
  box-sizing: border-box; /* 包含外边距计算 */
  flex-direction: column;
}

.non-header {
  display: flex;
  height: calc(100% - 60px);
  flex-direction: row;
}
  
  .main-content {
    display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  flex: 1;
  overflow-y: auto; /* 如果内容超出高度，允许在该区域滚动 */
  background-color: #0e0d27;
  box-sizing: border-box; /* 包含 padding 在内计算总高度 */
  height: calc(100%);
  }
  
  .recommendation-list,
  .settings-panel {
    background-color: #021e39; /* 深海蓝色调 */
    border-radius: 10px;
    padding: 20px;
    width: 45%;
    margin:20px;
  }
  
  .recommendation-list h2,
  .settings-panel h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .recommendation-item {
    margin-bottom: 15px;
  }
  
  .recommendation-item img {
    width: 100%;
    border-radius: 5px;
  }
  
  .recommendation-item p {
    margin-top: 10px;
    font-size: 14px;
  }
  
  .settings-panel label {
    display: block;
    margin: 15px 0 5px;
    font-size: 16px;
  }
  
  .settings-panel input[type='text'],
  .settings-panel select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #d3d3d3; /* 淡雅灰色调 */
    background-color: #021e39; /* 深海蓝色调 */
    color: #d3d3d3; /* 淡雅灰色调 */
  }
  
  
  .btn {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #39d353; /* 草绿色调 */
    color: #d3d3d3; /* 淡雅灰色调 */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #33b045; /* 鼠标悬停时草绿色加深 */
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
  