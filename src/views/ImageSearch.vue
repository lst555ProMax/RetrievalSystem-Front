<!-- 目前用户上传图片之后消息处显示的是文字 -->
<template>
  <starfield />
  <dashboard>
    <template #left-content>
      <div class="imageToText-system">
        <div class="main-content">
          <div class="up-down">
            <div v-if="!uiChange" :key="1">
              <div class="recommendations">
                <div class="headbar">
                  <div class="text">You can ask me like this</div>
                  <div class="icon" @click="changeSelection">
                    <div>Switch to another</div>
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
                  <img
                    v-if="!message.isResponse"
                    :src="message.imageUrl"
                    alt="Uploaded Image"
                    class="uploaded-image"
                  />
                  <div v-if="isLoading" class="loading-icon">
                    <i class="fa-solid fa-spinner fa-spin"></i>
                  </div>
                </div>

                <div
                  v-if="message.isResponse && !message.fromHistory"
                  class="response"
                >
                  <button v-if="!isLoading" @click="retryResponse(index)">
                    Retry
                  </button>
                  <button v-if="!isLoading" @click="copyResponse(index)">
                    Get
                  </button>
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
              <button @click="sendImage">➤</button>
            </div>
          </div>

          <div class="history-section">
            <h4>History Records</h4>
            <ul class="history-list">
              <li
                v-for="(item, index) in history"
                :key="item.id"
                @click="fetchHistory(item.id)"
              >
                <img
                  :src="item.imageUrl"
                  alt="History images"
                  class="thumbnail"
                />
                <span>{{ item.text }}</span>
                <button @click.stop="removeHistory(index)">✖</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </dashboard>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import Starfield from "../components/Starfield.vue";
import { getUsername } from "../utils/Auth";
import dashboard from "../components/Dashboard.vue";
import { API_ENDPOINTS } from "../config/apiConfig";

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

const history = ref([]);
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
const messages = ref([]);
const userInput = ref("");
const isLoading = ref(false);
const chatHistory = ref(null);

const changeSelection = () => {
  questionSelection.value++;
  questionSelection.value = questionSelection.value % 6;
};

const removeHistory = (index) => {
  history.value.splice(index, 1);
};

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

// 处理文件改变事件
const onFileChange = (event) => {
  const files = event.target.files;
  if (files && files[0]) {
    const file = files[0];
    if (file.type.startsWith("image/")) {
      selectedFile.value = file; // 确保是图片文件
    } else {
      alert("Please choose an image file！");
      selectedFile.value = null;
    }
  }
};

const token = localStorage.getItem("jwtToken");

const api = {
  image: API_ENDPOINTS.image,
  fetchHistory: API_ENDPOINTS.list,
};

let url = api.image;

// 上传显示的图片
// 上传显示的图片
const uploadImageFromList = async (index) => {
  try {
    // 获取选中的图片并转化为 blob 对象
    const response = await fetch(images.value[index]);
    const blob = await response.blob();

    // 创建新的 File 对象
    selectedFile.value = new File([blob], `image_${index}.jpg`, { type: blob.type });
    console.log("Selected file:", selectedFile.value);

    if (!selectedFile.value) {
      alert("Please choose an image file！");
      return;
    }

    // 获取当前时间
    const currentTime = new Date().toLocaleTimeString();

    // 创建图片 URL
    const imageUrl = URL.createObjectURL(selectedFile.value);
    console.log("Image URL:", imageUrl);

    // 清空消息并设置加载状态
    uiChange.value = 1;
    messages.value = [];
    isLoading.value = true;

    // 将上传的图片加入消息
    messages.value.push({
      text: "The user has uploaded an image.",
      time: currentTime,
      isResponse: false,
      imageUrl,
      loading: true,
    });

    // 打印消息对象中的图片 URL，检查是否存储正确
    console.log("Messages:", messages.value);

    const formData = new FormData();
    formData.append("username", getUsername());
    formData.append("image_file", selectedFile.value);

    const token = localStorage.getItem("jwtToken");

    // 检查是否存在 token
    if (!token) {
      handleError("Request failed. Please try again later.");
      isLoading.value = false;
      return;
    }

    const responseAPI = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    // 检查请求是否成功
    if (!responseAPI.ok) {
      handleError(`Request failed, status code：${responseAPI.status}`);
      isLoading.value = false;
      return;
    }

    const result = await responseAPI.json();
    const responseTime = new Date().toLocaleTimeString();

    // 添加系统响应消息
    messages.value.push({
      text: result.text_list
        ? result.text_list.map((text) => text.content).join("\n")
        : "This is the response provided by the system",
      time: responseTime,
      isResponse: true,
    });

    // 添加历史记录项
    history.value.push({
      id: result.search_history_id,
      text: `Uploaded on ${currentTime}`,
      imageUrl,
    });

  } catch (error) {
    handleError("Request failed, please try again later");
    console.error("Submission failed", error);
  } finally {
    // 请求完成，显示按钮
    isLoading.value = false;
  }
};


const sendImage = async (isRetry = false, index = -1) => {
  if (!selectedFile.value) {
    alert("Please choose an image file！");
    return;
  }
  console.log(selectedFile.value);
  let currentTime = new Date().toLocaleTimeString();

  uiChange.value = 1;
  messages.value = [];

  // 创建图片 URL
  const imageUrl = URL.createObjectURL(selectedFile.value);
  console.log(imageUrl);

  // 设置加载状态
  isLoading.value = true;

  // 添加用户上传图片的消息
  messages.value.push({
    text: "The user has uploaded an image.",
    time: currentTime,
    isResponse: false,
    imageUrl,
    loading: true,
  });

  userInput.value = "";

  const formData = new FormData();
  formData.append("username", getUsername());
  formData.append("image_file", selectedFile.value);

  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      handleError("Request failed. Please try again later.");
      isLoading.value = false;
      return;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      handleError(`Request failed, status code：${response.status}`);
      isLoading.value = false;
      return;
    }

    const result = await response.json();
    const responseTime = new Date().toLocaleTimeString();

    messages.value.push({
      text: result.text_list
        ? result.text_list.map((text) => text.content).join("\n")
        : "This is the response provided by the system",
      time: responseTime,
      isResponse: true,
      loading: false,
    });

          // Update user message loading state
          if (messages.value[0]) {
        messages.value[0].loading = false;
      }

    // 添加历史记录项，包括获取到的 ID 和文本
    history.value.push({
      id: result.search_history_id, // 替换为实际ID
      text: `Uploaded on ${currentTime}`, // 可根据需求修改
      imageUrl, // 存储图像 URL
    });
  } catch (error) {
    handleError("Request failed, please try again later");
    console.error("Submission failed", error);
  } finally {
    // 请求完成，显示按钮
    isLoading.value = false;
  }
};

//获取历史记录
const fetchHistory = async (id) => {
  const formData = new FormData();
  formData.append("search_history_id", id);

  try {
    const response = await fetch(api.fetchHistory, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    messages.value = [];

    if (result.code === 0) {
      const imageUrl = URL.createObjectURL(selectedFile.value);

      messages.value.push({
        imageUrl, // 使用从历史记录中获取的 URL
        time: result.data.date,
        isResponse: false,
        fromHistory: true, // 标识为历史记录来源
      });

      // 检查 search_text 是否为字符串
      const searchText = result.data.search_text;

      // 使用正则表达式提取所有 'Content' 部分的内容
      const contentMatches = searchText.match(/Content:\s*([^,]+)/g);

      // 提取并格式化内容为字符串，中间用换行符隔开
      const responseText = contentMatches
        ? contentMatches
            .map((match) => match.replace("Content: ", "").trim())
            .join("\n")
        : "This is the response provided by the system."; // 如果没有匹配项，显示默认信息

      messages.value.push({
        time: result.data.date,
        isResponse: true,
        text: responseText,
        fromHistory: true, // 标识为历史记录来源
      });
    } else {
      handleError(
        "Failed to retrieve history records" +
          (result.message || "Unknown error")
      );
    }
  } catch (error) {
    handleError("Request failed, please try again later");
    console.error("Failed to retrieve history records", error);
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
const retryResponse = async (index) => {
  try {
    await sendImage(true, index);
  } catch (error) {
    console.log(error);
    messages.value[index].text = "Request failed, please try again later.";
  }
};

// 复制功能
const copyResponse = (index) => {
  const textToCopy = messages.value[index].text;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("The response has been copied to the clipboard.");
    })
    .catch(() => {
      alert("Copy failed, please try again.");
    });
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
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
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
  margin: 20px 10px;
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  min-height: 60px;
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
  background: rgba(173, 216, 230, 0.05);
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
  white-space: pre-wrap;
  font-family: "Consolas", monospace;
  gap: 0px;
  line-height: 1.8;
}

.message-content p {
  margin: 5px 0px;
}

.uploaded-image {
  height: 150px;
  width: 150px;
}

.response {
  margin-top: 10px;
  display: flex;
  gap: 5px;
  height: 30px;
}

.response button {
  background-color: #2e3140;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  width: 75px;
  margin-right: 5px;
}

.input-area {
  position: absolute; /* 绝对定位 */
  bottom: 0; /* 固定在底部 */
  display: flex;
  align-items: center;
  background: transparent;
  /*   border-top: 1px solid #e0dde7bb; */
  width: 100%;
  height: 10%;
}

.input-area input {
  flex: 30;
  padding: 10px;
  border: none;
  border-radius: 5px;
  /*   margin-left: 10px; */
  margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #d3d3d3;
  height: 50px;
  font-family: "Consolas", monospace;
  font-size: 15px;
}

.input-area button {
  flex: 1;
  padding: 10px;
  background-color: rgba(0, 123, 255, 0.1);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 50px;
}

.history-section {
  flex: 1;
  background-color: rgba(128, 128, 128, 0.05);
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
  background-color: rgba(60, 63, 87, 0.65);
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

.thumbnail {
  width: 50px; /* 调整缩略图的宽度 */
  height: 50px; /* 调整缩略图的高度 */
  object-fit: cover; /* 保持图像比例裁剪 */
  margin-right: 8px; /* 调整与文字的间距 */
  border-radius: 4px; /* 圆角效果，可选 */
}

.hidden {
  display: none;
}
</style>
