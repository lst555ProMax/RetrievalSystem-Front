<template>
  <starfield />

  <div class="image-upload-system">
    <headbar></headbar>
    <div class="non-header">
      <sidebar></sidebar>

      <div class="main-content">
        <div v-html="htmlContent"></div>
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
import Starfield from "@/components/Starfield.vue"
import { getUsername } from "@/utils/Auth"

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const htmlContent = ref("")

onMounted(async () => {
  const username = getUsername();

  if (!username) {
    router.push("/");
  }
  else {
    // 加载 output.html 文件的内容
    const response = await fetch('../../../public/output.html'); // 确保路径正确
    htmlContent.value = await response.text();
  }
});

</script>

<style scoped>
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
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
  box-sizing: border-box; /* 包含 padding 在内计算总高度 */
  height: calc(100%);
}
</style>