<template>
  <div class="header-bar">
    <div class="header-content">
      <h1>后台管理系统</h1>
      <div class="icon-container">
        <el-button class="gradient-button">充值</el-button>

<!-- -------------------------------------------------------------------------------------- -->
        <i
          class="fa-solid fa-message fa-fade fa-xl"
          style="color: #bdc4d0"
          @click="loadSettings"
        ></i>

        <div class="form1Vision">
          <div class="tabs">
<!--             <button
              @click="activeTab = 'officialNotice'"
              :class="{ active: activeTab === 'officialNotice' }"
            >
              官方通知
            </button>
            <button
              @click="activeTab = 'dynamic'"
              :class="{ active: activeTab === 'dynamic' }"
            >
              动态
            </button> -->
          </div>
          <el-form ref="form1" :model="form1" label-width="80px">
            <component :is="activeTabComponent"></component>
          </el-form>
        </div>

<!-- -------------------------------------------------------------------------------------- -->
        <i
          class="fa-solid fa-gear fa-fade fa-xl"
          style="color: #bdc4d0"
          @click="loadMessage"
        ></i>

        <div class="form2Vision">
          <div class="tabs">
<!--             <button
              @click="activeTab = 'officialNotice'"
              :class="{ active: activeTab === 'officialNotice' }"
            >
              官方通知
            </button>
            <button
              @click="activeTab = 'dynamic'"
              :class="{ active: activeTab === 'dynamic' }"
            >
              动态
            </button> -->
          </div>
          <el-form ref="form2" :model="form2" label-width="80px">
            <component :is="activeTabComponent"></component>
          </el-form>
        </div>

<!-- -------------------------------------------------------------------------------------- -->
        <i
          class="fa-solid fa-person fa-fade fa-xl"
          style="color: #bdc4d0"
          @click="loadPersonal"
        ></i>

        
        <div class="form3Vision">
          <div class="tabs">
<!--             <button
              @click="activeTab = 'officialNotice'"
              :class="{ active: activeTab === 'officialNotice' }"
            >
              官方通知
            </button>
            <button
              @click="activeTab = 'dynamic'"
              :class="{ active: activeTab === 'dynamic' }"
            >
              动态
            </button> -->
          </div>
          <el-form ref="form3" :model="form3" label-width="80px">
            <component :is="activeTabComponent"></component>
          </el-form>
        </div>

<!-- -------------------------------------------------------------------------------------- -->
      </div>
    </div>
  </div>
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

import OfficialNotice from "./OfficialNotice.vue";
import Dynamic from "./Dynamic.vue";

const router = useRouter();

const goHome = () => router.push("/home");
const handleProfile = () => router.push("/profile");
const handleSettings = () => router.push("/settings");

/* // 当前激活的选项卡
const activeTab = ref("officialNotice");

// 动态组件的映射
const components = {
  officialNotice: OfficialNotice,
  dynamic: Dynamic,
};

// 根据当前激活的选项卡选择组件
const activeTabComponent = computed(() => components[activeTab.value]); */

const form1 = ref({});
const form2 = ref({});
const form3 = ref({});
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
  position: relative;
  align-items: center;
  display: flex; /* 使用 Flexbox 布局 */
  /*   gap: 20px; /* 控制图标和按钮之间的间距 */
  padding: 10px 0; /* 添加一定的内边距，防止被挤压 */
}

.gradient-button {
  background: linear-gradient(
    90deg,
    rgb(255, 137, 0) 0%,
    rgb(242, 45, 16) 100%
  );
  color: #fff; /* 设置文本颜色 */
  border: none; /* 移除按钮边框 */
  size: large;
  border-radius: 20px;
}

.icon-container i {
  margin-left: 30px; /* 调整图标之间的间距 */
  cursor: pointer;
}

.form2Vision,.form1Vision,.form3Vision{
  width: 400px;
  height: 600px;
  display: none; /* 默认隐藏 */
  background-color: #222336;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 创建一个柔和的阴影效果，使元素从页面中浮起来，增强视觉层次感 */
  position: absolute;
  top: 120%; /* 将元素的顶部边缘定位在其包含块的顶部边缘以下 120% 的位置 */
  left: 50%; /* 将元素的左边缘定位在其包含块的左边缘的 50% 位置 */
  transform: translateX(-100%); /* 将元素在水平方向上移动其自身宽度的 50% */
  z-index: 10; /* 设置元素的堆叠顺序，值越大，元素越位于其他元素之上 */
}

.tabs {
  margin-bottom: 10px;
}

.tabs button {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;
  margin-right: 10px;
}

.tabs button.active {
  background: #ddd;
  font-weight: bold;
}

.fa-solid.fa-message.fa-fade.fa-xl:hover + .form1Vision {
  display: block; /* 鼠标悬浮时显示 */
}
.fa-solid.fa-gear.fa-fade.fa-xl:hover + .form2Vision {
  display: block; /* 鼠标悬浮时显示 */
}
.fa-solid.fa-solid.fa-fade.fa-xl:hover + .form3Vision {
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
