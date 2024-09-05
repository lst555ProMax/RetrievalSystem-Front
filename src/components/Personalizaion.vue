<template>
  <div v-if="isVisible" class="personal-overlay">
    <div class="personal-content" @click="stop">
      <!-- 头部 -->
      <div class="personal-header">
        <h2>个性化设置</h2>
        <button class="close-button" @click="close">×</button>
      </div>

      <!-- 表单内容 -->
      <div class="personal-body">
        <form class="form">
          <!-- 主题 -->
          <div class="form-group">
            <label for="theme">主题</label>
            <select id="theme" v-model="form.theme">
              <option value="Slider">Slider</option>
              <option value="Neural">Neural</option>
              <option value="CrossStar">CrossStar</option>
            </select>
          </div>

          <!-- 字体样式 -->
          <div class="form-group">
            <label for="font">字体样式</label>
            <select id="font" v-model="form.font">
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>

          <!-- 图片上传 -->
          <div class="form-group">
            <label>图片上传</label>
            <div class="image-upload">
              <input type="file" id="imgUrl" @change="handleFileChange" accept="image/*" />
              <img v-if="avatarPreview" :src="avatarPreview" alt="预览图片" class="preview-image" />
            </div>
          </div>
        </form>
      </div>

      <!-- 底部按钮 -->
      <div class="personal-footer">
        <button class="cancel-button" @click="close">取消</button>
        <button class="confirm-button" @click="submitForm">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { API_ENDPOINTS } from "../config/apiConfig";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const avatarPreview = ref(null);
const { username } = userStore;
const { proxy } = getCurrentInstance();

const props = defineProps({
  isVisible: Boolean,
});

const form = ref({
  theme: "Slider",
  font: "Arial",
  imgUrl:null ,
});

const api = {
  personal: API_ENDPOINTS.personal,
};

let url = api.personal;

// 处理文件选择
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
    form.imgUrl = file; // 保存文件到 form 对象
  }
};

const token = localStorage.getItem("jwtToken");
// 提交表单的方法
const submitForm = async () => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("theme", form.value.theme);
  formData.append("font", form.value.font);

    // 如果有头像上传，添加头像到 formData
    if (form.avatar) {
    formData.append("imgUrl", form.imgUrl);
  }

   // 如果有头像上传，添加头像到 formData
  if (form.value.avatar) {
    formData.append("imgUrl", form.value.imgUrl);
  }

  console.log("filenane="+formData.get('imgUrl'));

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    if (result.code === 0) {
      alert("修改成功");
      emit("update:isVisible", false);
      avatarPreview.value = null;
    } else {
      console.error("修改失败", result.message);
    }
  } catch (error) {
    console.error("请求失败", error);
  }
};

const emit = defineEmits(["update:isVisible"]);

const close = () => {
  emit("update:isVisible", false);
  avatarPreview.value = null;
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
  width: 400px;
  padding: 20px 30px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  height: 50%;
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
  overflow: scroll;
  max-height: 230px;
}
.personal-body::-webkit-scrollbar {
  display: none;
}
.form{

}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  color: #ffffff;
  margin-bottom: 5px;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #333;
  border-radius: 10px;
  background-color: #2b2e3e;
  color: #ffffff;
}

.image-upload {
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview-image {
  width: 100px; 
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
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
