<template>
  <div class="chat-system">
    <headbar></headbar>

    <div class="non-header">
      <sidebar></sidebar>

      <div class="main-content">
        <div class="chat">
          <div class="chat-container">
            <div class="chat-window">
              <div
                class="message"
                v-for="(message, index) in messages"
                :key="index"
              >
                <div class="user-message" v-if="message.type === 'user'">
                  {{ message.text }}
                </div>
                <div class="system-message" v-else>{{ message.text }}</div>
              </div>
            </div>

            <div class="input-area">
              <input
                type="text"
                v-model="userInput"
                placeholder="请输入对话内容..."
                @keyup.enter="sendMessage"
                class="input-box"
              />
              <button @click="sendMessage" class="send-button">发送</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import sidebar from "../components/Sidebar.vue";
import headbar from "../components/Headbar.vue";

const messages = ref([
  { type: "system", text: "您好！请问有什么可以帮助您的？" },
]);
const userInput = ref("");

const sendMessage = () => {
  if (userInput.value.trim()) {
    messages.value.push({ type: "user", text: userInput.value });
    // 模拟系统回复
    messages.value.push({
      type: "system",
      text: `系统回复：${userInput.value}`,
    });
    userInput.value = ""; // 清空输入框
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  background-color: #001f3f; /* 深海蓝色调 */
  color: #d3d3d3; /* 淡雅灰色调 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat-system {
  display: flex; /* 使用Flexbox布局 */
  height: calc(100vh - 10px); /* 视口高度减去外边距总和，调整为适合的高度 */
  margin: 5px;
  border-radius: 5px; /* 设置圆角 */
  overflow: hidden; /* 确保圆角不会因内容溢出而被破坏 */
  box-sizing: border-box; /* 包含外边距计算 */
  flex-direction: column;
}

.non-header {
  display: flex;
  height: calc(100% - 60px);
  flex-direction: row;
}
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  flex: 1;
  overflow-y: auto; /* 如果内容超出高度，允许在该区域滚动 */
  background-color: #0e0d27;
  box-sizing: border-box; /* 包含 padding 在内计算总高度 */
  height: calc(100%);
}

.chat {
  display: flex;
  justify-content: center; /* 水平方向居中 */
  align-items: center; /* 垂直方向居中 */
  width: 100%;
  height: 100vh; /* 使父容器高度覆盖整个视口 */
}

.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  height: 60vh;
  background-color: #002b55; /* 深蓝色调 */
  border-radius: 10px;
  padding: 20px;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  margin: 10px 0;
}

.user-message {
  background-color: #39d353; /* 草绿色调 */
  padding: 10px;
  border-radius: 8px;
  text-align: right;
  color: #fff;
  max-width: 70%;
  margin-left: auto;
}

.system-message {
  background-color: #d3d3d3; /* 灰色调 */
  padding: 10px;
  border-radius: 8px;
  text-align: left;
  color: #333;
  max-width: 70%;
  margin-right: auto;
}

.input-area {
  display: flex;
  align-items: center;
}

.input-box {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  margin-right: 10px;
}

.send-button {
  padding: 10px 20px;
  background-color: #39d353; /* 草绿色调 */
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: #33b045; /* 鼠标悬停时草绿色加深 */
}
</style>
