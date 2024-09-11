<template>
  <div v-if="isVisible" class="feedback-overlay">
    <div class="feedback-container">
      <header class="feedback-header">
        <h2>Feedback</h2>
        <button class="close-button" @click="close">×</button>
      </header>
      <div class="feedback-content">
        <p class="message">
          Hello, I'm sorry we can't provide you with a complete service, if you
          need help, please leave a message, we will contact and solve your
          problem as soon as possible!
        </p>

        <!-- Problem Type Section -->
        <div class="problem-type">
          <label>The type of question *</label>
          <div class="problem-buttons">
            <button
              :class="{ active: selectedType === 'member' }"
              @click="selectType('member')"
            >
              Inquiries
            </button>
            <button
              :class="{ active: selectedType === 'product' }"
              @click="selectType('product')"
            >
              Problems
            </button>
            <button
              :class="{ active: selectedType === 'consult' }"
              @click="selectType('consult')"
            >
              Question
            </button>
            <button
              :class="{ active: selectedType === 'other' }"
              @click="selectType('other')"
            >
              Misissue
            </button>
          </div>
        </div>

        <!-- Feedback Content Section -->
        <div class="feedback-text">
          <label>Feedback content *</label>
          <textarea
            v-model="feedbackContent"
            placeholder="Please fill in your specific description"
          ></textarea>
        </div>
      </div>

      <!-- Footer Buttons -->
      <footer class="feedback-footer">
        <button class="feedback-count">
          Number of feedbacks: {{ feedbackCount }}
        </button>
        <div class="action-buttons">
          <button class="cancel-button" @click="close">Cancel</button>
          <button class="submit-button" @click="submitFeedback">Submit</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { defineProps, defineEmits } from "vue";
import { getUsername } from "../utils/Auth";
import { API_ENDPOINTS } from "../config/apiConfig";

import Request from "../utils/Request";

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["update:isVisible"]);

onMounted(() => {
  const storedCount = localStorage.getItem("feedbackCount");
  if (storedCount) {
    feedbackCount.value = parseInt(storedCount, 10);
  }
});

const feedbackCount = ref(0); // 初始化反馈次数为0

const selectedType = ref("member");
const feedbackContent = ref("");
const contactInfo = ref("");
// 上传图片函数，参数index用于标识上传的是第几个框的图片
const uploadImage = (index) => {
  // 选择文件上传
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 创建一个FileReader来读取文件
      const reader = new FileReader();
      reader.onload = (e) => {
        // 读取文件完成后，将URL设置为对应框的图片
        images.value[index].url = e.target.result;
      };
      reader.readAsDataURL(file); // 读取文件为Data URL
    }
  };
  input.click(); // 触发文件选择框
};

// 删除图片函数，参数index用于标识删除的是第几个框的图片
const removeImage = (index) => {
  images.value[index].url = ""; // 清空图片URL
};

const close = () => {
  emit("update:isVisible", false);
};

const images = ref([
  { url: "" },
  { url: "" },
  { url: "" },
  { url: "" },
  { url: "" },
]);

// 选择问题类型
function selectType(type) {
  selectedType.value = type;
}

// 触发文件输入框
function triggerFileInput(index) {
  const input = document.querySelectorAll("input[type='file']")[index];
  input.click();
}

// 处理文件上传
function handleFileChange(event, index) {
  const file = event.target.files[0];
  if (!file) return;

  // 限制文件大小为2M
  if (file.size > 2 * 1024 * 1024) {
    alert("The size of the image cannot exceed 2M");
    return;
  }

  // 读取文件内容作为图片URL
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImages.value[index].url = e.target.result;
  };
  reader.readAsDataURL(file);
}

const api = {
  feedback: API_ENDPOINTS.feedback,
};

let url = api.feedback;

const token = localStorage.getItem("jwtToken");

async function submitFeedback() {
  const formData = new FormData();
  formData.append("username", getUsername());
  formData.append("content", feedbackContent.value);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // 使用 FormData 作为请求体
    });

    const result = await response.json();

    if (result.code === 0) {
      feedbackCount.value += 1;
      localStorage.setItem("feedbackCount", feedbackCount.value.toString());
      alert("Submitted successfully!");
      close();
    }
  } catch (error) {
    alert("Submission failed", error);
  }
}

// Base64转File对象
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
</script>

<style scoped>
.feedback-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.feedback-container {
  width: 480px;
  height: 600px;
  background-color: rgba(26, 28, 45, 0.35);
  border-radius: 20px;
  padding: 20px 30px 20px 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(202, 202, 208, 0.35);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(202, 202, 208, 0.35);
}

.feedback-header h2 {
  margin: 0;
  font-size: 18px;
  color: #ffffff;
}

.close-button {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
}

.feedback-content {
  margin-top: 25px;
  color: #ffffff;
  height:80%;
}

.message {
  font-size: 14px;
  color: #ddd;
  margin-bottom: 25px;
}

.problem-type label,
.feedback-text label {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: #ffffff;
}

.problem-buttons {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
}

.problem-buttons button {
  padding: 8px 16px;
  border: 1px solid rgba(202, 202, 208, 0.35);
  background-color: #2b2e3e;
  color: #aaa;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.problem-buttons button.active {
  background-color: #1e90ff;
  color: #ffffff;
}

.feedback-text textarea {
  width: 100%;
  border: 1px solid rgba(202, 202, 208, 0.35);
  background-color: #2b2e3e;
  color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  resize: none;
  min-height: 200px;
  margin-bottom: 20px;
}

.feedback-footer {
  display: flex;
  justify-content: space-between;
  align-items: bottom;
  padding-top: 10px;
  border-top: 1px solid rgba(202, 202, 208, 0.35);
}

.feedback-count {
  font-size: 14px;
  align-items: bottom;
  color: #ffffff;
  background-color: transparent;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.cancel-button,
.submit-button {
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.cancel-button {
  background-color: #444;
  color: #ffffff;
}

.submit-button {
  background-color: #1e90ff;
  color: #ffffff;
}
</style>
