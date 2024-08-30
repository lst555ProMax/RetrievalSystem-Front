<template>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <h1>跨模态图像文本检索系统</h1>
      <p>让图像和文本连接更紧密</p>
    </header>

    <div class="main-content">
      <section class="user-info">
        <h2>用户名</h2>
        <p>邮箱：example@example.com</p>
        <p>昵称：用户昵称</p>
        <p>注册日期：2023年10月1日</p>
      </section>

      <section class="search-history">
        <h2>历史检索记录</h2>
        <ul>
          <li>检索关键词：图片检索</li>
          <li>检索关键词：文本检索</li>
          <li>检索关键词：高级检索</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

// 动态背景色
onMounted(() => {
  const container = document.querySelector('.container');
  const gradient = container.querySelector('::before');

  function updateGradient(e) {
    const { clientX: x, clientY: y } = e;
    const { offsetWidth: width, offsetHeight: height } = container;

    // 计算相对位置
    const xPos = (x / width) * 100;
    const yPos = (y / height) * 100;

    // 更新渐变位置
    container.style.setProperty('--gradient-x', `${xPos}%`);
    container.style.setProperty('--gradient-y', `${yPos}%`);
  }

  container.addEventListener('mousemove', updateGradient);

  onUnmounted(() => {
    container.removeEventListener('mousemove', updateGradient);
  });
});

</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  background-color: #001f3f; /* 深海蓝色调 */
  color: #d3d3d3; /* 淡雅灰色调 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

header {
  background-color: #001f3f; /* 深海蓝色的略深调 */
  padding: 20px;
  text-align: center;
}

header h1 {
  font-size: 24px;
  font-weight: bold;
  color: #d3d3d3; /* 淡雅灰色调 */
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  flex: 1; 
  margin: 5px;
  background-color: #001732; 
  height: calc(100vh - 10px);
  border-radius: 5px;

  position: relative;
  overflow: hidden;
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 5%);
  pointer-events: none;
  transition: transform 0.1s ease-out;
  transform: scale(1) translate(calc(var(--gradient-x) - 50%), calc(var(--gradient-y) - 50%));
  z-index: 1;
}

.main-content {
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
}

.user-info,
.search-history {
  width: 50%;
  margin: 10px;
  padding: 10px;
  background-color: #021e39; /* 深海蓝色调 */
  color: #d3d3d3; /* 淡雅灰色调 */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-info img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.user-info h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.search-history ul {
  list-style: none;
  padding: 0;
}

.search-history li {
  margin-bottom: 10px;
}

</style>