<!-- 进度条不随内容更新而滚动 -->
<!-- v-if无法渲染样式的问题始终无法解决 -->
<!-- 历史记录还没有实现 -->
<!-- 聊天历史的样式需要改进 -->
<!-- 需要引入大模型接口来实现最终的聊天逻辑 -->
<template>
  <div class="chat-system">
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
  "什么是跨模态学习？",
  "图像和文本之间的关联如何建立？",
  "如何评估跨模态检索系统的效果？",
  "什么是图像文本检索中的多模态融合？",
  "深度学习在跨模态检索中的作用是什么？",
  "预训练模型在跨模态任务中的应用有哪些？",
  "跨模态检索中的对齐技术有什么进展？",
  "如何处理跨模态数据中的噪声？",
  "如何利用生成模型改进跨模态检索？",
  "图像描述生成在跨模态检索中的角色是什么？",
  "什么是跨模态检索中的零样本学习？",
  "如何解决跨模态检索中的多样性和模态不平衡问题？",
  "跨模态学习的主要挑战有哪些？",
  "多模态神经网络如何在跨模态检索中工作？",
  "如何优化跨模态检索的效率和精度？",
  "跨模态检索中的注意力机制是如何应用的？",
  "跨模态检索与传统检索有何不同？",
  "生成式对抗网络如何用于跨模态学习？",
  "如何处理跨模态检索中的数据稀疏性问题？",
  "跨模态检索中的语义表示如何实现？",
  "自监督学习在跨模态检索中的应用有哪些？",
  "如何评价跨模态检索中的检索相关性？",
  "跨模态嵌入技术的最新进展有哪些？",
  "跨模态学习中如何进行特征对齐？",
  "多模态融合策略在跨模态检索中的作用是什么？",
  "如何应对跨模态检索中的领域偏移问题？",
  "如何设计跨模态检索的评价指标？",
  "跨模态检索中的数据增强方法有哪些？",
  "深度图像-文本对齐技术如何提升检索效果？",
  "如何通过知识蒸馏改进跨模态检索模型？",
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
.chat-system {
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
