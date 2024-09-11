<template>
  <!-- 顶部菜单栏 -->
  <div class="menu-bar">
    <div class="menu-items">
      <!-- 官方通知标签，点击切换到官方通知 -->
      <div
        class="menu-item"
        :class="{ active: activeTab === 'official' }"
        @click="setActiveTab('official')"
      >
        Official
      </div>
      <!-- 动态标签，点击切换到动态 -->
      <div
        class="menu-item"
        :class="{ active: activeTab === 'activity' }"
        @click="setActiveTab('activity')"
      >
        Dynamic
      </div>
    </div>
    <!-- 一键已读按钮 -->
    <span
      class="read-all"
      @click="markAllAsRead"
      :style="{ color: readAll ? '#c0c0c0' : '#ffffff' }"
    >
      {{ readAll ? "Read" : "Read all" }}
    </span>
  </div>

  <div v-if="activeTab === 'official'" class="content1">
    <!-- 问题与解答内容区域 -->
    <div class="faq-content">
      <!-- 循环渲染 FAQ 列表中的每个问题 -->
      <div
        v-for="(item, index) in faqList"
        :key="index"
        class="faq-item"
        @click="toggleAnswer(index)"
      >
        <!-- 问题文本，点击时展开或折叠答案 -->
        <p class="question">
          <span v-if="!readAll && !item.read" class="unread-indicator">●</span>
          {{ item.question }}
          <span :class="['arrow', { rotated: activeIndex === index }]"
            >&#9662;</span
          >
        </p>
        <!-- 答案文本，当前激活索引与问题索引匹配时显示 -->
        <p v-if="activeIndex === index" class="answer">{{ item.answer }}</p>
      </div>
    </div>
  </div>

  <!-- 内容区域 -->
  <div v-if="activeTab === 'activity'" class="content2">
    <!-- 动态内容 -->
    <div class="activity-state">
      <!-- 动态图标 -->
      <i class="fa-solid fa-box-open fa-2xl"></i>
      <!-- 无动态提示文字 -->
      <p class="activity-text">There is no activity yet</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 从 localStorage 中加载已读状态
const loadReadStatus = () => {
  const savedFaqList = localStorage.getItem("faqList");
  if (savedFaqList) {
    faqList.value = JSON.parse(savedFaqList);
  }
  const savedReadAll = localStorage.getItem("readAll");
  if (savedReadAll) {
    readAll.value = JSON.parse(savedReadAll);
  }
};

// 保存已读状态到 localStorage
const saveReadStatus = () => {
  localStorage.setItem("faqList", JSON.stringify(faqList.value));
  localStorage.setItem("readAll", JSON.stringify(readAll.value));
};

//定义消息列表
const faqList = ref([
  {
    question: "Launched the conversation function",
    answer: "Click dialog in the sidebar to have a conversation with the AI.",
    read: false, // 添加标记未读的字段
  },
]);

// 当前激活的问题索引，控制哪个答案被展开
const activeIndex = ref(null);

// 控制“Read all”按钮文本和状态
const readAll = ref(false);

// 切换答案的展开或折叠状态
const toggleAnswer = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

// 定义当前激活的标签，默认为官方通知
const activeTab = ref("official");

// 设置当前激活的标签
const setActiveTab = (tab) => {
  activeTab.value = tab;
};

// 标记所有问题为已读
const markAllAsRead = () => {
  readAll.value = true;
  faqList.value.forEach((item) => {
    item.read = true;
  });
  saveReadStatus(); // 保存状态到 localStorage
};

// 加载状态
onMounted(() => {
  loadReadStatus(); // 从 localStorage 中加载状态
});
</script>

<style scoped>
/* 未读标志样式 */
.unread-indicator {
  color: red;
  margin-right: 8px;
  font-size: 20px;
}
.settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1e1f2b;
  border-radius: 10px;
  width: 400px;
  color: #c0c0c0;
  position: relative;
}

.menu-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  border-bottom: 1px solid #2c2c3c;
  margin-bottom: 20px;
  height: 40px;
}

.menu-items {
  width: 80%;
  height: auto;
  justify-content: space-left;
  height: 40px;
  align-items: center;
  display: flex;
  flex-direction: row;
}

.menu-item {
  cursor: pointer;
  padding: 10px;
  color: #c0c0c0;
  transition: color 0.3s;
  height: 40px;
}

.menu-item.active {
  color: #ffffff;
  border-bottom: 2px solid #3e3e5f;
  height: 40px;
}

.content1 {
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: top;
  justify-content: left;
  width: 100%;
  height: 280px;
  background: transparent;
  border-radius: 8px;
}

.content2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 280px;
  background: transparent;
  border-radius: 8px;
}

.faq-content {
  max-height: 500px;
  color: #fff;
  overflow-y: scroll;
  padding-right: 10px; /* 确保右侧内边距 */
}

.faq-content::-webkit-scrollbar {
  display: none;
}

.faq-item {
  padding: 10px 0;
  cursor: pointer;
}

.question {
  font-size: 16px;
  color: #aaa;
  align-items: center;
}

/* 下箭头的默认样式 */
.arrow {
  margin-left: 10px;
  font-size: 18px;
  transition: transform 0.3s ease;
  color: #ccc;
}

/* 当问题被展开时，箭头向上旋转 */
.rotated {
  transform: rotate(180deg);
}

.answer {
  font-size: 14px;
  color: #ddd;
  margin-top: 10px;
}

.read-all {
  color: #c0c0c0;
  cursor: pointer;
  align-content: center;
}

.activity-state {
  text-align: center;
}

.activity-image {
  width: 50px;

  margin-bottom: 10px;
}

.activity-text {
  font-size: 14px;
  color: #888888;
}

.tab {
  height: 20%;
  width: 100%;
  margin-bottom: 10px;
  justify-content: center;
  display: flex;
  padding: 10px;
}

.view-all-button {
  flex: 1;
  --el-button-bg-color: rgba(30, 30, 63, 0.2);
  --el-button-border-color: #252738;
}

.view-all-button:hover {
  --el-button-hover-bg-color: #3e3e5f;
  --el-button-hover-border-color: #3e3e5f;
}
</style>
