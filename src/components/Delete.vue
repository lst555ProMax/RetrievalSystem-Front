<template>
  <div v-if="isVisible" class="delete-overlay">
    <div class="delete-content" @click="stop">
      <!-- 头部 -->
      <div class="delete-header">
        <h2>Cancel your account</h2>
        <button class="close-button" @click="close">×</button>
      </div>

      <!-- 表单内容 -->
      <div class="delete-body">
        <form>
          <!-- 用户名 -->
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" :placeholder="username" disabled />
          </div>

          <!-- 密码 -->
          <div class="form-group">
            <label for="password">Password *</label>
            <input
              type="password"
              id="password"
              placeholder="Please enter your password"
              v-model="form.password"
              required
            />
          </div>

          <!-- 注销原因 -->
          <div class="form-group">
            <label for="reason">Reason for logging-out</label>
            <textarea
              id="reason"
              placeholder="Please enter a reason for cancellation (optional)"
              v-model="form.reason"
            ></textarea>
          </div>

          <!-- 账号注销协议 -->
          <div class="form-group">
            <label>Account Cancellation Notice</label>
            <div class="agreement-text">
              <p>
                After you cancel your account, all your data will be permanently
                deleted and cannot be recovered. Please make sure that you have
                backed up all the data you need. If you continue to use the
                service, you need to register a new account. The logout process
                is irreversible, please be cautious.
              </p>
            </div>
            <div class="agreement-check">
              <label for="agreement" class="agreement-label"
                >I understand and agree</label
              >
              <input
                type="checkbox"
                id="agreement"
                v-model="form.agreement"
                class="agreement-input"
              />
            </div>
          </div>
        </form>
      </div>

      <!-- 底部按钮 -->
      <div class="delete-footer">
        <button class="cancel-button" @click="close">Cancel</button>
        <button class="confirm-button" @click="Delete">Sure</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";
import { getUsername } from "../utils/Auth";
import { API_ENDPOINTS } from "../config/apiConfig";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// 定义组件的属性
const props = defineProps({
  isVisible: Boolean,
});

const username = getUsername();

const emit = defineEmits(["update:isVisible"]);

const form = ref({
  password: "",
  reason: "",
  agreement: false,
});

// API 接口配置
const api = {
  delete: API_ENDPOINTS.delete,
};

let url = api.delete;

// 从 localStorage 获取 JWT token
const token = localStorage.getItem("jwtToken");

// 执行删除操作
const Delete = async () => {
  if (!form.value.password) {
    alert("Please enter your password");
    return;
  }
  if (!form.value.agreement) {
    alert("Please check the box to agree to the agreement");
    return;
  }

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", form.value.password);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();
  if (result.code === 0) {
    alert("The logout is successful");
    router.push("/");
  } else {
    alert("Logout failed");
  }
};

// 关闭弹窗
const close = () => {
  emit("update:isVisible", false);
};
</script>

<style scoped>
/* 背景遮罩层 */
.delete-overlay {
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

/* 弹窗内容 */
.delete-content {
  background-color: rgba(26, 28, 45, 0.35);
  border-radius: 20px;
  width: 450px;
  padding: 20px 30px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  height: 80%;
  border: 1px solid rgba(202, 202, 208, 0.35);
  display: flex;/*  */
  flex-direction: column;/*  */
}

/* 弹窗头部 */
.delete-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.delete-header h2 {
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

.delete-body {
  flex: 1; 
  overflow-y: auto; 
}

/* 表单组 */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  color: #ffffff;
  margin-bottom: 10px;
  margin-top:10px;
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

/* 协议文本 */
.agreement-text {
  width: 100%;
  padding: 8px;
  border: 1px solid #333;
  border-radius: 10px;
  background-color: #2b2e3e;
  color: #ffffff;
  font-size: 16px;
}

/* 协议勾选框 */
.agreement-check {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 5px;
  color: #ffffff;
  width: 80%;
  height: 10%;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-left: 5px;
}

.agreement-label {
  display: flex;
  flex: 2;
}

.agreement-input {
  display: flex;
  flex: 1;
}

/* 底部按钮 */
.delete-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;/*  */
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
