<template>
  <starfield />

  <dashboard> 
  <template #left-content>
    <div class="non-header">
    <div class="main-content">
        <div class="up-down">
          <!-- 推荐搜索----------------------------------------------------------------------------- -->
          <div v-if="!uiChange" :key="1">
            <div class="recommendations">
              <div class="headbar">
                <div class="text">你可以这样向我提问</div>
                <div class="icon" @click="changeSelection">
                  <div>换一批</div>
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
<!--               <div class="question-list">
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
              </div> -->
            </div>
          </div>
          <!-- 搜索界面-------------------------------------------------------------------------------------- -->
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
                <!-- 判断并显示图片 -->
                <div class="image-container">
                <img
                v-for="(imageUrl, index) in message.imageurls"
                  :key="index"
                  :src="imageUrl"
                  alt="图片"
                  class="response-image"
                />
              </div>
              </div>
              <div v-if="message.isResponse" class="response">
                <button @click="retryResponse(index)">重新回答</button>
  <button @click="copyResponse(index)">复制</button>
              </div>
            </div>
          </div>
          <!-- 输入框---------------------------------------------------------------------- -->
          <div class="input-area">
            <input
              type="text"
              v-model="userInput"
              placeholder="请输入文本..."
              @keyup.enter="sendMessage"
            />
            <button @click="sendMessage">➤</button>
          </div>
          <!-- ------------------------------------------------------------------------ -->
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
  </template>
</dashboard>

    
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import Starfield from "../components/Starfield.vue";
import { getUsername } from "../utils/Auth";
import dashboard from "../components/Dashboard.vue"
import { API_ENDPOINTS } from "../config/apiConfig";

const router = useRouter();

const history = ref(["你好", "你好", "你好", "你好"]); // 示例数据
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

const changeSelection = () => {
  questionSelection.value++;
  questionSelection.value = questionSelection.value % 7;
};

const removeHistory = (index) => {
  history.value.splice(index, 1);
};

// 示例数据
const messages = ref([]);
const userInput = ref("");
const userInput2 = ref("");

const currentQuestion =ref();
let isReResponce = ref(false);

// 绑定 chat-history 的 DOM 元素
const chatHistory = ref(null);

const token = localStorage.getItem("jwtToken");

const api = {
  text: API_ENDPOINTS.text,
};

let url = api.text;

// 发送用户消息和请求后端接口
const sendMessage = async () => {
  if (userInput.value.trim()) {
    const currentTime = new Date().toLocaleTimeString();

    uiChange.value = 1;

    // 添加用户的提问到消息列表
    messages.value.push({
      text: userInput.value,
      time: currentTime,
      isResponse: false,
    });

    currentQuestion.value=userInput.value;

    // 调用后端接口
    await sendToBackend(userInput.value);

    // 清空输入框
    userInput.value = "";
  }
};

const sendMessageIndex = async (index) => {
  uiChange.value = 1;
  userInput2.value = question.value[index];
  if (userInput2.value.trim()) {
    // 获取当前时间
    const currentTime = new Date().toLocaleTimeString();

    // 添加用户的提问到消息列表
    messages.value.push({
      text: userInput2.value,
      time: currentTime,
      isResponse: false,
    });

    currentQuestion.value=question.value[index];
    // 调用后端接口
    await sendToBackend(userInput2.value,index);

    // 清空
    userInput2.value = "";
  }
};

// 发送请求到后端
const sendToBackend = async (inputText,index) => {
  const formData = new FormData();
  formData.append("username", getUsername());
  formData.append("keywords", inputText);

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

    if (response.code === 0) {
      const responseTime = new Date().toLocaleTimeString();
      console.log(response);

      // 初始化一个数组，用于存储所有图片的 URL
      const imageUrls = [];

      // 检查是否包含 data 数据
      if (response.data) {
        // 将 base64 字符串数组转换为可用于 img 标签的 URL 并存入 imageUrls
        response.data.forEach((imgBase64) => {
          const imgSrc = `data:image/png;base64,${imgBase64}`;
          imageUrls.push(imgSrc);
/*           console.log(imageUrls[0]); */
        });
        if(isReResponce.value)
        {messages.value.splice(messages.value.length - 1, 1);
}
        // 将所有图片合并到一个消息中
        messages.value.push({
          text: "生成的图像如下：", // 可选的描述文本
          time: responseTime,
          isResponse: true,
          imageurls: imageUrls, // 保存所有图片的 URL
        });

        console.log(messages.value[1]);
      } else {
        // 没有图片的情况下显示普通文本
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

//界面跟随文本滚动，未实现
watch(messages, async () => {
  await nextTick(); // 等待 DOM 更新完成
  if (chatHistory.value) {
    chatHistory.value.scrollTop = chatHistory.value.scrollHeight;
  }
});

// 重新回答功能
const retryResponse = async (index) => {
  const messageText = currentQuestion.value;
  
  messages.value[index].text = "系统正在重新回答...";
  messages.value[index].isResponse = false;

  // Optionally, remove any images in case of retry
  if (messages.value[index].imageurls) {
    messages.value[index].imageurls = [];
  }

  isReResponce.value=true;

  // Send the original message text to the backend again
  await sendToBackend(messageText,index);

  isReResponce.value=false;
};

// 复制功能
// 复制功能
const copyResponse = (index) => {
  const responseText = messages.value[index].text;

  navigator.clipboard.writeText(responseText)
    .then(() => {
      alert("回答已复制到剪贴板！");
    })
    .catch((err) => {
      console.error("复制失败", err);
      alert("复制失败，请重试！");
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
  height: calc(100% );
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
  position: absolute; /* 绝对定位 */
  top: 0; /* 固定在底部 */
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
  font-family: 'Consolas',monospace;
}

.question-button:hover {
  background-color: rgba(173,216,230,0.5);
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
  background: rgba(173,216,230,0.05);;
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
  width:150px;
  height:150px;
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
  background-color: rgba(255,255,255,0.1);
  color: #d3d3d3;
  height: 50px;
  font-family: 'Consolas',monospace;
  font-size: 15px;
}

.input-area button {
  flex: 1;
  padding: 10px;
  background-color: rgba(0,123,255,0.1);
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
  background-color:rgba(128,128,128,0.05);
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
  background-color: rgba(60,63,87,0.65);
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
、
