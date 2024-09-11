<template>
  <starfield />
  <dashboard>
    <template #left-content>
      <div v-html="htmlContent"></div>
    </template>
  </dashboard>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";
import dashboard from "../components/Dashboard.vue";

import Starfield from "@/components/Starfield.vue";
import { getUsername } from "@/utils/Auth";

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const htmlContent = ref("");

onMounted(async () => {
  const username = getUsername();

  if (!username) {
    router.push("/");
  } else {
    // 加载 output.html 文件的内容
    const response = await fetch("../../../public/output.html");
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
