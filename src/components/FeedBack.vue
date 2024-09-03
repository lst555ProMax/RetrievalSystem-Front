<template>
  <div v-if="isVisible" class="feedback-overlay">
    <div class="feedback-container">
      <header class="feedback-header">
        <h2>意见反馈</h2>
        <button class="close-button" @click="close">×</button>
      </header>
      <div class="feedback-content">
        <p class="message">
          您好，很抱歉我们无法为您提供完备的服务，如需帮助请留言，我们将尽快联系并解决您的问题！
        </p>

        <!-- Problem Type Section -->
        <div class="problem-type">
          <label>问题类型 *</label>
          <div class="problem-buttons">
            <button :class="{ active: selectedType === 'member' }" @click="selectType('member')">会员问题</button>
            <button :class="{ active: selectedType === 'product' }" @click="selectType('product')">产品建议</button>
            <button :class="{ active: selectedType === 'consult' }" @click="selectType('consult')">我要咨询</button>
            <button :class="{ active: selectedType === 'other' }" @click="selectType('other')">其他问题</button>
          </div>
        </div>

        <!-- Feedback Content Section -->
        <div class="feedback-text">
          <label>反馈内容 *</label>
          <textarea v-model="feedbackContent" placeholder="请填写您的具体描述"></textarea>
        </div>

        <!-- Image Upload Section -->
        <div class="image-upload-section">
          <label>上传图片</label>
          <div class="image-upload-container">
<!--             <div v-for="(image, index) in uploadedImages" :key="index" class="upload-slot">
              <img v-if="image.url" :src="image.url" alt="上传的图片" class="uploaded-image"/>
              <button v-if="!image.url" @click="triggerFileInput(index)">+ 上传图片</button>
              <input type="file" accept="image/*" ref="fileInputs" :key="index" @change="handleFileChange($event, index)" hidden />
            </div> -->
            <div v-for="(image, index) in images" :key="index" class="upload-slot">
        <img v-if="image.url" :src="image.url" alt="上传的图片" @click="removeImage(index)" />
        <button v-else @click="uploadImage(index)">+ 上传图片</button>
      </div>
          </div>
          <p class="hint">温馨提示：支持jpg, png, gif, bmg格式的图片，可上传5张，单张最大2M</p>
        </div>

        <!-- Contact Section -->
        <div class="contact-section">
          <label>联系方式</label>
          <input type="text" v-model="contactInfo" placeholder="请填写您的手机号" />
        </div>
      </div>

      <!-- Footer Buttons -->
      <footer class="feedback-footer">
        <button class="feedback-count">反馈次数: {{ feedbackCount }}</button>
        <div class="action-buttons">
          <button class="cancel-button" @click="close">取消</button>
          <button class="submit-button" @click="submitFeedback">提交</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted} from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["update:isVisible"]);

onMounted(() => {
  const storedCount = localStorage.getItem('feedbackCount');
  if (storedCount) {
    feedbackCount.value = parseInt(storedCount, 10);
  }
});

const feedbackCount = ref(0); // 初始化反馈次数为0

const selectedType = ref("member");
const feedbackContent = ref("");
const contactInfo = ref("");
/* const uploadedImages = ref(Array(5).fill({ url: null })); // 存储上传的图片 */
// 上传图片函数，参数index用于标识上传的是第几个框的图片
const uploadImage = (index) => {
  // 选择文件上传
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
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
  images.value[index].url = ''; // 清空图片URL
};

const close = () => {
  emit("update:isVisible", false);
};

const images = ref([
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' },
  { url: '' }
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
    alert("图片大小不能超过2M");
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
  edit: "http://172.20.10.7:8000/user/feedback",
};

let url = api.edit;
// 提交反馈
async function submitFeedback() {
  // 构建表单数据
  const formData = new FormData();
  formData.append("type", selectedType.value);
  formData.append("content", feedbackContent.value);
  formData.append("contact", contactInfo.value);

  // 附加上传的图片
  uploadedImages.value.forEach((image, i) => {
    if (image.url) {
      formData.append(`image_${i}`, dataURLtoFile(image.url, `upload_${i}.png`)); // 将base64转为文件对象
    }
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("提交失败");

    const result = await response.json();
    // 更新反馈次数
  feedbackCount.value += 1;
  localStorage.setItem('feedbackCount', feedbackCount.value);
    alert("提交成功！");
    close();
  } catch (error) {
    console.error("提交失败", error);
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

  .problem-type ,
  .feedback-content,
  .image-upload-section,
  .contact-section 
  .feedback-text
  .feedback-footer{
margin-bottom:10px;
  }

  .feedback-count {
  font-size: 14px;
  color: #fff;
  background-color: #2a2c3d;
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
  overflow: hidden;
  position: relative;
}

.upload-slot img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
    padding:15px 20px;
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