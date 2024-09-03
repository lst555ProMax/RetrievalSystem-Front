<template>
  <CrossStar />

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
import Starfield from "@/components/Starfield.vue";
import Neural from "@/components/Neural.vue"
import CrossStar from "@/components/CrossStar.vue";
import { getUsername } from "@/utils/Auth"

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

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
  padding: 0;
  font-family: "Montserrat", sans-serif;
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
  height: calc(100vh - 10px);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
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