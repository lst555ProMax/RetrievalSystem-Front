<template>
  <div v-if="isVisible" class="edit-overlay">
    <div class="edit-content" @click="stop">
      <!-- 头部 -->
      <div class="edit-header">
        <h2>Modification</h2>
        <button class="close-button" @click="close">×</button>
      </div>

      <!-- 表单内容 -->
      <div class="edit-body">
        <form class="form">
          <!-- 昵称 -->
          <div class="form-group">
            <label for="nickname">Nickname</label>
            <input
              type="text"
              id="nickname"
              placeholder="Please edit your nickname"
              v-model="form.nickname"
            />
          </div>

          <!-- 邮箱 -->
          <div class="form-group" prop="email">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Please edit your email"
              v-model="form.email"
              clearable
              maxLength="150"
            />
          </div>

          <!-- 新密码 -->
          <div class="form-group" prop="password">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Please enter your new password"
              v-model="form.password"
            />
          </div>

          <!-- 确认新密码 -->
          <div class="form-group" prop="rePassword">
            <label for="rePassword">Confirm Password</label>
            <input
              type="password"
              id="rePassword"
              placeholder="Please confirm your new password"
              v-model="form.rePassword"
            />
          </div>

          <!-- 用户头像 -->
          <div class="form-group">
            <label>Avatar</label>
            <div class="avatar-upload">
              <input
                type="file"
                id="avatar"
                @change="handleFileChange"
                accept="image/*"
              />
              <img
                v-if="avatarPreview"
                :src="avatarPreview"
                alt="Avatar"
                class="avatar"
              />
            </div>
          </div>

          <!-- 生日 -->
          <div class="form-group">
            <label for="birthday">Birthday</label>
            <input type="date" id="birthday" v-model="form.birthday" />
          </div>

          <!-- 性别选择 -->
          <div class="form-group">
            <label>Gender</label>
            <div class="gender-options">
              <div class="gender-option">
                <label class="gender-option-label">Male</label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  v-model="selectedGender"
                  class="gender-option-input"
                />
              </div>
              <div class="gender-option">
                <label class="gender-option-label">Female</label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  v-model="selectedGender"
                  class="gender-option-input"
                />
              </div>
              <div class="gender-option">
                <label class="gender-option-label">Secret</label>
                <input
                  type="radio"
                  name="gender"
                  value="secret"
                  v-model="selectedGender"
                  class="gender-option-input"
                />
              </div>
            </div>
          </div>

          <!-- 个人简介 -->
          <div class="form-group">
            <label for="bio">Personal Introduction</label>
            <textarea
              id="bio"
              placeholder="Please edit your personal introduction"
              v-model="form.description"
            ></textarea>
          </div>
        </form>
      </div>

      <!-- 底部按钮 -->
      <div class="edit-footer">
        <button class="cancel-button" @click="close">Close</button>
        <button class="confirm-button" @click="submitForm">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import assert from "assert";
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Verify from "../utils/verify";
import { API_ENDPOINTS } from "../config/apiConfig";

import { getUsername } from "../utils/Auth";
const username = getUsername();

const avatarPreview = ref(null);

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  isVisible: Boolean,
});

const initialFormState = {
  username: username,
  nickname: "",
  email: "",
  password: "",
  rePassword: "",
  birthday: "",
  gender: "secret",
  description: "",
  avatar: null,
};

const form = ref({ ...initialFormState });

/* 检查确认密码是否一致 */
const checkRePassword = (rule, value, callback) => {
  if (value !== formData.value.registerPassword) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
};

const rules = {
  email: [
    { required: true, message: "Please modify your email address" },
    {
      validator: proxy.Verify.email,
      message: "Please enter a valid email address",
    },
  ],
  password: [
    { required: true, message: "Please enter your password" },
    {
      validator: proxy.Verify.password,
      message:
        "Password can only contain numbers, letters, special characters, and should be 8-18 characters long",
    },
  ],
  rePassword: [
    { required: true, message: "Please enter your password again" },
    {
      validator: checkRePassword,
      message: "The two entered passwords do not match",
    },
  ],
};

// 定义性别选择的数据绑定
const selectedGender = ref("secret");

const api = {
  edit: API_ENDPOINTS.edit,
};

// 处理文件选择
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    // 设置文件预览
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target.result;
      localStorage.setItem(`avatar_${username}`, e.target.result);
    };
    reader.readAsDataURL(file);
    form.avatar = file; // 保存文件到 form 对象
  }
};

let url = api.edit;

const token = localStorage.getItem("jwtToken");
// 提交表单的方法
const submitForm = async () => {
  // 更新 form 对象中的性别值
  form.value.gender = selectedGender.value;

  // 使用 FormData 构造表单数据
  const formData = new FormData();
  formData.append("username", form.value.username);
  formData.append("nickname", form.value.nickname);
  formData.append("email", form.value.email);
  formData.append("password", form.value.password);
  formData.append("gender", form.value.gender);
  formData.append("description", form.value.description);
  formData.append("birthday", form.value.birthday);

  // 如果有头像上传，添加头像到 formData
  if (form.avatar) {
    formData.append("avatar", form.avatar);
  }

  // 如果有头像上传，添加头像到 formData
  if (form.value.avatar) {
    formData.append("avatar", form.value.avatar);
  }

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
      alert("Modification successful");
      emit("update:isVisible", false);
      avatarPreview.value = null;
      resetForm();
    } else {
    }
  } catch (error) {
    alert("Request failed", error);
  }
};

const emit = defineEmits(["update:isVisible"]);

const close = () => {
  emit("update:isVisible", false);
  avatarPreview.value = null; // 清除图片预览
  resetForm();
};

// 重置表单函数
const resetForm = () => {
  form.value = { ...initialFormState };
  avatarPreview.value = null; // Clear avatar preview
  selectedGender.value = "secret"; // Reset gender selection
};
</script>

<style scoped>
.edit-overlay {
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

.edit-content {
  background-color: rgba(26, 28, 45, 0.35);
  border-radius: 20px;
  width: 400px;
  padding: 20px 30px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  height: 80%;
  border: 1px solid rgba(202, 202, 208, 0.35);
}

.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.edit-header h2 {
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

.edit-body {
  margin-bottom: 20px;
  max-height: 85%;
  overflow-y: scroll;
}

.edit-body::-webkit-scrollbar {
  display: none;
}

.form {

}


.form-group {
  margin-bottom: 15px;
  height: 100%;
}

.form-group label {
  display: block;
  color: #ffffff;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #333;
  border-radius: 10px;
  background-color: #2b2e3e;
  color: #ffffff;
  font-size: 16px;
}

.avatar-upload {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.gender-options {
  display: flex;
  gap: 10px;
  align-items: center;
}

.gender-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.gender-option-label {
  display: flex;
  flex: 6;
}

.gender-option-input {
  display: flex;
  flex: 1;
}

.edit-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-button {
  padding: 8px 16px;
  border: none;
  background-color: #444;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button {
  padding: 8px 16px;
  border: none;
  background-color: #1e90ff;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
}
</style>
