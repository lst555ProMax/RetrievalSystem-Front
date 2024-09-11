<template>
  <!-- 常见问题与解答弹窗，当 isVisible 为 true 时显示 -->
  <div v-if="isVisible" class="faq-overlay">
    <div class="faq-container">
      <!-- 顶部标题和关闭按钮 -->
      <header class="faq-header">
        <h2>frequently asked questions</h2>
        <button class="close-button" @click="close">×</button>
      </header>
      <!-- 问题与解答内容区域 -->
      <div class="faq-content">
        <div
          v-for="(item, index) in faqList"
          :key="index"
          class="faq-item"
          @click="toggleAnswer(index)"
        >
          <p class="question">
            {{ item.question
            }}<span :class="['arrow', { rotated: activeIndex === index }]"
              >&#9662;</span
            >
          </p>
          <p v-if="activeIndex === index" class="answer">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

// 定义传入的属性，isVisible 控制弹窗的显示与隐藏
const props = defineProps({
  isVisible: Boolean,
});

// 定义事件，用于向父组件通知状态更新
const emit = defineEmits(["update:isVisible"]);

// 关闭弹窗的函数，触发 update:isVisible 事件，将 isVisible 设置为 false
const close = () => {
  emit("update:isVisible", false);
};

// 初始化常见问题与解答列表，包含问题文本和对应的答案
const faqList = ref([
  {
    question: "Question 1: What is cross-modality?",
    answer:
      "Cross-modality refers to the technology of associating, converting, or fusing information between different modalities. Modality refers to the way in which information is perceived, obtained, or expressed, such as sight, hearing, touch, language (text), etc. In the field of artificial intelligence and deep learning, cross-modal techniques involve extracting features from information in one modality and applying them to another, or making connections and mutual understanding between multiple modalities.",
  },
  {
    question: "Q2: What are the basic functions of the product?",
    answer:
      "Our products mainly support text retrieval and image retrieval functions, you can find satisfactory answers here.",
  },
  {
    question: "Q3: How do I change the associated email address?",
    answer:
      "Please select Modify email address in the Edit Personal Information setting of your account.",
  },
  {
    question: "Q4: Does it support multi-language interface?",
    answer:
      "Currently, the interface is supported in both Chinese and English, and other languages will be opened in subsequent versions.",
  },
  {
    question: "Q5: How can I check my history?",
    answer:
      "You can view the history on the sidebar page of the Wentu search interface.",
  },
  {
    question: "Q6: How do I change my password?",
    answer:
      "Please select Change Password in the Modify Personal Information setting of your account.",
  },
  {
    question: "Q7: What is the privacy policy of the product?",
    answer: "You can read more about this on our Privacy Policy page.",
  },
  {
    question: "Q8: How do I contact customer service?",
    answer:
      "You can find our contact details by clicking on the leftmost icon in the top right corner.",
  },
  {
    question: "Q9: What is sponsorship?",
    answer:
      "If you are satisfied enough with the interface design and functional implementation of our project, and think that we have full development potential, you can scan the QR code to sponsor us.",
  },
  {
    question: "Q10: Can I apply for a refund?",
    answer:
      "If there are special circumstances, you can contact us for a refund application.",
  },
]);

// 当前激活的问题索引，控制哪个答案被展开
const activeIndex = ref(null);

// 切换答案的展开或折叠状态
const toggleAnswer = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped>
.faq-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.faq-container {
  width: 450px;
  max-height: 600px;
  background-color: rgba(26, 28, 45, 0.35);
  border-radius: 20px;
  padding: 20px 30px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  border: 1px solid rgba(202, 202, 208, 0.35);
}

.faq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.faq-header h2 {
  color: #ffffff;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
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
  border-bottom: 1px solid #2c2f45;
  cursor: pointer;
}

.question {
  font-size: 14px;
  color: #e2e2e2;
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
</style>
