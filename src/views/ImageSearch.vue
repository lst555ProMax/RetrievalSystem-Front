<!-- 目前用户上传图片之后消息处显示的是文字 -->
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
                <div class="text">你可以这样向我提问</div>
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
                  @click="uploadImageFromList(0 + 2 * questionSelection)"
                />
                <img
                  :src="images[1 + 2 * questionSelection]"
                  alt="Gallery Image"
                  class="image-class"
                  @click="uploadImageFromList(1 + 2 * questionSelection)"
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

// 定义一个映射，以保持图片文件数据
const imageFiles = [
  new File([img1], "1.jpg", { type: "image/jpeg" }),
  new File([img2], "2.jpg", { type: "image/jpeg" }),
  new File([img3], "3.jpg", { type: "image/jpeg" }),
  new File([img4], "4.jpg", { type: "image/jpeg" }),
  new File([img5], "5.jpg", { type: "image/jpeg" }),
  new File([img6], "6.jpg", { type: "image/jpeg" }),
  new File([img7], "7.jpg", { type: "image/jpeg" }),
  new File([img8], "8.jpg", { type: "image/jpeg" }),
  new File([img9], "9.jpg", { type: "image/jpeg" }),
  new File([img10], "10.jpg", { type: "image/jpeg" }),
  new File([img11], "11.jpg", { type: "image/jpeg" }),
  new File([img12], "12.jpg", { type: "image/jpeg" }),
];

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
  questionSelection.value = questionSelection.value % 6;
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

/* // 处理文件改变事件
const onFileChange = (event) => {
  const files = event.target.files;
  if (files && files[0]) {
    selectedFile.value = files[0]; // 将选择的文件赋值给 selectedFile
  }
}; */

// 处理文件改变事件
const onFileChange = (event) => {
  const files = event.target.files;
  if (files && files[0]) {
    const file = files[0];
    if (file.type.startsWith("image/")) {
      selectedFile.value = file; // 确保是图片文件
    } else {
      alert("请选择图片文件！");
      selectedFile.value = null;
    }
  }
};

// 上传显示的图片
const uploadImageFromList = (index) => {
  const currentTime = new Date().toLocaleTimeString();
  uiChange.value = 1;

  // 添加用户点击图片上传的消息
  messages.value.push({
    text: `用户选择了第 ${index + 1} 张图片进行上传。`,
    time: currentTime,
    isResponse: false,
  });

  // 根据 index 设置所选的文件
  selectedFile.value = imageFiles[index];
  sendImage(); // 调用现有的上传逻辑
};

const token = localStorage.getItem("jwtToken");

const api = {
  search: "http://192.168.156.28:8000/search/image",
};

let url = api.search;

const sendImage = async () => {
  if (!selectedFile.value) {
    alert("请先选择一张图片！");
    return;
  }

  uiChange.value = 1;
  const currentTime = new Date().toLocaleTimeString();

  // 添加用户的上传消息到消息列表
  messages.value.push({
    text: "用户上传了一张图片。",
    time: currentTime,
    isResponse: false,
  });

  const formData = new FormData();
  formData.append("username", getUsername());
  formData.append("image_file", selectedFile.value);

  try {
    console.log("开始发送请求...");

    const token = localStorage.getItem("jwtToken");

    if (!token) {
      handleError("缺少身份验证令牌，请重新登录。");
      return;
    }

    const result = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!result.ok) {
      handleError(`请求失败，状态码：${result.status}`);
      return;
    }

    const response = await result.json();
    const responseTime = new Date().toLocaleTimeString();

    if (response.code === 0) {
      console.log(response);

      if (response.text_list && response.text_list.length > 0) {
        response.text_list.forEach((text) => {
          messages.value.push({
            text:text.content,
            time: responseTime,
            isResponse: true,
          });
        });
      } else {
        messages.value.push({
          text: response.text_list || "这是系统给出的回答。",
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* Center the element horizontally */
  font-size: 18px;
  font-weight: bold;
  color: #d3d3d3;
}

.icon {
  display: flex;
  position: absolute;
  right: 27px;
  gap: 5px;
  flex-direction: row;
  align-items: center;
}

.image-list {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 80%;
}

.image-class {
  height: 224px;
  width: 224px;
  border-radius: 15px;
}

.chat-history {
  position: absolute; /* 绝对定位 */
  top: 0; /* 固定在底部 */
  width: 100%;
  height: 85%;
  flex: 1;
  overflow-y: auto;
}

.message {
  background: #2e2e4d;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.message-time {
  color: #ccc;
  font-size: 12px;
}

.message-content {
  color: #fff;
}

.response-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
}

.response {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.response button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.input-area {
  position: absolute; /* 绝对定位 */
  bottom: 0; /* 固定在底部 */
  display: flex;
  align-items: center;
  background-color: #0e0d27;
  border-top: 1px solid #34345f;
  width: 100%;
  height: 15%;
}

.input-area input {
  flex: 10;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  background-color: #1e1e3f;
  color: #d3d3d3;
  height: 50%;
  align-items: center;
  justify-content: center;
}

.input-area button {
  flex: 1;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 48.16px;
}

.history-section {
  flex: 1;
  background-color: #232343;
  padding: 10px;
  border-radius: 5px;
}
.history-section h4 {
  color: #d3d3d3;
  margin-bottom: 10px;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.history-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #34345f;
  padding: 8px;
  border-radius: 4px;
  color: #d3d3d3;
}

.history-list button {
  background: none;
  border: none;
  color: #d3d3d3;
  cursor: pointer;
}

.hidden {
  display: none;
}
</style>
