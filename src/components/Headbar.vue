<template>
  <div class="header-bar">
    <div class="header-content">
      <h1>后台管理系统</h1>
      <div class="icon-container">
        <i
          class="fa-solid fa-message fa-fade fa-xl"
          style="color: #bdc4d0"
          @click="uploadMessage"
        ></i>

        <div class="formVision">
          <el-form ref="form" :model="form" label-width="80px">

          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const goHome = () => router.push("/home");
const handleProfile = () => router.push("/profile");
const handleSettings = () => router.push("/settings");

const form = ref({});
</script>

<style scoped>
.header-bar {
  height: 60px;
  width: 100%;
  background-color: #001732;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  /*     border-bottom: 1px solid #d3d3d3; */
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.header-content h1 {
  font-size: 20px;
  color: #d3d3d3;
  margin: 0;
}
.icon-container {
  position: relative; /* 用于定位文本框 */
  display: inline-block; /* 使图标和文本框在同一行 */
}

.formVision {
  width:400px;
  height:600px;
  display: none; /* 默认隐藏 */
  background-color: #222336;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);/* 创建一个柔和的阴影效果，使元素从页面中浮起来，增强视觉层次感 */
  position: absolute;
  top: 120%; /* 将元素的顶部边缘定位在其包含块的顶部边缘以下 120% 的位置 */
  left: 50%;/* 将元素的左边缘定位在其包含块的左边缘的 50% 位置 */
  transform: translateX(-100%);/* 将元素在水平方向上移动其自身宽度的 50% */
  z-index: 10;/* 设置元素的堆叠顺序，值越大，元素越位于其他元素之上 */
}

.icon-container:hover .formVision {
  display: block; /* 鼠标悬浮时显示 */
}

.nav-links {
  display: flex;
  gap: 15px;
}

.nav-links a {
  color: #d3d3d3;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #39d353;
}
</style>
