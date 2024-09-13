<template>
  <component :is="currentThemeComponent" />
  <dashboard>
    <template #left-content>
      <div v-html="htmlContent"></div>
    </template>
  </dashboard>
</template>

<script setup>
import {
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
  onMounted,
  computed,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";
import dashboard from "../components/Dashboard.vue";
import Starfield from "../components/Starfield.vue";
import CrossStar from "@/components/CrossStar.vue";
import Neural from "../components/Neural.vue";
import { getUsername } from "@/utils/Auth";

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const htmlContent = ref("");

const currentTheme = ref("Starfield");

const checkUserAndInitialize = () => {
  const username = getUsername();
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    currentTheme.value = savedTheme;
  }

  if (!username) {
    router.push("/");
  }
};

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

const loadHtmlContent = async () => {
  try {
    const response = await fetch("../../public/output.html");
    htmlContent.value = await response.text();
  } catch (error) {
    console.error("Failed to load HTML content:", error);
  }
};

onMounted(() => {
  const username = getUsername();
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    currentTheme.value = savedTheme;
  }

  loadHtmlContent();

  if (!username) {
    router.push("/");
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
  flex-direction: column;
  align-items: center;
  padding: 10px;
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
  height: calc(100%);
}
</style>
