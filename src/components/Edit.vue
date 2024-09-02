<template>
  <div v-if="isVisible" class="edit-overlay">
    <div class="edit-content" @click="stop">
      <!-- 头部 -->
      <div class="edit-header">
        <h2>您好，请您修改您的资料</h2>
        <button class="close-button" @click="close">×</button>
      </div>

      <!-- 表单内容 -->
      <div class="edit-body">
        <form>
          <!-- 用户名 -->
          <!--           <div class="form-group1">
            <label for="username">用户名 *</label>
            <input type="text" id="username" placeholder="请输入用户名" />
          </div>
 -->
          <!-- 昵称 -->
          <div class="form-group">
            <label for="nickname">昵称</label>
            <input
              type="text"
              id="nickname"
              placeholder="请输入昵称"
              v-model="form.nickname"
            />
          </div>

          <!-- 邮箱 -->
          <div class="form-group">
            <label for="email">邮箱 *</label>
            <input
              type="email"
              id="email"
              placeholder="请输入邮箱"
              v-model="form.email"
            />
          </div>

          <!-- 密码 -->
          <div class="form-group">
            <label for="password">密码 *</label>
            <input
              type="password"
              id="password"
              placeholder="请输入密码"
              v-model="form.password"
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
              <div class="upload-area" v-if="!avatarPreview">
                点击上传或拖拽图片到此处
              </div>
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
                <label>男</label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  v-model="selectedGender"
                />
              </div>
              <div class="gender-option">
                <label>女</label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  v-model="selectedGender"
                />
              </div>
              <div class="gender-option">
                <label>保密</label>
                <input
                  type="radio"
                  name="gender"
                  value="secret"
                  v-model="selectedGender"
                  checked
                />
              </div>
            </div>
          </div>

          <!-- 个人简介 -->
          <div class="form-group">
            <label for="bio">个人简介</label>
            <textarea
              id="bio"
              placeholder="请输入个人简介"
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

import { useUserStore } from '../stores/userStore'; // 引入 Store

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
  username:username,
  nickname: "",
  email: "",
  password: "",
  birthday: "",
  gender: "secret",
  description: "",
});

// 定义性别选择的数据绑定
const selectedGender = ref("secret");

const api = {
  edit: "http://172.20.10.7:8000/user/edit",
};

let url = api.edit;

// 使用 URLSearchParams 来格式化参数，确保后端可以用 request.form 接收
const urlEncodedParams = new URLSearchParams(form.value);
// 提交表单的方法
const submitForm = async () => {
  // 更新 form 对象中的性别值
  form.value.gender = selectedGender.value;

  // 使用 URLSearchParams 来格式化参数，确保后端可以用 request.form 接收
const urlEncodedParams = new URLSearchParams(form.value);

  //发送请求到后端
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedParams.toString(),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("修改成功", result);
      console.log(urlEncodedParams.toString());
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
  width: 500px;
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
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

.form-groups {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 20px;
}

.form-group1 {
  display: flex;
  flex: 1;
  margin-bottom: 15px;
  /* width:100%; */
}

.form-group {
  margin-bottom: 15px;
}

.form-group1 label {
  display: flex;
  color: #ffffff;
  margin-bottom: 5px;
  flex: 1;
  font-size: 13px;
  justify-content: left;
  align-items: center;
}

.form-group1 input,
.form-group1 textarea {
  display: flex;
  width: 100%;
  padding: 8px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2b2e3e;
  color: #ffffff;
  flex: 3;
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

.upload-area {
  flex: 1;
  height: 50px;
  border: 1px dashed #555;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  cursor: pointer;
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
}

.gender-options label {
  color: #ffffff;
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
