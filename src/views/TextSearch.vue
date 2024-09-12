<template>
  <component :is="currentThemeComponent" />
  <div v-if="showModal" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <img :src="currentImage" alt="Enlarged Image" class="modal-image" />
      <div class="modal-buttons">
        <button @click="downloadImage(currentImage)">Save</button>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>

  <dashboard>
    <template #left-content>
      <div class="non-header">
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
                <div class="question-list">
                  <button
                    class="question-button"
                    @click="sendMessageIndex(0 + 4 * questionSelection)"
                  >
                    {{ question[0 + 4 * questionSelection] }}
                  </button>
                  <button
                    class="question-button"
                    @click="sendMessageIndex(1 + 4 * questionSelection)"
                  >
                    {{ question[1 + 4 * questionSelection] }}
                  </button>
                </div>
                <div class="question-list">
                  <button
                    class="question-button"
                    @click="sendMessageIndex(2 + 4 * questionSelection)"
                  >
                    {{ question[2 + 4 * questionSelection] }}
                  </button>
                  <button
                    class="question-button"
                    @click="sendMessageIndex(3 + 4 * questionSelection)"
                  >
                    {{ question[3 + 4 * questionSelection] }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Search Interface -->
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
                  <div class="image-container">
                    <img
                      v-for="(imageUrl, index) in message.imageurls"
                      :key="index"
                      :src="imageUrl"
                      alt="image"
                      class="response-image"
                      @click="enlargeImage(imageUrl)"
                    />
                  </div>
                  <div v-if="message.loading" class="loading-icon">
                    <i class="fa-solid fa-spinner fa-spin"></i>
                  </div>
                </div>
                <div
                  v-if="message.isResponse && !message.fromHistory"
                  class="response"
                >
                  <button @click="retryResponse">Retry</button>
                  <button @click="downloadAllImages">Get</button>
                </div>
              </div>
            </div>

            <!-- Input Box -->
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

          <!-- History Records Section -->
          <div class="history-section">
            <h4>History Records</h4>
            <ul class="history-list">
              <li
                v-for="(item, index) in history"
                :key="item.id"
                @click="fetchHistory(item.id)"
              >
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
import { ref, watch, onMounted, nextTick, computed } from "vue";
import { useRouter } from "vue-router";
import Starfield from "../components/Starfield.vue";
import CrossStar from "@/components/CrossStar.vue";
import Neural from "../components/Neural.vue";
import { getUsername } from "../utils/Auth";
import dashboard from "../components/Dashboard.vue";
import { API_ENDPOINTS } from "../config/apiConfig";

const router = useRouter();

const history = ref([]); // Save history records
const question = ref([
  "A girl going into a wooden building",
  "An elderly woman going into a stone building.",
  "A boy climbing into a colorful playhouse.",
  "A toddler climbing the stairs to her treehouse.",
  "A young boy in a red dress going into a wooden shed.",
  "A cat and a spotted dog are playing.",
  "A fox and a tri-colored dog are interacting on the road.",
  "A black cat and a white dog are staring at each other in the park.",
  "Two cats of different breeds looking at each other on the grass.",
  "Two children on pavement moving toward each other.",
  "A young boy covered in paint sits ",
  "A toddler is sitting in front of a large painted mural.",
  "A young boy in the park plays with fingerpaints.",
  "There is a boy with a cap sitting in front of a rainbow painting.",
  "A young artist with pigtails painting on a canvas outside.",
  "A man sits on a bench while his cat sits beside him.",
  "A woman sits on the bench to which a brown dog is also tied.",
  "A woman napping on a bench outside.",
  "A young man lies on a park bench with his cat.",
  "A woman lying on a bench holding a leash of a cat.",
  "A child in an orange hat staring at something.",
  "A woman wears a red hat and sunglasses.",
  "A boy with glasses and a red hat is wearing a Blitz t-shirt.",
  "A young girl with glasses is wearing a floral hat.",
  "The girl with earrings is wearing glasses and a green hat.",
  "A teenager playing on a rope net.",
  "An elderly man climbing on blue roping.",
  "A boy in red climbs a rope bridge at the park.",
]);
const questionSelection = ref(0);
const uiChange = ref(0);
const messages = ref([]);
const userInput = ref("");
const userInput2 = ref("");
const showModal = ref(false);
const currentImage = ref("");
let isReResponce = ref(false);
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

const token = localStorage.getItem("jwtToken");

const api = {
  text: API_ENDPOINTS.text,
  fetchHistory: API_ENDPOINTS.list,
};

// 放大图片函数
const enlargeImage = (imageUrl) => {
  currentImage.value = imageUrl;
  showModal.value = true;
};

// 关闭模态框
const closeModal = () => {
  showModal.value = false;
  currentImage.value = "";
};

// 下载图片函数
const downloadImage = (imageUrl) => {
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = `downloaded_image.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const changeSelection = () => {
  questionSelection.value++;
  questionSelection.value = questionSelection.value % 7;
};

const removeHistory = (index) => {
  history.value.splice(index, 1);
};

// Send user message and request to backend API
const sendMessage = async () => {
  if (userInput.value.trim()) {
    const currentTime = new Date().toLocaleTimeString();

    uiChange.value = 1;
    messages.value = [];

    messages.value.push({
      text: userInput.value,
      time: currentTime,
      isResponse: false,
      loading: true,
    });

    await sendToBackend(userInput.value);

    userInput.value = "";
  }
};

const sendMessageIndex = async (index) => {
  uiChange.value = 1;
  userInput2.value = question.value[index];
  if (userInput2.value.trim()) {
    const currentTime = new Date().toLocaleTimeString();

    messages.value.push({
      text: userInput2.value,
      time: currentTime,
      isResponse: false,
      loading: true,
    });

    await sendToBackend(userInput2.value, index);

    userInput2.value = "";
  }
};

// Send request to backend
const sendToBackend = async (inputText) => {
  const formData = new FormData();
  formData.append("username", getUsername());
  formData.append("keywords", inputText);

  try {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      handleError("Missing authentication token. Please log in again.");
      return;
    }

    const response = await fetch(api.text, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (result.code === 0) {
      const responseTime = new Date().toLocaleTimeString();

      const imageUrls = [];
      if (result.data) {
        result.data.forEach((imgBase64) => {
          const imgSrc = `data:image/png;base64,${imgBase64}`;
          imageUrls.push(imgSrc);
        });

        messages.value.push({
          text: "Generated images are as follows:",
          time: responseTime,
          isResponse: true,
          imageurls: imageUrls,
          loading: false,
        });
      } else {
        messages.value.push({
          text: result.message || "This is the system's response.",
          time: responseTime,
          isResponse: true,
          loading: false,
        });
      }

      // Update user message loading state
      if (messages.value[0]) {
        messages.value[0].loading = false;
      }

      // Add history record item, including the obtained ID and text
      history.value.push({
        id: result.search_history_id,
        text: inputText,
      });
    } else {
      handleError(
        "Backend returned an error: " + (result.message || "Unknown error")
      );
    }
  } catch (error) {
    handleError("Request failed. Please try again later.");
    console.error("Submission failed", error);
  }
};

// Fetch history record
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
      messages.value.push({
        text: result.data.search_text,
        time: result.data.date,
        isResponse: false,
        fromHistory: true,
      });

      const imageUrls = [];

      result.data.images.forEach((imgBase64) => {
        const imgSrc = `data:image/png;base64,${imgBase64}`;
        imageUrls.push(imgSrc);
      });

      messages.value.push({
        text: "Generated images are as follows:",
        time: result.data.date,
        isResponse: true,
        imageurls: imageUrls,
        fromHistory: true,
      });
    } else {
      handleError(
        "Failed to fetch history record: " + (result.message || "Unknown error")
      );
    }
  } catch (error) {
    handleError("Request failed. Please try again later.");
    console.error("Failed to fetch history record", error);
  }
};

const retryResponse = async () => {
  messages.value.splice(messages.value.length - 1, 1);
  messages.value[0].loading = true;

  if (messages.value.length > 0) {
    const userQuestion = messages.value[messages.value.length - 1].text;
    await sendToBackend(userQuestion);
  }
};

const downloadAllImages = () => {
  const message = messages.value[1];
  if (message && message.imageurls && message.imageurls.length > 0) {
    message.imageurls.forEach((imageUrl, imgIndex) => {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `image_${imgIndex}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  } else {
    alert("No images available to download");
  }
};

// Error handling function
const handleError = (errorMessage) => {
  const errorTime = new Date().toLocaleTimeString();
  messages.value.push({
    text: errorMessage,
    time: errorTime,
    isResponse: true,
  });
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
  nextTick(() => {
    chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
  });
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-buttons {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.modal-image {
  max-width: 100%;
  max-height: 80%;
  border-radius: 8px;
}

.modal-content button {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  padding: 8px 16px;
  background-color: #2e3140;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  height: 80%;
  width: 20%;
}

.textToImage-system {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10px);
  margin: 5px;
  border-radius: 5px;
  overflow: hidden;
}

.non-header {
  display: flex;
  height: calc(100%);
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
  margin: 20px 10px;
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 60px;
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
  margin: 20px 10px;
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
  width: 35%;
  height: 85%;
  box-shadow: 20px 20px 25px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  font-family: "Consolas", monospace;
}

.question-button:hover {
  background-color: rgba(173, 216, 230, 0.5);
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
}

.image-container {
  display: flex;
  gap: 30px;
  justify-content: left;
  flex-wrap: wrap; /* 超过容器宽度时自动换行 */
  overflow-x: hidden; /* 防止水平滚动 */
}

.response-image {
  width: 150px;
  height: 150px;
  margin-top: 10px;
  border-radius: 5px;
  object-fit: cover; /* 图片内容适应框 */
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
