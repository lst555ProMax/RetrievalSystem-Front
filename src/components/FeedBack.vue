<template>
    <div v-if="isVisible" class="feedback-overlay">
      <div class="feedback-container">
        <header class="feedback-header">
          <h2>意见反馈</h2>
          <button class="close-button" @click="close">×</button>
        </header>
        <div class="feedback-content">
          <p class="message">
            您好，很抱歉我们暂时无法为您提供服务，如需帮助请留言，我们将尽快联系并解决您的问题！
          </p>
  
          <!-- Problem Type Section -->
          <div class="problem-type">
            <label>问题类型 *</label>
            <div class="problem-buttons">
              <button :class="{ active: selectedType === 'member' }" @click="selectType('member')">会员问题</button>
              <button :class="{ active: selectedType === 'product' }" @click="selectType('product')">产品建议</button>
              <button :class="{ active: selectedType === 'consult' }" @click="selectType('consult')">我要咨询</button>
              <button :class="{ active: selectedType === 'other' }" @click="selectType('other')">其他</button>
            </div>
          </div>
  
          <!-- Feedback Content Section -->
          <div class="feedback-text">
            <label>反馈内容 *</label>
            <textarea placeholder="请填写您的具体描述"></textarea>
          </div>
  
          <!-- Image Upload Section -->
          <div class="image-upload-section">
            <label>上传图片</label>
            <div class="image-upload-container">
              <div v-for="i in 5" :key="i" class="upload-slot">
                <button>+ 上传图片</button>
              </div>
            </div>
            <p class="hint">温馨提示：支持jpg, png, gif, bmg格式的图片，可上传5张，单张最大2M</p>
          </div>
  
          <!-- Contact Section -->
          <div class="contact-section">
            <label>联系方式</label>
            <input type="text" placeholder="请填写您的手机号" />
          </div>
        </div>
  
        <!-- Footer Buttons -->
        <footer class="feedback-footer">
          <button class="record-button">反馈记录</button>
          <div class="action-buttons">
            <button class="cancel-button" @click="close">取消</button>
            <button class="submit-button">提交</button>
          </div>
        </footer>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { defineProps, defineEmits } from "vue";
  
/*   const isVisible = ref(true); */
  const selectedType = ref('member');

  const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["update:isVisible"]);

const close = () => {
  emit("update:isVisible", false);
};
  
  function closeDialog() {
    isVisible.value = false;
  }
  
  function selectType(type) {
    selectedType.value = type;
  }
  </script>
  
  <style scoped>
  .feedback-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .feedback-container {
    width: 800px;
    background-color: #1a1c2d;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
/*     padding: 20px; */
  }
  
  .feedback-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #262938;
    border-bottom: 1px solid #2c2f45;
  }
  
  .feedback-header h2 {
    margin: 0;
    font-size: 18px;
    color: #fff;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #ccc;
    font-size: 20px;
    cursor: pointer;
  }
  
  .feedback-content {
    padding: 20px;
    color: #fff;
  }
  
  .message {
    font-size: 14px;
    color: #aaa;
    margin-bottom: 20px;
  }
  
  .problem-type label,
  .feedback-content label,
  .image-upload-section label,
  .contact-section label {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    color: #fff;
  }
  
  .problem-buttons {
    display: flex;
    gap: 10px;
  }
  
  .problem-buttons button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #2a2c3e;
    color: #aaa;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .problem-buttons button.active {
    background-color: #007bff;
    color: #fff;
  }
  
  .feedback-text textarea {
    width: 100%;
    height: 80px;
    border: 1px solid #333;
    background-color: #2a2c3e;
    color: #ddd;
    border-radius: 4px;
    padding: 10px;
  }
  
  .image-upload-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .upload-slot {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2a2c3e;
    border: 1px dashed #555;
    border-radius: 4px;
  }
  
  .upload-slot button {
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
  }
  
  .hint {
    font-size: 12px;
    color: #777;
    margin-top: 5px;
  }
  
  .contact-section input {
    width: 100%;
    padding: 10px;
    border: 1px solid #333;
    background-color: #2a2c3e;
    color: #ddd;
    border-radius: 4px;
  }
  
  .feedback-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #262938;
    border-top: 1px solid #2c2f45;
  }
  
  .record-button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
  }
  
  .action-buttons {
    display: flex;
    gap: 10px;
  }
  
  .cancel-button,
  .submit-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .cancel-button {
    background-color: #444;
    color: #ccc;
  }
  
  .submit-button {
    background-color: #007bff;
    color: #fff;
  }
  </style>
  