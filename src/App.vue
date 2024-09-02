<template>
  <el-config-provider :message="config">
<router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {reactive} from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";


const locale =zhCn;
const config =reactive({
  max: 1,
});
</script>


<style lang="scss" scoped>

</style>
