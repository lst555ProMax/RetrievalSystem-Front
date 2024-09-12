<template>
  <component :is="currentThemeComponent" />
  <dashboard>
    <template #left-content>
      <slider />
    </template>
  </dashboard>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import Starfield from "@/components/Starfield.vue";
import CrossStar from "@/components/CrossStar.vue";
import Slider from "@/components/Slider.vue";
import { getUsername } from "@/utils/Auth";
import Dashboard from "@/components/Dashboard.vue";
import Neural from "../components/Neural.vue";
import { useThemeStore } from "../stores/themeStore";

const router = useRouter();

// 路由处理函数
const handleTextSearch = () => router.push("/textSearch");
const handleImageSearch = () => router.push("/imageSearch");
const recommendation = () => router.push("/recommendation");
const logout = () => router.push("/");
const userCenter = () => router.push("/userCenter");
const goHome = () => router.push("/framework");
const handleDialogue = () => router.push("/dialogue");

const handlePersonal = () => router.push("/recommendation");
const handleOther = () => router.push("/other");

const currentTheme = ref("Starfield");

// 计算当前要显示的组件
const currentThemeComponent = computed(() => {
  switch (currentTheme.value) {
    case "Neural":
      return Neural;
    case "CrossStar":
      return CrossStar;
    default:
      return Starfield;
  }
});

// 页面加载时检查用户名
onMounted(() => {
  const username = getUsername();

  if (!username) {
    router.push("/");
  } else {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      currentTheme.value = savedTheme;
    }
  }
});
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
  display: flex;
  height: calc(100vh - 10px); /* 视口高度减去外边距总和，调整为适合的高度 */
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
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
  padding: 10px;
  align-items: center;
  overflow-y: auto;
  justify-content: space-between;
  box-sizing: border-box;
  height: calc(100%);
}
</style>
