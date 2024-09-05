<template>
  <starfield />
  <dashboard>
    <template #left-content>
      <slider />
    </template>
  </dashboard>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Starfield from "@/components/Starfield.vue";
import Slider from "@/components/Slider.vue";
import {getUsername} from "@/utils/Auth";
import Dashboard from "@/components/Dashboard.vue";
import Neural from "../components/Neural.vue"


const router = useRouter();

const handleTextSearch = () => router.push("/textSearch");
const handleImageSearch = () => router.push("/imageSearch");
const recommendation = () => router.push("/recommendation");
const logout = () => router.push("/");
const userCenter = () => router.push("/userCenter");
const goHome = () => router.push("/framework");
const handleDialogue = () => router.push("/dialogue");

const handlePersonal = () => router.push("/recommendation");
const handleOther = () => router.push("/other");

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
  font-family: "Montserrat", sans-serif;
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

</style>
