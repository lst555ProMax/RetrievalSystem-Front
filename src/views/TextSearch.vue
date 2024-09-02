<!-- 进度条不随内容更新而滚动 -->
<!-- v-if无法渲染样式的问题始终无法解决 -->
<!-- 历史记录还没有实现 -->
<!-- 聊天历史的样式需要改进 -->
<!-- 需要引入大模型接口来实现最终的聊天逻辑 -->
<template>
  <div class="textToImage-system">
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
                <div class="question-list">
                  <button class="question-button" @click="sendMessageIndex(0 + 6 * questionSelection)">
                    {{ question[0 + 6 * questionSelection] }}
                  </button>
                  <button class="question-button" @click="sendMessageIndex(1 + 6 * questionSelection)">
                    {{ question[1 + 6 * questionSelection] }}
                  </button>
                </div>
                <div class="question-list">
                  <button class="question-button" @click="sendMessageIndex(2 + 6 * questionSelection)">
                    {{ question[2 + 6 * questionSelection] }}
                  </button>
                  <button class="question-button" @click="sendMessageIndex(3 + 6 * questionSelection)">
                    {{ question[3 + 6 * questionSelection] }}
                  </button>
                </div>
                <div class="question-list">
                  <button class="question-button" @click="sendMessageIndex(4 + 6 * questionSelection)">
                    {{ question[4 + 6 * questionSelection] }}
                  </button>
                  <button class="question-button" @click="sendMessageIndex(5 + 6 * questionSelection)">
                    {{ question[5 + 6 * questionSelection] }}
                  </button>
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
                <!--                 <img src="user-avatar.png" alt="User Avatar" class="avatar" /> -->
                <span class="message-time">{{ message.time }}</span>
              </div>
              <div class="message-content">
                <p>{{ message.text }}</p>
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
              type="text"
              v-model="userInput"
              placeholder="请输入文本..."
              @keyup.enter="sendMessage"
            />
            <button @click="sendMessage">➤</button>
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
import { ref,watch,onMounted } from "vue";
import sidebar from "../components/Sidebar.vue";
import headbar from "../components/Headbar.vue";

const history = ref(["你好", "你好", "你好", "你好"]); // 示例数据
const question = ref([
  "A child in a blue shirt is climbing up a set of stairs .",
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
  "A small girl grips onto the blue ropes at the playground.",
  "The small boy climbs on blue ropes on a playground."
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

const sendMessage = () => {
  uiChange.value = 1;
  if (userInput.value.trim()) {
    // 获取当前时间
    const currentTime = new Date().toLocaleTimeString();

    // 添加用户的提问到消息列表
    messages.value.push({
      text: userInput.value,
      time: currentTime,
      isResponse: false,
    });

    // 模拟系统回答
    setTimeout(() => {
      messages.value.push({
        text: "系统正在处理您的请求...",
        time: currentTime,
        isResponse: true,
      });
    }, 500);

    // 清空输入框
    userInput.value = "";
  }
};

const sendMessageIndex = (index) => {
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

    // 模拟系统回答
    setTimeout(() => {
      messages.value.push({
        text: "系统正在处理您的请求...",
        time: currentTime,
        isResponse: true,
      });
    }, 500);

    // 清空输入框
    userInput2.value = "";
  }
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
  height: calc(100% - 60px);
  flex-direction: row;
}

.main-content {
  display: flex;
  flex-direction: row;
  padding: 0px;
  flex: 1;
  overflow-y: auto;
  background-color: #0e0d27;
}

.up-down {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 4;
  background-color: #0e0d27;
  margin:10px;
}

.recommendations {
  position: absolute; /* 绝对定位 */
  top: 0; /* 固定在底部 */
  width:100%;
  height:80%;
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
  position: absolute; /* 绝对定位 */
  top: 0; /* 固定在底部 */
  width:100%;
  height:85%;
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
  height:15%;
}

.input-area input {
  flex: 30;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  background-color: #1e1e3f;
  color: #d3d3d3;
  height:50%;
}

.input-area button {
  flex:1;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.input-area button:hover {
  background-color: #0056b3;
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
