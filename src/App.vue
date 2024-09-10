<template>
  <el-config-provider :message="config">
<router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {reactive,watch} from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { useFontStore } from './stores/FontStore';


const fontStore = useFontStore();
const locale =zhCn;
const config =reactive({
  max: 1,
});

watch(
  () => fontStore.font,
  (newFont) => {
    document.body.style.fontFamily = newFont;
  },
  { immediate: true } // 初始时立即应用
);
</script>


<style lang="scss" scoped>

</style>
