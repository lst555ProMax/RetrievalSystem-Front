<template>
    <div class="container">
      <!-- 展示 img1 图片 -->
      <img :src="image" alt="Example Image" class="displayed-image" @click="uploadImageFromFile" />
  
      <!-- 文件上传输入框 -->
      <input type="file" accept="image/*" @change="onFileChange" class="upload-input" />
  
      <!-- 消息展示区域 -->
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <p>{{ message.text }}</p>
          <img v-if="message.imageUrl" :src="message.imageUrl" alt="Uploaded Image" class="uploaded-image" />
          <span>{{ message.time }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import img1 from "../assets/image_example/1.jpg";
  
  // 引入图片并初始化
  const image = ref(img1);
  const messages = ref([]);
  
  // 将 img1 转换为 Blob 并再转换为 File 对象的辅助函数
  const convertToFile = async (imageSrc) => {
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    return new File([blob], "1.jpg", { type: "image/jpeg" });
  };
  
  // 上传按钮更改事件处理
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      addMessage("用户上传了一张图片。", imageUrl);
    } else {
      alert("请选择图片文件！");
    }
  };
  
  // 点击 img1 图片进行上传
  const uploadImageFromFile = async () => {
    const file = await convertToFile(img1);
    const imageUrl = URL.createObjectURL(file);
    addMessage("用户上传了一张示例图片。", imageUrl);
  };
  
  // 添加消息到列表
  const addMessage = (text, imageUrl) => {
    const currentTime = new Date().toLocaleTimeString();
    messages.value.push({
      text,
      time: currentTime,
      imageUrl,
    });
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .displayed-image {
    max-width: 200px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .upload-input {
    margin-bottom: 20px;
  }
  
  .messages {
    max-width: 300px;
    border: 1px solid #ccc;
    padding: 10px;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  .uploaded-image {
    max-width: 100px;
    margin-top: 5px;
  }
  </style>
  