<template>
  <div class="header-bar">
    <div class="header-content">
      <h1>
        <i class="fa-solid fa-dragon fa-bounce"></i>
        <span>Turing AI 创作平台</span>
      </h1>

      <div class="icon-container">
        <el-button class="gradient-button" @click="GoToPay">充值</el-button>

        <!-- -------------------------------------------------------------------------------------- -->
        <div
          class="trigger-container1"
          @mouseover="showForm('form1Vision')"
          @mouseleave="startHideTimer('form1Vision')"
        >
          <i
            class="fa-solid fa-message fa-fade fa-xl"
            style="color: #bdc4d0"
            @click="loadSettings"
          ></i>

          <div class="form1Vision">
            <Message></Message>
          </div>
        </div>
        <!-- -------------------------------------------------------------------------------------- -->
        <div
          class="trigger-container2"
          @mouseover="showForm('form2Vision')"
          @mouseleave="startHideTimer('form2Vision')"
        >
          <i
            class="fa-solid fa-gear fa-fade fa-xl"
            style="color: #bdc4d0"
            @click="loadMessage"
          ></i>
          <div class="form2Vision">
            <Settings></Settings>
          </div>
        </div>

        <!-- -------------------------------------------------------------------------------------- -->
        <div
          class="trigger-container3"
          @mouseover="showForm('form3Vision')"
          @mouseleave="startHideTimer('form3Vision')"
        >
          <i
            class="fa-solid fa-person fa-fade fa-xl"
            style="color: #bdc4d0"
            @click="loadPersonal"
          ></i>
          <div class="form3Vision">
            <PersonContent
              :isVisible="isFormVisible"
              @hide="hideForm"
              @toggleForm="handleToggleForm"
              @feedBack="handleFeedBack"
              @moneyHistory="handleMoneyHistory"
              @creditsHistory="handleCreditsHistory"
              @pay="handlePay"
              @delete="handleDelete"
            ></PersonContent>
          </div>
        </div>

        <!-- -------------------------------------------------------------------------------------- -->
      </div>
    </div>
  </div>
  <Edit :isVisible="isEditVisible" @update:isVisible="isEditVisible = $event" />
  <FeedBack
    :isVisible="isFeedBackVisible"
    @update:isVisible="isFeedBackVisible = $event"
  />
  <MoneyHistory
    :isVisible="isMoneyHistoryVisible"
    :currentTab="currentTab"
    @update:isVisible="isMoneyHistoryVisible = $event"
  />
  <Pay
    :isVisible="isPayVisible"
    @update:isVisible="isPayVisible = $event"
  ></Pay>
  <Delete
  :isVisible="isDeleteVisible"
  @update:isVisible="isDeleteVisible = $event"
  ></Delete>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import PersonContent from "./PersonContent.vue";
import Edit from "../components/Edit.vue";
import FeedBack from "../components/FeedBack.vue";
import MoneyHistory from "../components/MoneyHistory.vue";
import Pay from "../components/Pay.vue";
import Settings from "../components/Settings.vue";
import Message from "../components/Message.vue"
import Delete from "../components/Delete.vue"

import { defineEmits } from "vue";

const router = useRouter();
const goHome = () => router.push("/home");
const handleProfile = () => router.push("/profile");
const handleSettings = () => router.push("/settings");

const form1 = ref({});
const form2 = ref({});
const form3 = ref({});

const isFormVisible = ref(false);
const isEditVisible = ref(false);
const isFeedBackVisible = ref(false);
const isMoneyHistoryVisible = ref(false);
const currentTab = ref("score");
const isPayVisible = ref(false);
const isDeleteVisible =ref(false);

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

const GoToPay=()=>{
  isPayVisible.value=true;
}

const handleToggleForm = () => {
  // 关闭 form3Vision
  document.querySelector(".form3Vision").style.display = "none";
  // 显示 Edit 组件
  isEditVisible.value = true;
};

const handleFeedBack = () => {
  // 关闭 form3Vision
  document.querySelector(".form3Vision").style.display = "none";
  // 显示 Edit 组件
  isFeedBackVisible.value = true;
};

const handleMoneyHistory = () => {
  // 关闭 form3Vision
  document.querySelector(".form3Vision").style.display = "none";
  // 显示 Edit 组件
  isMoneyHistoryVisible.value = true;
  currentTab.value = "score";
};

const handleCreditsHistory = () => {
  // 关闭 form3Vision
  document.querySelector(".form3Vision").style.display = "none";
  // 显示 Edit 组件
  isMoneyHistoryVisible.value = true;
  currentTab.value = "recharge";
};

const handlePay = () => {
  // 关闭 form3Vision
  document.querySelector(".form3Vision").style.display = "none";
  isPayVisible.value = true;
};

const handleDelete =()=>{
  document.querySelector(".form3Vision").style.display = "none";
  isDeleteVisible.value = true;
}
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

.gradient-button {
  background: linear-gradient(
    90deg,
    rgb(255, 137, 0) 0%,
    rgb(242, 45, 16) 100%
  );
  color: #fff;
  border: none;
  size: large;
  border-radius: 20px;
}

.icon-container i {
  margin-left: 30px;
  cursor: pointer;
}

/* --------------------------------------------------------------------------------------------------- */
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

/* --------------------------------------------------------------------------------------------------- */

.trigger-container2 {
  position: relative;
  display: inline-block;
}

.form2Vision {
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

/* --------------------------------------------------------------------------------------------------- */
.trigger-container3 {
  position: relative;
  display: inline-block;
}

.form3Vision {
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
