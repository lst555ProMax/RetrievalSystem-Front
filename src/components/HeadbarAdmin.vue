<template>
     <div class="header-bar">
    <div class="header-content">
      <h1>
        <i class="fa-solid fa-dragon fa-bounce"></i>
        <span>Turing AI 创作平台</span>
      </h1>

      <div class="icon-container"></div>
      <div
          class="trigger-container1"
          @mouseover="showForm('form1Vision')"
          @mouseleave="startHideTimer('form1Vision')"
        >
          <i
            class="fa-solid fa-gear fa-fade fa-xl"
            style="color: #bdc4d0"
            @click="loadMessage"
          ></i>
          <div class="form1Vision">
            <settingsAdmin></settingsAdmin>
          </div>
        </div>
        
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import settingsAdmin from "./SettingsAdmin.vue";

const router = useRouter();


const hideTimers = ref({});
const showForm = (formName) => {
  clearTimeout(hideTimers.value[formName]);
  if (formName === "form1Vision") {
    document.querySelector(".form1Vision").style.display = "block";
  }
  if (formName === "form2Vision") {
    document.querySelector(".form2Vision").style.display = "block";
  } else if (formName === "form3Vision") {
    document.querySelector(".form3Vision").style.display = "block";
  }
};

const hideForm = (formName) => {
  hideTimers.value[formName] = setTimeout(() => {
    if (formName === "form1Vision") {
      document.querySelector(".form1Vision").style.display = "none";
    }
    if (formName === "form2Vision") {
      document.querySelector(".form2Vision").style.display = "none";
    }
    if (formName === "form3Vision") {
      document.querySelector(".form3Vision").style.display = "none";
    }
  }, 100);
};

const clearHideTimer = (formName) => {
  clearTimeout(hideTimers.value[formName]);
};

const startHideTimer = (formName) => {
  hideTimers.value[formName] = setTimeout(() => {
    if (formName === "form1Vision") {
      document.querySelector(".form1Vision").style.display = "none";
    }
    if (formName === "form2Vision") {
      document.querySelector(".form2Vision").style.display = "none";
    }
    if (formName === "form3Vision") {
      document.querySelector(".form3Vision").style.display = "none";
    }
  }, 100);
};
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
}
.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.header-content h1 {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-content i {
  font-size: 24px;
  color: #901bf5;
}

.header-content span {
  font-size: 16px;
  color: #fff;
  font-weight: normal;
}
.icon-container {
  position: relative;
  align-items: center;
  display: flex;
  padding: 10px 0;
}

.icon-container i {
  margin-left: 30px;
  cursor: pointer;
}

.trigger-container1 {
  position: relative;
  display: inline-block;
}

.form1Vision {
  width: 400px;
  height: 400px;
  display: none;
  background-color: #1a1c2d;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 创建一个柔和的阴影效果，使元素从页面中浮起来，增强视觉层次感 */
  position: absolute;
  top: 200%; /* 将元素的顶部边缘定位在其包含块的顶部边缘以下 200% 的位置 */
  left: 50%; /* 将元素的左边缘定位在其包含块的左边缘的 50% 位置 */
  transform: translateX(-100%); /* 将元素在水平方向上移动其自身宽度的 50% */
  z-index: 10; /* 设置元素的堆叠顺序，值越大，元素越位于其他元素之上 */
}

</style>