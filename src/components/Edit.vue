<template>
  <div v-if="isVisible" class="edit-overlay">
    <div class="edit-content" @click="stop">
      <!-- 头部 -->
      <div class="edit-header">
        <h2>资料修改</h2>
        <button class="close-button" @click="close">×</button>
      </div>

      <!-- 表单内容 -->
      <div class="edit-body">
        <form>
          <!-- 用户名 -->
          <!--           <div class="form-group1">
            <label for="username">用户名 *</label>
            <input type="text" id="username" placeholder="请修改用户名" />
          </div>
 -->
          <!-- 昵称 -->
          <div class="form-group">
            <label for="nickname">昵称</label>
            <input
              type="text"
              id="nickname"
              placeholder="请修改昵称"
              v-model="form.nickname"
            />
          </div>

          <!-- 邮箱 -->
          <div class="form-group" prop="email">
            <label for="email">邮箱</label>
            <input
              type="email"
              id="email"
              placeholder="请修改邮箱"
              v-model="form.email"
              clearable
              maxLength="150"
            />                      
          </div>



          <!-- 新密码 -->
          <div class="form-group" prop="password">
            <label for="password">密码</label>
            <input
              type="password"
              id="password"
              placeholder="请修改密码"
              v-model="form.password"
            />
          </div>

          <!-- 确认新密码 -->
          <div class="form-group" prop="rePassword">
            <label for="rePassword">确认新密码</label>
            <input
              type="password"
              id="rePassword"
              placeholder="请确认新密码"
              v-model="form.rePassword"
            />
          </div>

          <!-- 用户头像 -->
          <!--           <div class="form-group">
            <label>用户头像</label>
            <div class="avatar-upload">
              <div class="upload-area">点击上传或拖拽图片到此处</div>
            </div>
          </div> -->
          <div class="form-group">
            <label>用户头像</label>
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
                alt="用户头像"
                class="avatar"
              />
            </div>
          </div>

          <!-- 生日 -->
          <div class="form-group">
            <label for="birthday">生日</label>
            <input type="date" id="birthday" v-model="form.birthday" />
          </div>

          <!-- 性别选择 -->
          <div class="form-group">
            <label>性别</label>
            <div class="gender-options">
              <div class="gender-option">
                <label class="gender-option-label">男</label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  v-model="selectedGender"
                  class="gender-option-input"
                />
              </div>
              <div class="gender-option">
                <label class="gender-option-label">女</label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  v-model="selectedGender"
                  class="gender-option-input"
                />
              </div>
              <div class="gender-option">
                <label class="gender-option-label">保密</label>
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
            <label for="bio">个人简介</label>
            <textarea
              id="bio"
              placeholder="请修改个人简介"
              v-model="form.description"
            ></textarea>
          </div>
        </form>
      </div>

      <!-- 底部按钮 -->
      <div class="edit-footer">
        <button class="cancel-button" @click="close">取消</button>
        <button class="confirm-button" @click="submitForm">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import assert from "assert";
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Verify from "../utils/verify"
import { API_ENDPOINTS } from "../config/apiConfig";

import { useUserStore } from "../stores/userStore"; // 引入 Store

const userStore = useUserStore(); // 使用 Store

// 从 Store 中获取 username
const { username } = userStore;

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  isVisible: Boolean,
});

const form = ref({
  username: username,
  nickname: "",
  email: "",
  password: "",
  rePassword: "",
  birthday: "",
  gender: "secret",
  description: "",
});

/* 检查密码的再次修改 */
const checkRePassword = (rule, value, callback) => {
  if (value !== formData.value.registerPassword) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
};

const rules = {
  email: [
    { required: true, message: "请修改邮箱" },
    { validator: proxy.Verify.email, message: "请输入正确的邮箱" },
  ],
  password: [
    { required: true, message: "请输入密码" },
    {
      validator: proxy.Verify.password,
      message: "密码只能是数字，字母，特殊字符 8-18位",
    },
  ],
  rePassword: [
    { required: true, message: "请再次输入密码" },
    {
      validator: checkRePassword,
      message: "两次输入的密码不一致",
    },
  ],
};



// 定义性别选择的数据绑定
const selectedGender = ref("secret");

const api = {
  edit: API_ENDPOINTS.edit,
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
    if (result.code=== 0) {
      alert("修改成功");
      emit("update:isVisible", false);
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
  background-color: #1a1c2d;
  border-radius: 8px;
  width: 400px;
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  overflow-y: auto; 
  height: 80%;
}

.edit-content::-webkit-scrollbar {
  display: none;
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
}


.form-group {
  margin-bottom: 15px;
  height:100%;
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
  border-radius: 4px;
  background-color: #2b2e3e;
  color: #ffffff;
}

.avatar-upload {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.gender-options {
  display: flex;
  gap: 10px;
  align-items: center;
  /*   justify-content: center; */
}

.gender-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;;
}

.gender-option-label{
display: flex;
flex:6;
}

.gender-option-input{
  display: flex;
flex:1;
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
<!-- #2c2e3d -->
