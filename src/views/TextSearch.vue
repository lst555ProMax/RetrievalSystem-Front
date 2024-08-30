<template>
  <div class="text-search">
    <headbar></headbar>
    <div class="non-header">
      <sidebar></sidebar>

      <div class="main-content">
        <div class="search-form">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="输入文本以检索图像..."
          />
          <button :class="{ loading: isLoading }" @click="startSearch">
            <span v-if="isLoading" class="loading-icon"></span>
            <span v-else>查询</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";

import sidebar from "../components/Sidebar.vue";
import headbar from "../components/Headbar.vue";

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const searchQuery = ref("");
const isLoading = ref(false);

const startSearch = () => {
  router.push("/result");
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  background-color: #001f3f; /* 深海蓝色调 */
  color: #d3d3d3; /* 淡雅灰色调 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.text-search {
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
  flex: 1;
  padding: 10px; /* 减少内边距以适应视口 */
  display: flex;
  flex-direction: column; /* 垂直排列阵容 */
  align-items: center;
  overflow-y: auto; /* 如果内容超出高度，允许在该区域滚动 */
  justify-content: space-between; /* 分布内容，避免超出视口 */
  background-color: #0e0d27;
  box-sizing: border-box; /* 包含 padding 在内计算总高度 */
  height: calc(100%);
}

.search-form {
  width: 100%;
  height: 50%;
  max-width: 600px;
  text-align: center;
}

.search-form input[type="text"] {
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #d3d3d3; /* 淡雅灰色调 */
  background-color: #021e39; /* 深海蓝色调 */
  color: #d3d3d3; /* 淡雅灰色调 */
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-form input[type="text"]:focus {
  border-color: #39d353; /* 草绿色调 */
  outline: none;
}

.search-form button {
  width: 100%;
  padding: 15px;
  background-color: #39d353; /* 草绿色调 */
  color: #d3d3d3; /* 淡雅灰色调 */
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
}

.search-form button:hover {
  background-color: #33b045; /* 鼠标悬停时草绿色加深 */
}

.search-form button.loading {
  pointer-events: none;
  background-color: #33b045;
}

.loading-icon {
  border: 4px solid #d3d3d3; /* 淡雅灰色调 */
  border-radius: 50%;
  border-top: 4px solid #39d353; /* 草绿色调 */
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
