<template>
  <div v-if="isVisible" class="edit-overlay" >
    <div class="edit-content" @click="stop">
      <!-- 头部 -->
      <div class="edit-header">
        <h2>个人资料</h2>
        <button class="close-button" @click="close">×</button>
      </div>

      <!-- 表单内容 -->
      <div class="edit-body">
        <form>
          <!-- 用户名 -->
          <div class="form-group">
            <label for="username">用户名 *</label>
            <input type="text" id="username" placeholder="请输入用户名" />
          </div>

          <!-- 用户头像 -->
          <div class="form-group">
            <label>用户头像</label>
            <div class="avatar-upload">
              <!-- <img src="default-avatar.png" alt="用户头像" class="avatar" /> -->
              <div class="upload-area">点击上传或拖拽图片到此处</div>
            </div>
          </div>

          <!-- 生日 -->
          <div class="form-group">
            <label for="birthday">生日</label>
            <input type="date" id="birthday" />
          </div>

          <!-- 性别选择 -->
          <div class="form-group">
            <label>性别</label>
            <div class="gender-options">
              <label
                ><input type="radio" name="gender" value="male" /> 男</label
              >
              <label
                ><input type="radio" name="gender" value="female" /> 女</label
              >
              <label
                ><input type="radio" name="gender" value="secret" checked />
                保密</label
              >
            </div>
          </div>

          <!-- 个人简介 -->
          <div class="form-group">
            <label for="bio">个人简介</label>
            <textarea id="bio" placeholder="请输入个人简介"></textarea>
          </div>
        </form>
      </div>

      <!-- 底部按钮 -->
      <div class="edit-footer">
        <button class="cancel-button" @click="close">取消</button>
        <button class="confirm-button">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isVisible: Boolean,
});

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

.form-group {
  margin-bottom: 15px;
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
