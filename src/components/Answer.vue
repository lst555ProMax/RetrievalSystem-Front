<template>
  <div v-if="isVisible" class="faq-overlay">
    <div class="faq-container">
      <header class="faq-header">
        <h2>常见问题与解答</h2>
        <button class="close-button" @click="close">×</button>
      </header>
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

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["update:isVisible"]);

const close = () => {
  emit("update:isVisible", false);
};

// 初始化问题与答案列表
const faqList = ref([
  {
    question: "问题1：什么叫跨模态？",
    answer: "跨模态指的是在不同模态之间进行信息的关联、转换或融合的技术。模态是指感知、获取或表达信息的方式，比如视觉、听觉、触觉、语言（文本）等。在人工智能和深度学习领域，跨模态技术涉及从一种模态的信息中提取特征，并将其应用于另一种模态，或在多种模态之间建立联系和相互理解。。",
  },
  {
    question: "问题2：产品的基本功能有哪些？",
    answer: "我们的产品主要支持文本检索和图片检索的功能，您可以在这里找到满意的答案。",
  },
  {
    question: "问题3：如何更换绑定的邮箱？",
    answer: "请在账户的修改个人信息设置中选择修改邮箱。",
  },
  {
    question: "问题4：是否支持多语言界面？",
    answer: "目前支持中英文界面，其他语言将在后续版本中陆续开放。",
  },
  {
    question: "问题5：怎么查看历史？",
    answer: "您可以在文图搜索界面的侧边栏页面查看历史记录。",
  },
  {
    question: "问题6：如何修改密码？",
    answer: "请在账户的修改个人信息设置中选择修改密码。",
  },
  {
    question: "问题7：产品的隐私政策是什么？",
    answer: "您可以在我们的隐私政策页面详细阅读相关内容。",
  },
  {
    question: "问题8：如何联系客服？",
    answer: "您可以点击右上角的最左侧的图标找到我们的联系方式。",
  },
  {
    question: "问题9：赞助指的是什么？",
    answer: "如果您对我们的项目的界面设计和功能实现足够满意，并且认为我们具有十足的开发潜力，可以扫描二维码赞助我们。",
  },
  {
    question: "问题10：可以申请退款吗？",
    answer: "如有特殊情况可联系我们进行退款申请。",
  },
]);

const activeIndex = ref(null);

// 展开或折叠答案
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
  width: 400px;
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
  color: #aaa;
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
