<template>
  <div class="image-upload-system">
    <headbar></headbar>
    <div class="non-header">
      <sidebar></sidebar>

      <div class="main-content">
        <div class="upload-form">
          <input
            type="file"
            id="file-upload"
            style="display: none"
            @change="uploadFile"
          />
          <button class="upload" @click="triggerUpload">
            <span>上传图像</span>
          </button>
          <button class="search" @click="startSearch">
            <span>查询</span>
          </button>
          <div class="progress-bar-container" v-if="progress > 0">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
          </div>
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

const isLoading = ref(false);
const progress = ref(0);

const triggerUpload = () => {
  document.getElementById("file-upload").click();
};

const uploadFile = () => {
  isLoading.value = true;
  progress.value = 0;

  const progressBar = document.querySelector(".progress-bar-container");
  progressBar.style.display = "block";

  // Simulate file upload progress
  const interval = setInterval(() => {
    progress.value += 10;

    if (progress.value >= 100) {
      clearInterval(interval);
      isLoading.value = false;
      alert("上传成功！");
    }
  }, 200); // Simulate progress update every 200ms
};

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

.image-upload-system {
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
  flex-direction: column;
  align-items: center;
  padding: 10px;
  flex: 1;
  overflow-y: auto; /* 如果内容超出高度，允许在该区域滚动 */
  background-color: #0e0d27;
  box-sizing: border-box; /* 包含 padding 在内计算总高度 */
  height: calc(100%);
}

.upload-form {
  width: 100%;
  height: 50%;
  max-width: 600px;
  text-align: center;
  margin-top: 20px;
}

.upload,
.search {
  width: 100%;
  height: 20%;
  max-width: 600px;
  text-align: center;
}

.upload-form button {
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
  margin-top: 30px; /* 增加按钮之间的垂直间距 */
}

.upload-form button:hover {
  background-color: #33b045; /* 鼠标悬停时草绿色加深 */
}

.upload-form button.loading {
  pointer-events: none;
  background-color: #33b045;
}

.progress-bar-container {
  width: 100%;
  background-color: #d3d3d3; /* 淡雅灰色调 */
  border-radius: 10px;
  margin-top: 20px;
  overflow: hidden;
}

.progress-bar {
  height: 20px;
  background-color: #39d353; /* 草绿色调 */
  border-radius: 10px;
  transition: width 0.4s;
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
