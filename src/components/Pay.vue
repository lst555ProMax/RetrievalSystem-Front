<template>
  <div v-if="isVisible" class="personal-overlay">
    <div class="personal-content" @click="stop">
      <!-- 头部：显示标题和关闭按钮 -->
      <div class="personal-header">
        <h2>sponsor</h2>
        <button class="close-button" @click="close">×</button>
      </div>

      <!-- 内容：赞助说明和图片展示 -->
      <div class="personal-body">
        <p class="sponsorship-text">
          Maintaining such a cross-modal image text retrieval system and
          developing new features for the project required a great deal of
          effort and was only sustained with the generous financial support of
          our sponsors.
        </p>

        <!-- 图片展示区 -->
        <div class="sponsorship-image">
          <img src="../assets/sponsorship.png" alt="Sponsored Images" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { API_ENDPOINTS } from "../config/apiConfig";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const { username } = userStore;
const { proxy } = getCurrentInstance();

const props = defineProps({
  isVisible: Boolean,
});

const token = localStorage.getItem("jwtToken");

const emit = defineEmits(["update:isVisible"]);

// 关闭弹窗
const close = () => {
  emit("update:isVisible", false);
};

// 处理“赞助”按钮点击事件
const handleSponsorship = () => {
  alert("Thank you for your support!");
};

// 表单提交逻辑
const submitForm = async () => {
  // 你的提交逻辑
};
</script>

<style scoped>
.personal-overlay {
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

.personal-content {
  background-color: rgba(26, 28, 45, 0.35);
  border-radius: 20px;
  width: 380px;
  height: 480px;
  padding: 20px 30px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  border: 1px solid rgba(202, 202, 208, 0.35);
}

.personal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.personal-header h2 {
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

.personal-body {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.sponsorship-text {
  color: #ffffff;
  margin:10px 10px 50px 10px;
  line-height: 1.5;
  font-weight: 500;
  font-size: 15px;
}

.sponsorship-image {
  align-items: center;
  justify-items: center;
  text-align: center;
}

.sponsorship-image img {
  max-width: 60%;
  height: auto;
  border-radius: 10px;
}

.personal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-button,
.confirm-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background-color: #444;
  color: #ffffff;
}

.confirm-button {
  background-color: #1e90ff;
  color: #ffffff;
}
</style>
