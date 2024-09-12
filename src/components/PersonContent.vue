<template>
  <!-- 用户信息卡片，包含头像和用户名 -->
  <div class="tabs1">
    <img :src="avatarSrc" alt="QR Code" class="image-class" />
    <div class="content-class">
      <span class="username"
        >{{ username }}
        <i class="fa-regular fa-pen-to-square edit-icon" @click="edit"></i>
      </span>
      <span class="comment"
        >This person has a lot of personality and leaves nothing behind</span
      >
    </div>
  </div>

  <!-- 积分和赞助选项 -->
  <div class="tabs2">
    <i class="fa-solid fa-coins">
      <span class="small-text">Integral : {{ credits }}</span>
    </i>
    <div>
      <span class="text2" @click="GoToPay">Go sponsor </span>
      <ii class="fa-solid fa-chevron-right" @click="GoToPay"></ii>
    </div>
  </div>

  <!-- 空白部分，占位作用 -->
  <div class="tabs3"></div>

  <!-- 设置与功能选项，包含个性化设置、Q&A、反馈等 -->
  <div class="tabs4">
    <div class="tab4-item">
      <i class="fa-solid fa-gear" @click="GoToPersonalization"></i>
      <span @click="GoToPersonalization">Personalization </span>
    </div>
    <div class="tab4-item">
      <i class="fa-solid fa-list-check" @click="GoToAnswer"></i>
      <span @click="GoToAnswer">Q&A</span>
    </div>
    <div class="tab4-item">
      <i class="fa-solid fa-comment" @click="GotoFeedback"></i>
      <span @click="GotoFeedback">Feedback</span>
    </div>
  </div>

  <!-- 签出与注销账户按钮 -->
  <div class="tabs5">
    <el-button round class="tabs5-button" @click="Return"
      ><i class="fa-solid fa-right-from-bracket" style="margin-right: 5px"></i
      >Sign out</el-button
    >
    <el-button round class="tabs5-button" @click="GotoDelete"
      ><i class="fa-solid fa-trash" style="margin-right: 5px"></i>Cancel your
      account</el-button
    >
  </div>

  <!-- 表单组件，用于显示当前选中的子组件 -->
  <el-form ref="form3" :model="form3" label-width="80px">
    <component :is="activeTabComponent"></component>
  </el-form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import image from "../assets/avatar/lst.jpg";
const images = ref([image]);
import { getUsername } from "../utils/Auth";

const credits = ref(32);
const router = useRouter();
const username = getUsername();

const avatarSrc = ref("../assets/avatar/lst.jpg"); // 默认头像路径

onMounted(() => {
  // 从 localStorage 或其他来源获取已保存的头像路径
  const storedAvatar = localStorage.getItem(`avatar_${username}`);
  if (storedAvatar) {
    avatarSrc.value = storedAvatar;
  }
});

// 关闭父表单
import { defineEmits } from "vue";
// 定义 emit 事件
const emit = defineEmits(
  ["toggleForm"],
  ["feedBack"],
  ["pay"],
  ["delete"],
  ["answer"],
  ["personalization"]
);

// 触发编辑事件，显示编辑表单
const edit = () => {
  emit("toggleForm"); // 触发表单显示切换事件
};

// 跳转到 Q&A 界面
const GoToAnswer = () => {
  emit("answer");
};

// 跳转到反馈界面
const GotoFeedback = () => {
  emit("feedBack");
};

// 跳转到赞助界面
const GoToPay = () => {
  emit("pay");
};

// 跳转到个性化设置界面
const GoToPersonalization = () => {
  emit("personalization");
};

// 返回登录界面
const Return = () => {
  router.push("/");
};

// 触发注销账户的操作
const GotoDelete = () => {
  emit("delete");
};
</script>

<style scoped>
/* 用户信息区域样式 */
.tabs1 {
  height: 80px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: transparent;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.image-class {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.content-class {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  color: #d1cbcb;
}

.username {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 20px;
}

.username i {
  margin-right: 20px;
  font-size: 20px;
  margin-left: 20px;
  display: -ms-inline-flexbox;
  color: #ffffffd0;
}

.username i:hover {
  color: #3e3e5f;
}

.comment {
  color: #a5a5a5;
  font-size: 14px;
}

.edit-icon {
  margin-left: auto;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.edit-icon:hover {
  color: #ffffff;
}

/* 积分和赞助选项样式 */
.tabs2 {
  height: 10%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.text2 {
  margin-right: 3px;
  color: #fff;
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
  transform: translateY(10%);
}

/* 空白部分，占位作用 */
.tabs3 {
  height: 20%;
  margin-bottom: 10px;
  display: flex;
}

/* 设置与功能选项区域样式 */
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
  color: #ffffffd0;
}

.tab4-item i {
  font-size: 25px;
  margin-bottom: 5px; /* 图标和文字之间的间距 */
  display: -ms-inline-flexbox;
  color: #ffffffd0;
}

.tab4-item i:hover {
  color: #3e3e5f;
}

.tab4-item span {
  font-size: 15px; /* 根据需要调整文字大小 */
}

/* 签出与注销账户按钮区域样式 */
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

/* 积分文字样式 */
.small-text {
  font-size: 12px; /* 调整为你需要的文字大小 */
  vertical-align: middle; /* 使文字与图标垂直对齐 */
  margin-left: 10px;
  color: #fff;
}
</style>
