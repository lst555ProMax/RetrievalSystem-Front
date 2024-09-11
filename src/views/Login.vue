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
            <!-- 具名插槽用法，这里的template是用来插入自定义组件的 -->
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
import { useUserStore } from "../stores/userStore"; // 引入 Store
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

/* onMounted生命周期钩子函数   用于在组件完成挂载之后完成一些初始化的操作 */
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
  rememberMe: false, // Remember me 选项
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

    //登录
    if (opType.value == 1) {
      const cookieLoginInfo = proxy.VueCookies.get("loginInfo");
      if (cookieLoginInfo) {
        formData.value = cookieLoginInfo;
      }
    }
  });
};

const userStore = useUserStore(); // 使用 Store

// 发射用户名的函数
const emitUsername = () => {
  if (formData.value.username) {
    userStore.setUsername(formData.value.username); // 更新 Store 中的 username
    console.log("Username has been updated to:", userStore.username);
  } else {
    console.error("Username is empty, unable to submit!");
  }
};

//登录、注册、重置密码  提交表单
const doSubmit = async () => {
  // 表单验证
  formDataRef.value.validate(async (valid) => {
    if (!valid) return;

    let params = {};
    // 将 form.data 的所有值都赋给 params 对象
    Object.assign(params, formData.value);
    console.log(params)
    // 处理注册或登录操作
    if (opType.value === 0 || opType.value === 1) {
      handleRegisterOrLogin(params);
    } else if (opType.value === 2) {
      // 处理重置密码操作
      handleResetPassword(params);
    }
  });
};

// 处理注册或登录
const handleRegisterOrLogin = async (params) => {
  let url = null;

  // 注册
  if (opType.value === 0) {
    params.password = params.registerPassword;
    delete params.registerPassword;
    delete params.reRegisterPassword;
    url = api.register;
  }

  // 登录
  if (opType.value === 1) {
    url = api.login;
    let cookieLoginInfo = proxy.VueCookies.get("loginInfo");
  }

  // 使用 URLSearchParams 来格式化参数，确保后端可以用 request.form 接收
  const urlEncodedParams = new URLSearchParams(params);

  try {
    // 发送请求
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // 确保内容类型为表单数据
      },
      body: urlEncodedParams.toString(), // 传递参数
    });

    // 解析响应
    const response = await result.json();
    data.value = response; // 更新数据

    // 输出消息
    console.log(response.message);

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
    // 存储 JWT 令牌
    localStorage.setItem("jwtToken", response.access_token); // 假设 token 是返回的 JWT 令牌字段名
    alert("Operation successful");
    if (response.data.permission_level === 1) {
      router.push("/framework");
    } else if (response.data.permission_level === 0) {
      router.push("/userManagement");
    }

    emitUsername();
    saveUsername(params.username);

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
      body: formData2, // 使用 FormData 作为请求体
    });

    const result = await response.json();
    if (result.code === 0) {
      alert("Password changed successfully!");
      opType.value = 1;
      resetForm();
    } else {
      console.error("Modification failed", result.message);
    }
  } catch (error) {
    console.error("Request failed", error);
  }
};

</script>

<style lang="scss" scoped>
/* 登录框 */
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

/* 登录注册 */
.login-register {
  padding: 25px;
  background-color: rgba(26, 28, 45, 0.35);
  border: 1px solid rgba(202, 202, 208, 0.35);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

.form-item{
  border: 1px solid #333;
  border-radius: 10px;
  background-color: #2b2e3e;
  color: #ffffff;
}



/* 标题 */
.login-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 40px;
}

.login-title i {
  margin-right: 10px;
}

/* 记住我选项 */
.rememberme-panel {
  width: 100%;
}

/* 忘记密码？没有账号？*/
.no-account {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

/* 确定按钮 */
.op-btn {
  width: 100%;
}

.button-panel {
  display: flex;
  justify-content: space-between; /* 在主轴上分配空间 */
  width: 100%; /* 设置宽度为100%以填满父容器 */
  height: fit-content; /* 高度自适应内容 */
  padding: 20px; /* 可选：为按钮面板添加内边距 */
}

.reco-panel,
.help-panel {
  display: flex;
  align-items: center; /* 使按钮在交叉轴上居中对齐 */
}

.button-panel-2 {
  display: flex;
  justify-content: space-between; /* 在主轴上分配空间 */
  width: 100%; /* 设置宽度为100%以填满父容器 */
  height: fit-content; /* 高度自适应内容 */
  padding: 20px; /* 可选：为按钮面板添加内边距 */
}

.admin-panel,
.fast-panel {
  display: flex;
  align-items: center; /* 使按钮在交叉轴上居中对齐 */
}

/* 图片验证码 */
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
