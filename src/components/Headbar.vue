<template>
  <div class="header-bar">
    <div class="header-content">
      <div class="logo-title">
        <i class="fa-solid fa-dragon fa-bounce"></i>
        <span>Turing AI 创作平台</span>
      </div>


        <div class="search-container">
      <span>AI搜索</span>
      <input type="text" placeholder="AI搜索，只给你有用的结果" class="search-input" v-model="question" />
      <el-button class="search-button" @click="GoToDialogue">搜一搜</el-button>
    </div>

      <div class="icon-container">
        <el-button class="gradient-button" @click="GoToPay">充值</el-button>

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
              @answer="handleAnswer"
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
  <Answer     
    :isVisible="isAnswerVisible"
    @update:isVisible="isAnswerVisible = $event"></Answer>
  <FeedBack
    :isVisible="isFeedBackVisible"
    @update:isVisible="isFeedBackVisible = $event"
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
import Pay from "../components/Pay.vue";
import Settings from "../components/Settings.vue";
import Delete from "../components/Delete.vue"
import Answer from "../components/Answer.vue"

import { defineEmits } from "vue";

const emit = defineEmits(["search"]);

const question=ref();

const router = useRouter();
const goHome = () => router.push("/home");
const handleProfile = () => router.push("/profile");
const handleSettings = () => router.push("/settings");

const form1 = ref({});
const form2 = ref({});
const form3 = ref({});

const isFormVisible = ref(false);
const isEditVisible = ref(false);
const isAnswerVisible=ref(false);
const isFeedBackVisible = ref(false);
const currentTab = ref("score");
const isPayVisible = ref(false);
const isDeleteVisible =ref(false);

const hideTimers = ref({});

const showForm = (formName) => {
  clearTimeout(hideTimers.value[formName]);
  if (formName === "form2Vision") {
    document.querySelector(".form2Vision").style.display = "block";
  } else if (formName === "form3Vision") {
    document.querySelector(".form3Vision").style.display = "block";
  }
};

const hideForm = (formName) => {
  hideTimers.value[formName] = setTimeout(() => {
    if (formName === "form2Vision") {
      document.querySelector(".form2Vision").style.display = "none";
    }
    if (formName === "form3Vision") {
      document.querySelector(".form3Vision").style.display = "none";
    }
  }, 100);
};

const startHideTimer = (formName) => {
  hideTimers.value[formName] = setTimeout(() => {
    if (formName === "form2Vision") {
      document.querySelector(".form2Vision").style.display = "none";
    }
    if (formName === "form3Vision") {
      document.querySelector(".form3Vision").style.display = "none";
    }
  }, 100);
};

const GoToDialogue=()=>{
  router.push("/dialogue");
  emit("search",question.value);

}

const GoToPay=()=>{
  isPayVisible.value=true;
}

const handleToggleForm = () => {
  // 关闭 form3Vision
  document.querySelector(".form3Vision").style.display = "none";
  // 显示 Edit 组件
  isEditVisible.value = true;
};

const handleAnswer =()=>{
    // 关闭 form3Vision
    document.querySelector(".form3Vision").style.display = "none";
   // 显示 Edit 组件
   isAnswerVisible.value = true;
}
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
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.header-content {
  display: flex;
  align-items: center; /* 确保内容垂直居中 */
  width: 100%;
  justify-content: space-between;
}

.logo-title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
}


.header-content i {
  font-size: 24px;
  color: #901bf5;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  padding: 10px 10px;
  height: 200%; /* 使得搜索框达到 header-bar 的高度 */
/*   box-sizing: border-box; /* 确保 padding 不影响总高度 */ 
}

.search-container span{
  text-align: center;
  align-items: center;
  font-style: italic;
  font-weight: bold;
  letter-spacing: 1.4px;
}

.search-input {
  flex: 1;
  border: none;
  padding: 0px 15px;
  border-radius: 20px;
  background-color: #1a1c2c;
  color: #fff;
  outline: none;
  font-size: 14px;
  height: 38px;
  width:350px ;
}

.search-button {
  background-color: #2a76f6;
  border: none;
  color: #fff;
  padding: 5px 15px;
  border-radius: 20px;
  cursor: pointer;
  height: 30px;
}

.search-button:hover {
  background-color: #2365c4;
}

.header-content span {
  font-size: px;
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
