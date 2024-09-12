<template>
  <div class="body">
    <BackgroundAnimation />
    <div class="login-panel">
      <el-form
        class="login-register"
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        @submit.prevent
      >
        <div class="login-title">
          <i class="fa-solid fa-kiwi-bird fa-lg" style="color: #cf8b2a"></i>
          Retrieval System
        </div>

        <!-- 用户名 -->
        <el-form-item prop="username" class="form-item">
          <el-input
            size="large"
            clearable
            placeholder="Please enter your username"
            v-model="formData.username"
            maxlength="20"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>

        <!--input输入-->
        <el-form-item prop="email" v-if="opType == 0" class="form-item">
          <el-input
            size="large"
            clearable
            placeholder="Please enter your email"
            v-model.trim="formData.email"
            maxLength="150"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>

        <!-- 登录密码 -->
        <el-form-item prop="password" v-if="opType == 1" class="form-item">
          <el-input
            type="password"
            size="large"
            placeholder="Please enter your password"
            v-model="formData.password"
            show-password
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>

        <!-- 注册或忘记密码 -->
        <div v-if="opType == 0 || opType == 2">
          <!-- 昵称 -->
          <el-form-item prop="nickname" v-if="opType == 0" class="form-item">
            <el-input
              size="large"
              clearable
              placeholder="Please enter your nickname"
              v-model="formData.nickname"
              maxlength="20"
              class="custom-input"
            >
              <template #prefix>
                <span class="iconfont icon-account"></span>
              </template>
            </el-input>
          </el-form-item>

          <!-- 输入密码 -->
          <el-form-item prop="registerPassword" class="form-item">
            <el-input
              type="password"
              size="large"
              placeholder="Please enter your password"
              v-model="formData.registerPassword"
              show-password
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>

          <!-- 重新输入密码 -->
          <el-form-item prop="reRegisterPassword" class="form-item">
            <el-input
              type="password"
              size="large"
              placeholder="Please re-enter your password"
              v-model="formData.reRegisterPassword"
              show-password
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
        </div>

        <!-- 跳转链接 -->
        <el-form-item v-if="opType == 1">
          <div class="rememberme-panel">
            <el-checkbox v-model="formData.rememberMe">Remember me</el-checkbox>
          </div>
          <div class="no-account">
            <a href="javascript:void(0)" class="a-link" @click="showPanel(2)">
              Forgot your password?</a
            >
            <a href="javascript:void(0)" class="a-link" @click="showPanel(0)">
              No account?
            </a>
          </div>
        </el-form-item>
        <el-form-item v-if="opType == 0">
          <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">
            Already have an account?</a
          >
        </el-form-item>
        <el-form-item v-if="opType == 2">
          <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">
            Go to login?
          </a>
        </el-form-item>

        <!-- 确定按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            class="op-btn"
            @click="doSubmit"
            size="large"
          >
            <span v-if="opType == 0">Register</span>
            <span v-if="opType == 1">Login</span>
            <span v-if="opType == 2">Reset the password</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";
import BackgroundAnimation from "../components/BackgroundAnimation.vue";
import { useUserStore } from "../stores/userStore";
import { saveUsername } from "../utils/Auth";
import { API_ENDPOINTS } from "../config/apiConfig";

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const data = ref("");
const api = {
  register: API_ENDPOINTS.register,
  login: API_ENDPOINTS.login,
  resetPwd: API_ENDPOINTS.resetPwd,
};

//0:注册 1:登录 2:重置密码
const opType = ref();
const showPanel = (type) => {
  opType.value = type;
  resetForm();
};

onMounted(() => {
  showPanel(1);
});

//登录，注册 弹出配置   reactive响应式对象
const dialogConfig = reactive({
  show: false,
  title: "title",
});

/* 检查密码的再次输入 */
const checkRePassword = (rule, value, callback) => {
  if (value !== formData.value.registerPassword) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
};

const formData = ref({
  username: "",
  password: "",
  rememberMe: false,
});
const formDataRef = ref();

/* 检查各种输入的规则 */
const rules = {
  email: [
    { required: true, message: "Please enter your email" },
    { validator: proxy.Verify.email, message: "Please enter a valid email" },
  ],
  password: [{ required: true, message: "Please enter your password" }],
  username: [{ required: true, message: "Please enter your username" }],
  registerPassword: [
    { required: true, message: "Please enter your password" },
    {
      validator: proxy.Verify.password,
      message:
        "Password can only be numbers, letters, special characters, 8-18 characters",
    },
  ],
  reRegisterPassword: [
    { required: true, message: "Please re-enter your password" },
    {
      validator: checkRePassword,
      message: "The two passwords do not match",
    },
  ],
};

/* 重置表单 */
const resetForm = () => {
  dialogConfig.show = true;
  if (opType.value == 0) {
    dialogConfig.title = "Register";
  } else if (opType.value == 1) {
    dialogConfig.title = "Login";
  } else if (opType.value == 2) {
    dialogConfig.title = "Reset the password";
  }
  nextTick(() => {
    formDataRef.value.resetFields();
    formData.value = {};

    if (opType.value == 1) {
      const cookieLoginInfo = proxy.VueCookies.get("loginInfo");
      if (cookieLoginInfo) {
        formData.value = cookieLoginInfo;
      }
    }
  });
};

const userStore = useUserStore();

// 发射用户名的函数
const emitUsername = () => {
  if (formData.value.username) {
    userStore.setUsername(formData.value.username);
  } else {
    console.error("Username is empty, unable to submit!");
  }
};

//登录、注册、重置密码  提交表单
const doSubmit = async () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) return;

    let params = {};
    Object.assign(params, formData.value);
    if (opType.value === 0 || opType.value === 1) {
      handleRegisterOrLogin(params);
    } else if (opType.value === 2) {
      handleResetPassword(params);
    }
  });
};

const handleRegisterOrLogin = async (params) => {
  let url = null;

  if (opType.value === 0) {
    params.password = params.registerPassword;
    delete params.registerPassword;
    delete params.reRegisterPassword;
    url = api.register;
  }

  if (opType.value === 1) {
    url = api.login;
    let cookieLoginInfo = proxy.VueCookies.get("loginInfo");
  }

  // 使用 URLSearchParams 来格式化参数，确保后端可以用 request.form 接收
  const urlEncodedParams = new URLSearchParams(params);

  try {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedParams.toString(),
    });

    const response = await result.json();
    data.value = response;

    // 处理成功操作
    handleSuccessResponse(response, params);
  } catch (error) {
    console.error("Request failed", error);
    alert("Request failed. Please check your network or try again later");
  }

  // 处理记住登录信息
  if (opType.value === 1) {
    handleRememberLogin(params);
  }
};

// 处理成功响应
const handleSuccessResponse = (response, params) => {
  if (response.code === 0) {
    if (opType.value === 0) {
      alert("Register successfully");
      opType.value = 1;
      resetForm();
    } else {
      // 存储 JWT 令牌
      localStorage.setItem("jwtToken", response.access_token);
      alert("Operation successful");
      if (response.data.permission_level === 1) {
        router.push("/framework");
      } else if (response.data.permission_level === 0) {
        router.push("/userManagement");
      }

      emitUsername();
      saveUsername(params.username);
    }
  } else {
    alert("Operation failed: " + response.message);
  }
};

// 处理记住登录信息
const handleRememberLogin = (params) => {
  if (params.rememberMe) {
    const loginInfo = {
      username: params.username,
      password: params.password,
      rememberMe: params.rememberMe,
    };
    proxy.VueCookies.set("loginInfo", loginInfo, "7d");
  } else {
    proxy.VueCookies.remove("loginInfo");
  }
};

// 处理重置密码
const handleResetPassword = async (params) => {
  const url = api.resetPwd;
  const formData2 = new FormData();
  formData2.append("username", params.username);
  formData2.append("password", params.registerPassword);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData2,
    });

    const result = await response.json();
    if (result.code === 0) {
      alert("Password changed successfully!");
      opType.value = 1;
      resetForm();
    } else {
      alert("Username is incorrect");
    }
  } catch (error) {
    console.error("Request failed", error);
  }
};
</script>

<style lang="scss" scoped>
.body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-panel {
  width: 400px;
  margin: calc((100vh - 500px) / 2) auto;
}

.login-register {
  padding: 25px;
  background-color: rgba(26, 28, 45, 0.35);
  border: 1px solid rgba(202, 202, 208, 0.35);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

.form-item {
  border: 1px solid #333;
  border-radius: 10px;
  background-color: #2b2e3e;
  color: #ffffff;
}

.login-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 40px;
}

.login-title i {
  margin-right: 10px;
}

.rememberme-panel {
  width: 100%;
}

.no-account {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.op-btn {
  width: 100%;
}

.button-panel {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  padding: 20px;
}

.reco-panel,
.help-panel {
  display: flex;
  align-items: center;
}

.button-panel-2 {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  padding: 20px;
}

.admin-panel,
.fast-panel {
  display: flex;
  align-items: center;
}

.check-code-panel {
  width: 100%;
  display: flex;
}

.check-code {
  margin-left: 5px;
  cursor: pointer;
}

.login-btn-qq {
  margin-top: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  cursor: pointer;
  margin-left: 10px;
  width: 20px;
}
</style>
