<template>
  <starfield />

  <div class="admin-panel">
    <!-- 左侧侧边栏 -->

    <headbar @toggleForm="handleToggleForm"></headbar>
    <div class="non-header">
      <sidebar></sidebar>

      <!-- 右侧主内容区域 -->
      <div class="main-content">
        <div class="module-container">
          <div class="module" v-for="(module, index) in modules" :key="index">
            <h2>{{ module.title }}</h2>
            <a
              v-if="module.title === '文本检索'"
              @click.prevent="handleTextSearch"
              href="#"
            >
              {{ module.buttonText }}
            </a>
            <a
              v-if="module.title === '图像检索'"
              @click.prevent="handleImageSearch"
              href="#"
            >
              {{ module.buttonText }}
            </a>
            <a
              v-if="module.title === '个性化推荐'"
              @click.prevent="recommendation"
              href="#"
            >
              {{ module.buttonText }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FooterComponent from "../components/FooterComponent.vue";
import Sidebar from "../components/Sidebar.vue";
import headbar from "../components/Headbar.vue";
import Starfield from "@/components/Starfield.vue"


const router = useRouter();



const modules = [
  { title: "文本检索", link: "#", buttonText: "文本检索" },
  { title: "图像检索", link: "#", buttonText: "图像检索" },
  { title: "个性化推荐", link: "#", buttonText: "个性化推荐" },
];

const handleTextSearch = () => router.push("/textSearch");
const handleImageSearch = () => router.push("/imageSearch");
const recommendation = () => router.push("/recommendation");
const logout = () => router.push("/");
const userCenter = () => router.push("/userCenter");
const goHome = () => router.push("/framework");
const handleDialogue = () => router.push("/dialogue");

const handlePersonal = () => router.push("/recommendation");
const handleOther = () => router.push("/other");

</script>

<style scoped>
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  background-color: #001f3f;
  color: #d3d3d3;
  display: flex;
  flex-direction: column;
}

.admin-panel {
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
  flex: 1;
  flex-direction: column;
  padding: 10px; /* 减少内边距以适应视口 */
  align-items: center;
  overflow-y: auto; /* 如果内容超出高度，允许在该区域滚动 */
  justify-content: space-between; /* 分布内容，避免超出视口 */
  box-sizing: border-box; /* 包含 padding 在内计算总高度 */
  height: calc(100%);
}

.module-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px; /* 减少模块之间的间距 */
  margin-bottom: 10px; /* 减少底部外边距 */
  flex: 1; /* 让模块容器自适应高度 */
  overflow: hidden; /* 防止内容溢出 */
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

</style>
