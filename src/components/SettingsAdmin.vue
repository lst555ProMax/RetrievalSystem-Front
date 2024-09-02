<template>
  <div class="settings-container" @click="closeDropdowns">
    <!-- 主题选项 -->
    <div class="tabs1" @click.stop="toggleThemeDropdown">
      <i class="fa-solid fa-face-smile"></i>
      <text>主题</text>
    </div>

    <!-- 字体选项 -->
    <div class="tabs2" @click.stop="toggleFontDropdown">
      <i class="fa-solid fa-font"></i>
      <text>字体</text>
    </div>

    <!-- 背景图片上传 -->
    <div class="tabs3">
      <i class="fa-solid fa-images"></i>
    </div>

    <div class="tabs4">
    <el-button round class="tabs4-button" @click="Return" ><i class="fa-solid fa-right-from-bracket" style="margin-right: 5px;"></i>退出登录</el-button>
</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 主题、字体、上传背景图片相关状态
const themes = ["默认主题", "黑暗模式", "浅色模式", "复古模式"]; // 示例主题
const fonts = ["Arial", "宋体", "微软雅黑", "Times New Roman"]; // 示例字体

const selectedTheme = ref(themes[0]); // 默认主题
const selectedFont = ref(fonts[0]); // 默认字体
const backgroundImage = ref(null); // 上传的背景图片

const showThemeDropdown = ref(false); // 控制主题选择下拉菜单显示
const showFontDropdown = ref(false); // 控制字体选择下拉菜单显示

// 切换主题选择下拉菜单
const toggleThemeDropdown = () => {
  showThemeDropdown.value = !showThemeDropdown.value;
  showFontDropdown.value = false; // 确保字体下拉框关闭
};

// 切换字体选择下拉菜单
const toggleFontDropdown = () => {
  showFontDropdown.value = !showFontDropdown.value;
  showThemeDropdown.value = false; // 确保主题下拉框关闭
};

// 处理背景图片上传
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      backgroundImage.value = e.target.result; // 设置上传的图片预览
    };
    reader.readAsDataURL(file);
  }
};

// 关闭所有下拉框
const closeDropdowns = () => {
  showThemeDropdown.value = false;
  showFontDropdown.value = false;
};

const Return=()=>{router.push("/")};

// 在组件挂载时监听点击事件
onMounted(() => {
  document.addEventListener("click", closeDropdowns);
});
</script>

<style scoped>
/* .settings-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 10px;
} */

.tabs1,
.tabs2,
.tabs3,
.tabs4 {
  margin-bottom: 10px;
  height: 20%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #007bff;
}

.tabs4-button{
  flex-grow: 1; /* 让按钮在 Flex 布局中占满空间 */
    --el-button-bg-color: #252738; /* 设置按钮背景颜色 */
    --el-button-border-color: #252738; /* 设置按钮边框颜色 */
}

.tabs1:hover,
.tabs2:hover,
.tabs3:hover {
  background-color: #e0e0e0;
}

.tabs1 i,
.tabs2 i,
.tabs3 i {
  margin-right: 10px;
  font-size: 20px;
}
</style>
