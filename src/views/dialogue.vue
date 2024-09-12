<template>
  <component :is="currentThemeComponent" />
  <dashboard>
    <template #left-content>
      <div class="chat-system">
        <div class="main-content">
          <div class="up-down">
            <!-- 推荐问题部分 -->
            <div v-if="!uiChange" :key="1">
              <div class="recommendations">
                <div class="headbar">
                  <div class="text">You can ask me like this</div>
                  <div class="icon" @click="changeSelection">
                    <div>Switch to another</div>
                    <i class="fa-solid fa-rotate"></i>
                  </div>
                </div>
                <div class="question-list">
                  <button
                    class="question-button"
                    @click="sendMessageIndex(0 + 6 * questionSelection)"
                  >
                    {{ question[0 + 6 * questionSelection] }}
                  </button>
                  <button
                    class="question-button"
                    @click="sendMessageIndex(1 + 6 * questionSelection)"
                  >
                    {{ question[1 + 6 * questionSelection] }}
                  </button>
                </div>
                <div class="question-list">
                  <button
                    class="question-button"
                    @click="sendMessageIndex(2 + 6 * questionSelection)"
                  >
                    {{ question[2 + 6 * questionSelection] }}
                  </button>
                  <button
                    class="question-button"
                    @click="sendMessageIndex(3 + 6 * questionSelection)"
                  >
                    {{ question[3 + 6 * questionSelection] }}
                  </button>
                </div>
                <div class="question-list">
                  <button
                    class="question-button"
                    @click="sendMessageIndex(4 + 6 * questionSelection)"
                  >
                    {{ question[4 + 6 * questionSelection] }}
                  </button>
                  <button
                    class="question-button"
                    @click="sendMessageIndex(5 + 6 * questionSelection)"
                  >
                    {{ question[5 + 6 * questionSelection] }}
                  </button>
                </div>
              </div>
            </div>

            <!-- 聊天记录部分 -->
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
                  <div v-if="message.loading" class="loading-icon">
                    <i class="fa-solid fa-spinner fa-spin"></i>
                  </div>
                </div>
                <div v-if="message.isResponse" class="response">
                  <button @click="retryResponse(index)">Retry</button>
                  <button @click="copyResponse(index)">Get</button>
                </div>
              </div>
            </div>

            <!-- 输入区域 -->
            <div class="input-area">
              <input
                type="text"
                v-model="userInput"
                placeholder="Please enter text..."
                @keyup.enter="sendMessage"
              />
              <button @click="sendMessage">➤</button>
            </div>
          </div>

          <!-- 历史记录部分 -->
          <div class="history-section">
            <h4>History Records</h4>
            <ul class="history-list">
              <li v-for="(item, index) in history" :key="index">
                <span class="history-text" @click="viewHistory(index)">
                  {{ item.text }}
                </span>
                <button @click="removeHistory(index)">✖</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </dashboard>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Starfield from "../components/Starfield.vue";
import CrossStar from "@/components/CrossStar.vue";
import Neural from "../components/Neural.vue";
import { getUsername } from "@/utils/Auth";
import dashboard from "../components/Dashboard.vue";
import { API_ENDPOINTS } from "../config/apiConfig";

const route = useRoute();
const router = useRouter();

// 定义响应式数据
const history = ref([]);
const question = ref([
  "What is cross-modal learning?",
  "How is the association between images and text established?",
  "How is the performance of cross-modal retrieval systems evaluated?",
  "What is multimodal fusion in image-text retrieval?",
  "What role does deep learning play in cross-modal retrieval?",
  "What are the applications of pre-trained models in cross-modal tasks?",
  "What progress has been made in alignment techniques in cross-modal retrieval?",
  "How to handle noise in cross-modal data?",
  "How can generative models improve cross-modal retrieval?",
  "What is the role of image description generation in cross-modal retrieval?",
  "What is zero-shot learning in cross-modal retrieval?",
  "How to address diversity and modality imbalance issues in cross-modal retrieval?",
  "What are the main challenges in cross-modal learning?",
  "How do multimodal neural networks work in cross-modal retrieval?",
  "How to optimize the efficiency and accuracy of cross-modal retrieval?",
  "How are attention mechanisms applied in cross-modal retrieval?",
  "How does cross-modal retrieval differ from traditional retrieval?",
  "How are generative adversarial networks used in cross-modal learning?",
  "How to handle data sparsity issues in cross-modal retrieval?",
  "How is semantic representation achieved in cross-modal retrieval?",
  "What are the applications of self-supervised learning in cross-modal retrieval?",
  "How to evaluate retrieval relevance in cross-modal retrieval?",
  "What are the latest advancements in cross-modal embedding techniques?",
  "How to perform feature alignment in cross-modal learning?",
  "What is the role of multimodal fusion strategies in cross-modal retrieval?",
  "How to address domain shift issues in cross-modal retrieval?",
  "How to design evaluation metrics for cross-modal retrieval?",
  "What data augmentation methods are used in cross-modal retrieval?",
  "How do deep image-text alignment techniques improve retrieval performance?",
  "How to improve cross-modal retrieval models through knowledge distillation?",
]);

const questionSelection = ref(0);
const uiChange = ref(0);
const userInput = ref("");
const userInput2 = ref("");
const messages = ref([]);
const chatHistory = ref(null);
const currentTheme = ref("Starfield");

const currentThemeComponent = computed(() => {
  switch (currentTheme.value) {
    case "Neural":
      return Neural;
    case "CrossStar":
      return CrossStar;
    default:
      return Starfield;
  }
});

// 切换问题选择
const changeSelection = () => {
  questionSelection.value++;
  questionSelection.value = questionSelection.value % 5;
};

// 删除历史记录
const removeHistory = (index) => {
  history.value.splice(index, 1);
};

// 查看历史记录
const viewHistory = (index) => {
  const selectedHistory = history.value[index];
  messages.value = selectedHistory.messages;
};

// 发送消息
const sendMessage = async () => {
  if (userInput.value.trim()) {
    const currentTime = new Date().toLocaleTimeString();

    uiChange.value = 1;
    messages.value = [];

    const newMessage = {
      text: userInput.value,
      time: currentTime,
      isResponse: false,
      loading: true,
    };

    messages.value.push(newMessage);

    history.value.push({
      text: userInput.value,
      messages: newMessage,
    });

    await sendToBackend(userInput.value);
    userInput.value = "";
  }
};

// 根据问题索引发送消息
const sendMessageIndex = async (index) => {
  uiChange.value = 1;
  userInput2.value = question.value[index];
  if (userInput2.value.trim()) {
    const currentTime = new Date().toLocaleTimeString();

    const newMessage = {
      text: userInput2.value,
      time: currentTime,
      isResponse: false,
      loading: true,
    };

    messages.value.push(newMessage);

    history.value.push({
      text: userInput2.value,
      messages: newMessage,
    });

    await sendToBackend(userInput2.value);
    userInput2.value = "";
  }
};

const api = {
  dialogue: API_ENDPOINTS.dialogue,
};

let url = api.dialogue;

// 处理搜索
const handleSearch = async (question) => {
  uiChange.value = 1;
  userInput.value = question;

  if (question.trim()) {
    const currentTime = new Date().toLocaleTimeString();

    const newMessage = {
      text: question,
      time: currentTime,
      isResponse: false,
    };

    messages.value.push(newMessage);

    history.value.push({
      text: question,
      messages: [...messages.value],
    });

    await sendToBackend(question);
  }
};

// 发送请求到后端
const sendToBackend = async (inputText) => {
  const formData = new FormData();
  formData.append("content", inputText);

  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      handleError("Missing authentication token, please log in again.");
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
      handleError("Request failed, please try again later.");
      return;
    }

    const result = await response.json();

    if (result.code === 0) {
      messages.value.push({
        text: result.message,
        time: new Date().toLocaleTimeString(),
        isResponse: true,
        loading: false,
      });

      if (messages.value[0]) {
        messages.value[0].loading = false;
      }
    }
  } catch (error) {
    handleError(`Request failed ${error.message}`);
  }
};

// 重试响应
const retryResponse = async () => {
  messages.value.splice(messages.value.length - 1, 1);
  messages.value[0].loading = true;

  if (messages.value.length > 0) {
    const userQuestion = messages.value[messages.value.length - 1].text;
    await sendToBackend(userQuestion);
  }
};

// 复制响应
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

// 处理错误
const handleError = (message) => {
  alert(message);
};

onMounted(() => {
  const username = getUsername();

  if (!username) {
    router.push("/");
  } else {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      currentTheme.value = savedTheme;
    }
  }
});
</script>

<style scoped>
.chat-system {
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

.question-list {
  display: flex;
  gap: 10px;
  justify-content: space-around;
  align-items: stretch;
  width: 100%;
  margin: 10px;
  height: 12%;
}

.question-button {
  background-color: rgba(30, 30, 63, 0.2);
  border: 1px solid rgba(84, 83, 83, 0.5);
  color: rgba(211, 211, 211, 1);
  padding: 10px 10px;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
  width: 45%;
  height: 85%;
  box-shadow: 20px 20px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.question-button:hover {
  background-color: #3e3e5f;
}

.chat-history {
  position: absolute;
  top: 0;
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
  font-size: medium;
  line-height: 1.2;
}

.response {
  margin-top: 10px;
  display: flex;
  gap: 10px;
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
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  background: transparent;
  width: 100%;
  height: 10%;
}

.input-area input {
  flex: 30;
  padding: 10px;
  border: none;
  border-radius: 5px;
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
.input-area button:hover {
  background-color: #0056b3;
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

.history-text {
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
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
