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
    <i class="fa-solid fa-coins">
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
      <i class="fa-solid fa-house" @click="GotoUserCenter"></i>
      <span @click="GotoUserCenter">个人主页</span>
    </div>
    <div class="tab4-item">
      <i class="fa-solid fa-list-check"></i>
      <span>任务中心</span>
    </div>
    <div class="tab4-item">
      <i class="fa-solid fa-comment" @click="GotoFeedback"></i>
      <span @click="GotoFeedback">意见反馈</span>
    </div>
    <div class="tab4-item" @click="GotoMoneyHistory">
      <i class="fa-solid fa-money-bill" @click="GotoMoneyHistory"></i>
      <span>充值记录</span>
    </div>
    <div class="tab4-item" @click="GotoCreditsHistory">
      <i class="fa-solid fa-bitcoin-sign" @click="GotoCreditsHistory"></i>
      <span>积分记录</span>
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
import {
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
  onMounted,
  computed,
} from "vue";
import { useRouter, useRoute } from "vue-router";

const credits = ref(32);
const router = useRouter();

/* 关闭父表单 */
import { defineEmits } from "vue";
// 定义事件
const emit = defineEmits(
  ["toggleForm"],
  ["feedBack"],
  ["moneyHistory"],
  ["creditsHistory"],
  ["pay"],
  ["delete"]
);

const edit = () => {
  emit("toggleForm"); // 触发关闭事件
};

const GotoUserCenter = () => router.push("/userCenter");

const GotoFeedback = () => {
  emit("feedBack");
};

const GotoMoneyHistory = () => {
  emit("moneyHistory");
};

const GotoCreditsHistory = () => {
  emit("creditsHistory");
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

const api = {
  delete: "http://172.20.10.7:8000/user/delete",
};

let url = api.delete;

import { useUserStore } from "../stores/userStore"; // 引入 Store

const userStore = useUserStore(); // 使用 Store

// 从 Store 中获取 username
const { username } = userStore;

const form = ref({
  username: username,
  password: "333",
});
const Delete = async () => {
  // 使用 URLSearchParams 来格式化参数，确保后端可以用 request.form 接收
  const urlEncodedParams = new URLSearchParams(form.value);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlEncodedParams.toString(),
  });

  const result = await response.json();
  if (response.ok) {
    console.log("修改成功", result);
    console.log(urlEncodedParams.toString());
  } else {
    console.error("修改失败", result.message);
  }
};
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
}

.tabs2 i {
  margin-right: 20px;
  font-size: 20px;
  color: #fff;
}

.tabs2 ii {
  margin-right: 20px;
  font-size: 13px;
  color: #656060;
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
}

.tab4-item i {
  font-size: 25px;
  margin-bottom: 5px; /* 图标和文字之间的间距 */
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
  --el-button-bg-color: #252738; /* 设置按钮背景颜色 */
  --el-button-border-color: #252738; /* 设置按钮边框颜色 */
}

/* --------------------------------------------------------------------------------------------------- */

.small-text {
  font-size: 12px; /* 调整为你需要的文字大小 */
  vertical-align: middle; /* 使文字与图标垂直对齐 */
  margin-left: 10px;
  color: #fff;
}
</style>
