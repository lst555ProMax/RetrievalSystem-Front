<template>
  <!-- -------------------------------------------------------------------------------------- -->
  <div class="tabs1">
    <i class="fa-solid fa-dragon fa-bounce"></i>
    <div>
      <i class="fa-regular fa-pen-to-square" @click="edit"></i>
    </div>
  </div>
  <!-- -------------------------------------------------------------------------------------- -->
  <div class="tabs2">
    <i class="fa-solid fa-coins" >
      <span class="small-text">积分 : {{ credits }}</span>
    </i>
    <div>
      <span class="text2" @click="GoToPay">去充值 </span>
      <ii class="fa-solid fa-chevron-right" @click="GoToPay"></ii>
    </div>
  </div>
  <!-- -------------------------------------------------------------------------------------- -->
  <div class="tabs3"></div>
  <!-- -------------------------------------------------------------------------------------- -->
  <div class="tabs4">
    <div class="tab4-item">
      <i class="fa-solid fa-gear" ></i>
      <span >个性化设置</span>
    </div>
    <div class="tab4-item">
      <i class="fa-solid fa-list-check" @click="GoToAnswer"></i>
      <span @click="GoToAnswer">问题解答</span>
    </div>
    <div class="tab4-item">
      <i class="fa-solid fa-comment" @click="GotoFeedback"></i>
      <span @click="GotoFeedback">意见反馈</span>
    </div>
  </div>
  <!-- -------------------------------------------------------------------------------------- -->
  <div class="tabs5">
    <el-button round class="tabs5-button" @click="Return"
      ><i class="fa-solid fa-right-from-bracket" style="margin-right: 5px"></i
      >退出登录</el-button
    >
    <el-button round class="tabs5-button" @click="GotoDelete"
      ><i class="fa-solid fa-trash" style="margin-right: 5px"></i
      >注销账号</el-button
    >
  </div>
  <!-- -------------------------------------------------------------------------------------- -->

  <el-form ref="form3" :model="form3" label-width="80px">
    <component :is="activeTabComponent"></component>
  </el-form>
</template>

<script setup>
import { ref, } from "vue";
import { useRouter } from "vue-router";

const credits = ref(32);
const router = useRouter();

/* 关闭父表单 */
import { defineEmits } from "vue";
// 定义事件
const emit = defineEmits(
  ["toggleForm"],
  ["feedBack"],
  ["pay"],
  ["delete"],
  ["answer"]
);

const edit = () => {
  emit("toggleForm"); // 触发关闭事件
};


const GoToAnswer=()=>{
  emit("answer");
}

const GotoFeedback = () => {
  emit("feedBack");
};

const GoToPay = () => {
  emit("pay");
};

const Return = () => {
  router.push("/");
};

const GotoDelete =()=>{
  emit("delete");
}
</script>

<style scoped>
/* --------------------------------------------------------------------------------------------------- */
.tabs1 {
  height: 20%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  /*border-bottom: 2px solid #007bff; /* 添加下划线 */
}
.tabs1 i {
  margin-right: 20px;
  font-size: 20px;
}

/* --------------------------------------------------------------------------------------------------- */

.tabs2 {
  height: 10%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.text2 {
  margin-right: 3px;
  color:#fff;
}

.tabs2 i {
  margin-right: 20px;
  font-size: 20px;
  color: #fff;
}

.tabs2 ii {
  margin-right: 20px;
  font-size: 13px;
  color: #d1cbcb;
  transform: translatey(10%);
}

/* --------------------------------------------------------------------------------------------------- */
.tabs3 {
  height: 20%;
  margin-bottom: 10px;
  display: flex;
}

/* --------------------------------------------------------------------------------------------------- */
.tabs4 {
  height: 25%;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.tab4-item {
  display: flex;
  flex-direction: column; /* 垂直排列图标和文字 */
  align-items: center; /* 水平居中 */
  text-align: center;
  color:#ffffffd0;
}

.tab4-item i {
  font-size: 25px;
  margin-bottom: 5px; /* 图标和文字之间的间距 */
  display: -ms-inline-flexbox;
  color:#ffffffd0;
}

.tab4-item i:hover {
   color: #3e3e5f;
}


.tab4-item span {
  font-size: 15px; /* 根据需要调整文字大小 */
}

.tabs5 {
  height: 20%;
  margin-bottom: 10px;
  display: flex;
  padding: 10px;
}

.tabs5-button {
  flex-grow: 1; /* 让按钮在 Flex 布局中占满空间 */
  --el-button-bg-color: rgba(30, 30, 63, 0.2); /* 设置按钮背景颜色 */
  --el-button-border-color: #ffffff6b; /* 设置按钮边框颜色 */
}

.tabs5-button:hover {
  --el-button-hover-bg-color: #3e3e5f; /* 悬浮时的背景颜色 */
  --el-button-hover-border-color: #3e3e5f; /* 悬浮时的边框颜色 */
}

/* --------------------------------------------------------------------------------------------------- */

.small-text {
  font-size: 12px; /* 调整为你需要的文字大小 */
  vertical-align: middle; /* 使文字与图标垂直对齐 */
  margin-left: 10px;
  color: #fff;
}
</style>
