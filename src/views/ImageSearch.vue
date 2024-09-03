<template>
  <starfield />

  <div class="imageToText-system">
    <headbar></headbar>

    <div class="non-header">
      <sidebar></sidebar>

      <div class="main-content">
        <div class="up-down">
          <div v-if="!uiChange" :key="1">
            <div class="recommendations">
              <div class="headbar">
 <!--                <div class="text">你可以这样向我提问</div> -->
                <div class="icon" @click="changeSelection">
                  <div>换一批</div>
                  <i class="fa-solid fa-rotate"></i>
                </div>
              </div>
              <div class="image-list">
                <img
                  :src="images[0 + 2 * questionSelection]"
                  alt="Gallery Image"
                  class="image-class"
                />
                <img
                  :src="images[1 + 2 * questionSelection]"
                  alt="Gallery Image"
                  class="image-class"
                />
              </div>
            </div>
          </div>
          <div v-if="messages.length" class="chat-history" ref="chatHistory">
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="message"
            >
              <div class="message-header">
                <span class="message-time">{{ message.time }}</span>
              </div>
              <div class="message-content">
                <p>{{ message.text }}</p>
                <!-- 图片渲染逻辑 -->
                <img
                  v-if="message.imageUrl"
                  :src="message.imageUrl"
                  alt="生成的图像"
                  class="generated-image"
                />
              </div>
              <div v-if="message.isResponse" class="response">
                <p>{{ responseText }}</p>
                <button @click="retryResponse(index)">重新回答</button>
                <button @click="copyResponse(index)">复制</button>
              </div>
            </div>
          </div>

          <div class="input-area">
            <input
              type="file"
              accept="image/*"
              @change="onFileChange"
              ref="fileInput"
            />
            <button @click="sendImage">上传图片</button>
          </div>
        </div>

        <div class="history-section">
          <h4>历史记录</h4>
          <ul class="history-list">
            <li v-for="(item, index) in history" :key="index">
              <span>你好</span>
              <button @click="removeHistory(index)">✖</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import Starfield from "../components/Starfield.vue";
import sidebar from "../components/Sidebar.vue";
import headbar from "../components/Headbar.vue";
import { getUsername } from "../utils/Auth";

import img1 from "../assets/image_example/1.jpg";
import img2 from "../assets/image_example/2.jpg";
import img3 from "../assets/image_example/3.jpg";
import img4 from "../assets/image_example/4.jpg";
import img5 from "../assets/image_example/5.jpg";
import img6 from "../assets/image_example/6.jpg";
import img7 from "../assets/image_example/7.jpg";
import img8 from "../assets/image_example/8.jpg";
import img9 from "../assets/image_example/9.jpg";
import img10 from "../assets/image_example/10.jpg";
import img11 from "../assets/image_example/11.jpg";
import img12 from "../assets/image_example/12.jpg";

const router = useRouter();

const history = ref(["你好", "你好", "你好", "你好"]); // 示例数据
const images = ref([
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
]);

const questionSelection = ref(0);
const uiChange = ref(0);

const changeSelection = () => {
  questionSelection.value++;
  questionSelection.value = questionSelection.value % 5;
};

const removeHistory = (index) => {
  history.value.splice(index, 1);
};

// 示例数据
const messages = ref([]);
const userInput = ref("");
const userInput2 = ref("");

// 模拟回答的文本
const responseText = "这是系统给出的示例回答内容。";

// 绑定 chat-history 的 DOM 元素
const chatHistory = ref(null);

// 监听 messages 数组变化时，触发滚动到底部
watch(messages, async () => {
  await nextTick(); // 等待 DOM 更新完成
  if (chatHistory.value) {
    // 滚动到最底部
    chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
  }
});

// 存储上传的文件
const selectedFile = ref(null);

// 处理文件上传
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

// 处理文件改变事件
const onFileChange = (event) => {
  const files = event.target.files;
  if (files && files[0]) {
    selectedFile.value = files[0]; // 将选择的文件赋值给 selectedFile
  }
};

const token = localStorage.getItem("jwtToken");

const api = {
  search: "http://172.20.10.7:8000/search/text",
};

let url = api.search;


// 发送上传的图像
const sendImage = async () => {
  if (!selectedFile.value) {
    alert("请先选择一张图片！");
    return;
  }

  const formData = new FormData();
  formData.append("username", getUsername()); // 假设 getUsername() 函数返回当前的用户名
  formData.append("file", selectedFile.value); // 添加图像文件到表单数据中

  try {
    console.log("开始发送请求...");

    // 获取 JWT Token，假设 token 存储在 localStorage 中
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      handleError("缺少身份验证令牌，请重新登录。");
      return;
    }

    // 发送请求
    const result = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // 设置 Authorization 头部
      },
      body: formData, // 使用 FormData 发送请求体
    });

    // 检查响应状态码
    if (!result.ok) {
      handleError(`请求失败，状态码：${result.status}`);
      return;
    }

    const response = await result.json(); // 将响应解析为 JSON

    const responseTime = new Date().toLocaleTimeString();

    if (response.code === "0") {
      console.log(response);

      // 检查是否包含 text_list 数据
      if (response.text_list && response.text_list.length > 0) {
        // 遍历 text_list 并将每条文本添加到消息中
        response.text_list.forEach((text) => {
          messages.value.push({
            text, // 显示后端返回的文本
            time: responseTime,
            isResponse: true,
          });
        });
      } else {
        // 当 text_list 为空时显示默认信息
        messages.value.push({
          text: response.message || "这是系统给出的回答。",
          time: responseTime,
          isResponse: true,
        });
      }
    } else {
      handleError("后端返回错误：" + (response.message || "未知错误"));
    }
  } catch (error) {
    handleError("请求失败，请稍后重试");
    console.error("提交失败", error);
  }
};

// 错误处理函数
const handleError = (errorMessage) => {
  const errorTime = new Date().toLocaleTimeString();
  messages.value.push({
    text: errorMessage,
    time: errorTime,
    isResponse: true,
  });
};

// 重新回答功能
const retryResponse = (index) => {
  messages.value[index].text = "系统正在重新回答...";
};

// 复制功能
const copyResponse = (index) => {
  navigator.clipboard.writeText(responseText);
  alert("回答已复制到剪贴板！");
};

onMounted(() => {
  const username = getUsername();

  if (!username) {
    router.push("/");
  }
});
</script>

<style scoped>
.imageToText-system {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10px);
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
}

.non-header {
  display: flex;
  height: calc(100% - 60px);
  flex-direction: row;
}

.main-content {
  display: flex;
  flex-direction: row;
  padding: 0px;
  flex: 1;
  overflow-y: auto;
}

.up-down {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 4;
  margin: 10px;
}

.recommendations {
  position: absolute;
  top: 0;
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.headbar {
  margin: 10px;
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 10%;
  align-items: center;
}

.text {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-left: 15px;
  flex: 5;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  flex: 1;
  gap: 8px;
}

.image-list {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}

.image-class {
  width: 45%;
  border-radius: 15px;
}

.chat-history {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: calc(100% - 80px);
  margin-top: 5px;
  margin-bottom: 10px;
}

.message {
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  max-width: 80%;
  align-self: flex-end;
}

.message-header {
  font-size: 0.8em;
  color: #555;
}

.message-content p {
  margin: 0;
  word-wrap: break-word;
}

.generated-image {
  max-width: 100%;
  margin-top: 10px;
  border-radius: 5px;
}

.response {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-area {
  display: flex;
  flex-direction: row;
  gap: 10px;
  z-index: 1000;
}

.history-section {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
  border-left: 1px solid #ccc;
}

.history-list {
  list-style: none;
  padding: 0;
}

.history-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.history-list button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}
</style>
