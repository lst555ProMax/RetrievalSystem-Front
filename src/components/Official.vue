<template>
    <div class="contact-container">
      <div class="qr-section">
        <div class="qr-item" v-for="(item, index) in qrItems" :key="index">
          <img :src="imgs[index]" alt="QR Code" class="qr-image" />
          <p class="qr-label">{{ item.label }}</p>
        </div>
      </div>
      <div class="company-info">
        <p>Team: "图灵不灵" from SEU</p>
        <p>Context: 17314409632  15046948929</p>
        <p>Github: https://github.com/lst555ProMax/RetrievalSystem-Front</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, nextTick, onMounted } from "vue";

  import img1 from "../assets/avatar/lz.png";
  import img2 from "../assets/avatar/xpy.jpg"; 
  import img3 from "../assets/avatar/hzh.jpg";
  import img4 from "../assets/avatar/lst.jpg";

  const imgs = ref([img1,img2,img3,img4]);

  const qrItems = [
    { imgSrc: "../assets/avatar/lz.png", label: 'Zheng Li' },
    { imgSrc: "../assets/avatar/xpy.jpg", label: 'Pengyu Xie ' },
    { imgSrc: "../assets/avatar/hzh.jpg", label: 'Ziheng He ' },
    { imgSrc: "../assets/avatar/lst.jpg", label: 'Shutong Leng ' }
  ];
  </script>
  
  <style scoped>
  .contact-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background:transparent;
    border-radius: 10px;
    color: #ffffff;
  }
  
  .qr-section {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 20px;
  }
  
  .qr-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .qr-image {
    width: 120px;
    height: 120px;
    border: 1px solid #333;
    margin-bottom: 10px;
  }
  
  .qr-label {
    font-size: 14px;
    color: #ccc;
  }
  
  .company-info {
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
  }
  </style>
  