<template>
  <div v-if="isVisible" class="delete-overlay">
    <div class="delete-content" @click="stop">
      <!-- 头部 -->
      <div class="delete-header">
        <h2>注销账号</h2>
        <button class="close-button" @click="close">×</button>
      </div>

      <!-- 表单内容 -->
      <div class="delete-body">
        <form>
          <!-- 用户名 -->
          <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" id="username" :value="form.username" :placeholder="username" disabled />
          </div>

          <!-- 密码 -->
          <div class="form-group">
            <label for="password">密码 *</label>
            <input
              type="password"
              id="password"
              placeholder="请输入密码"
              v-model="form.password"
              required
            />
          </div>

          <!-- 注销原因 -->
          <div class="form-group">
            <label for="reason">注销原因</label>
            <textarea
              id="reason"
              placeholder="请输入注销原因（选填）"
              v-model="form.reason"
            ></textarea>
          </div>

          <!-- 账号注销协议 -->
          <div class="form-group">
            <label>账号注销须知</label>
            <div class="agreement-text">
              <p>
                注销账号后，您的所有数据将被永久删除且无法恢复。请确保您已备份所需的所有数据。如您继续使用服务需重新注册新账号。注销过程不可逆，请您谨慎操作。
              </p>
            </div>
            <div class="agreement-check">
              <label for="agreement" class="agreement-label">我已了解并同意</label>
              <input type="checkbox" id="agreement" v-model="form.agreement" class="agreement-input"/>
            </div>
          </div>
        </form>
      </div>

      <!-- 底部按钮 -->
      <div class="delete-footer">
        <button class="cancel-button" @click="close">取消</button>
        <button class="confirm-button" @click="Delete">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";
/* import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const { username } = userStore; */

/* import { usePasswordStore } from "../stores/passwordStore";

const passwordStore = usePasswordStore();
const { password } = passwordStore; */

const username =ref("lst555");


const props = defineProps({
  isVisible: Boolean,
});

const emit=defineEmits(["update:isVisible"]);

const form = ref({
  username: username, // 从Store中获取用户名
  password: "",
  reason: "",
  agreement: false,
});

const api = {
  delete: "http://172.20.10.7:8000/user/delete",
};

let url = api.delete;

const Delete = async () => {
  // 使用 URLSearchParams 来格式化参数，确保后端可以用 request.form 接收
  const urlEncodedParams = new URLSearchParams(form.value);

  if(!form.value.password){
    alert("请输入密码");
    return;
  }
  if (!form.value.agreement) {
    alert("请勾选同意协议");
    return;
  }
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlEncodedParams.toString(),
  });

  const result = await response.json();
  if (response.ok) {
    console.log("注销成功", result);
    console.log(urlEncodedParams.toString());
    router.push("/");
  } else {
    console.error("注销失败", result.message);
  }
};



const close = () => {
  emit("update:isVisible", false);
};
</script>

<style scoped>
/* 保持样式风格一致 */
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

.delete-content {
  background-color: #1a1c2d;
  border-radius: 8px;
  width: 500px;
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

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

.agreement-text {
  background-color: #2b2e3e;
  padding: 10px;
  border-radius: 4px;
  color: #aaa;
  margin-bottom: 10px;
}

.agreement-check {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 5px;
  color: #ffffff;
  width: 30%;
  height:10%;
}

.agreement-label{
display: flex;
flex:4;
}

.agreement-input{
display: flex;
flex:1;
}

.delete-footer {
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
