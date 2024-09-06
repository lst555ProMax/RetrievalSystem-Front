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
          <i class="fa-solid fa-y fa-flip fa-2xl" style="color: #ee7a1b"></i
          >图灵不灵
        </div>

        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            size="large"
            clearable
            placeholder="请输入用户名"
            v-model="formData.username"
            maxlength="20"
          >
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>

        <!--input输入-->
        <el-form-item prop="email" v-if="opType == 0">
          <el-input
            size="large"
            clearable
            placeholder="请输入邮箱"
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
        <el-form-item prop="password" v-if="opType == 1">
          <el-input
            type="password"
            size="large"
            placeholder="请输入密码"
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
          <!--           <el-form-item prop="emailCode">
            <div class="send-email-panel">
              <el-input
                size="large"
                placeholder="请输入邮箱验证码"
                v-model="formData.emailCode"
              >
                <template #prefix>
                  <span class="iconfont icon-checkcode"></span>
                </template>
              </el-input>
              <el-button
                class="send-mail-btn"
                type="primary"
                size="large"
                @click="getEmailCode"
                >获取验证码
              </el-button>
            </div>
            <el-popover placement="left" :width="500" trigger="click">
              <div>
                <p>1、在垃圾箱中查找邮箱验证码</p>
                <p>2、在邮箱中头像->设置->反垃圾->白名单->设置邮件地址白名单</p>
                <P>3、将邮箱添加到白名单不知道怎么设置？</P>
              </div>
              <template #reference>
                <span class="a-link" :style="{ 'font-size': '14px' }">
                  未收到邮箱验证码？</span
                >
              </template>
            </el-popover>
          </el-form-item>
 -->

          <!-- 昵称 -->
          <el-form-item prop="nickname" v-if="opType == 0">
            <el-input
              size="large"
              clearable
              placeholder="请输入昵称"
              v-model="formData.nickname"
              maxlength="20"
            >
              <template #prefix>
                <span class="iconfont icon-account"></span>
              </template>
            </el-input>
          </el-form-item>

          <!-- 输入密码 -->
          <el-form-item prop="registerPassword">
            <el-input
              type="password"
              size="large"
              placeholder="请输入密码"
              v-model="formData.registerPassword"
              show-password
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>

          <!-- 重新输入密码 -->
          <el-form-item prop="reRegisterPassword">
            <el-input
              type="password"
              size="large"
              placeholder="请再次输入密码"
              v-model="formData.reRegisterPassword"
              show-password
            >
              <template #prefix>
                <span class="iconfont icon-password"></span>
              </template>
            </el-input>
          </el-form-item>
        </div>

        <!-- 验证码 -->
        <!--         <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <el-input
              size="large"
              placeholder="请输入验证码"
              v-model="formData.checkCode"
              @keyup.enter="doSubmit"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img
              :src="checkCodeUrl"
              class="check-code"
              @click="changeCheckCode(0)"
            />
          </div>
        </el-form-item>
 -->
        <!-- 跳转链接 -->
        <el-form-item v-if="opType == 1">
          <div class="rememberme-panel">
            <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
          </div>
          <div class="no-account">
            <a href="javascript:void(0)" class="a-link" @click="showPanel(2)">
              忘记密码？</a
            >
            <a href="javascript:void(0)" class="a-link" @click="showPanel(0)">
              没有账号?
            </a>
          </div>
        </el-form-item>
        <el-form-item v-if="opType == 0">
          <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">
            已有账号？</a
          >
        </el-form-item>
        <el-form-item v-if="opType == 2">
          <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">
            去登录?
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
            <span v-if="opType == 0">注册</span>
            <span v-if="opType == 1">登录</span>
            <span v-if="opType == 2">重置密码</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="button-panel-2">
        <el-button
          class="admin-panel"
          type="primary"
          @click="jumpToAdmin"
          size="large"
          >管理员界面</el-button
        >
        <el-button
          class="fast-panel"
          type="primary"
          @click="FastjumpToFrame"
          size="large"
          >快速入口</el-button
        >
      </div>
    </div>

    <!-- <Dialog
      :show="dialogConfig4SendMailCode.show"
      :title="dialogConfig4SendMailCode.title"
      :buttons="dialogConfig4SendMailCode.buttons"
      width="500px"
      :showCancel="false"
      @close="dialogConfig4SendMailCode.show = false"
    >
      <el-form
        :model="formData4SendMailCode"
        :rules="rules"
        ref="formData4SendMailCodeRef"
        label-width="80px"
      >
        <el-form-item label="邮箱">
          {{ formData.email }}
        </el-form-item>

        <el-form-item label="验证码" prop="checkCode">
          <div class="check-code-panel">
            <el-input
              size="large"
              placeholder="请输入验证码"
              v-model="formData4SendMailCode.checkCode"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img
              :src="checkCodeUrl4SendMailCode"
              class="check-code"
              @click="changeCheckCode(1)"
            />
          </div>
        </el-form-item>
      </el-form>
    </Dialog> -->
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

//验证码(两个界面的验证码独立)
/* const checkCodeUrl = ref(api.checkCode);
const checkCodeUrl4SendMailCode = ref(api.checkCode);
const changeCheckCode = (type) => {
  if (type == 0) {
    checkCodeUrl.value =
      api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
  } else {
    checkCodeUrl4SendMailCode.value =
      api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
  }
}; */

/* 发送邮箱验证码弹窗 */
/* const formData4SendMailCode = ref({});
const formData4SendMailCodeRef = ref();
const dialogConfig4SendMailCode = reactive({
  show: false,
  title: "发送邮箱验证码",
  buttons: [
    {
      type: "primary",
      text: "发送验证码",
      click: () => {
        sendEmailCode();
      },
    },
  ],
}); */

//获取邮箱验证码
// const getEmailCode = () => {
//   formDataRef.value.validateField("email", (valid) => {
//     if (!valid) {
//       return;
//     }
//     dialogConfig4SendMailCode.show = true; /* 判断邮箱格式是否正确 */

//     nextTick(() => {
//       changeCheckCode(1); /* 将验证码换掉 */
//       formData4SendMailCodeRef.value.resetFields();
//       formData4SendMailCode.value = {
//         email: formData.value.email,
//       };
//     });
//   });
// };

/* 发送邮件，要后端联调 */
/* const sendEmailCode = () => {
  formData4SendMailCodeRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    const params = Object.assign({}, formData4SendMailCode.value);
    params.type = opType.value == 0 ? 0 : 1;
    let result = await proxy.Request({
      url: api.sendEmailCode,
      params: params,
      errorCallback: () => {
        changeCheckCode(1);
      },
    });
    if (!result) {
      return;
    }
    proxy.Message.success("验证码发送成功，请登录邮箱查看");
    dialogConfig4SendMailCode.show = false;
  });
}; */

//登录，注册 弹出配置   reactive响应式对象
const dialogConfig = reactive({
  show: false,
  title: "标题",
});

/* 检查密码的再次输入 */
const checkRePassword = (rule, value, callback) => {
  if (value !== formData.value.registerPassword) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
};

const formData = ref({});
const formDataRef = ref();

/* 检查各种输入的规则 */
const rules = {
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "请输入正确的邮箱" },
  ],
  password: [{ required: true, message: "请输入密码" }],
  /* emailCode: [{ required: true, message: "请输入邮箱验证码" }], */
  username: [{ required: true, message: "请输入昵称" }],
  registerPassword: [
    { required: true, message: "请输入密码" },
    {
      validator: proxy.Verify.password,
      message: "密码只能是数字，字母，特殊字符 8-18位",
    },
  ],
  reRegisterPassword: [
    { required: true, message: "请再次输入密码" },
    {
      validator: checkRePassword,
      message: "两次输入的密码不一致",
    },
  ],
  /* checkCode: [{ required: true, message: "请输入图片验证码" }], */
};

/* 重置表单 */
const resetForm = () => {
  dialogConfig.show = true;
  if (opType.value == 0) {
    dialogConfig.title = "注册";
  } else if (opType.value == 1) {
    dialogConfig.title = "登录";
  } else if (opType.value == 2) {
    dialogConfig.title = "重置密码";
  }
  nextTick(() => {
    /* changeCheckCode(0); */
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
    console.log("用户名已更新为:", userStore.username);
  } else {
    console.error("用户名为空，无法发射！");
  }
};
//登录、注册、重置密码  提交表单
const doSubmit = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    let params = {};
    Object.assign(
      params,
      formData.value
    ); /* 将form.data的所有值都赋给params对象 */
    /* 注册 */
    if (opType.value == 0 || opType.value == 2) {
      params.password = params.registerPassword;
      delete params.registerPassword;
      delete params.reRegisterPassword;
    }
    /* 登录 */
    if (opType.value == 1) {
      let cookieLoginInfo = proxy.VueCookies.get("loginInfo");
      let cookiePassword =
        cookieLoginInfo == null ? null : cookieLoginInfo.password;
      /*        if (params.password !== cookiePassword) {
        params.password = md5(params.password);
      }  */
    }
    let url = null;

    if (opType.value == 0 || opType.value == 1) {
      if (opType.value == 0) {
        url = api.register;
      } else if (opType.value == 1) {
        url = api.login;
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
        // 解析响应
        const response = await result.json();
        data.value = response; // 更新数据

        // 输出消息
        console.log(response.message);

        // 处理成功操作
        if (response.code === 0) {
          // 存储 JWT 令牌
          localStorage.setItem("jwtToken", response.access_token); // 假设 token 是返回的 JWT 令牌字段名
          /*   console.log(localStorage.getItem('jwtToken')); */
          alert("操作成功");
          if (response.data.permission_level === 1) {
            router.push("/framework");
          } else if (response.data.permission_level === 0) {
            router.push("/userManagement");
          }

          emitUsername();
          saveUsername(params.username);
        } else {
          alert("操作失败：" + response.message);
        }
      } catch (error) {
        console.error("请求失败", error);
        alert("请求失败，请检查网络或稍后再试");
      }
    } else if (opType.value == 2) {
      url = api.resetPwd;
      const formData2 = new FormData();
      formData2.append("username", params.username);
      formData2.append("password", params.password);
      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData2, // 使用 FormData 作为请求体
        });

        const result = await response.json();
        if (result.code === 0) {
          alert("密码修改成功！");
          opType.value=1;
          resetForm();
        } else {
          console.error("修改失败", result.message);
        }
      } catch (error) {
        console.error("请求失败", error);
      }
    }
  });
};

const jumpToAdmin = () => {
  router.push("/userManagement");
};

const FastjumpToFrame = () => {
  router.push("/framework");
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
  .login-panel {
    width: 350px;
    margin: calc((100vh - 500px) / 2) auto;

    /* 登录注册 */
    .login-register {
      padding: 25px;
      background: linear-gradient(#1c1c1c, #d37478);
      border-radius: 5px;

      /* 标题 */
      .login-title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .login-title i{
        margin-right:10px;
      }

      /* 邮箱验证码 */
      .send-email-panel {
        display: flex;
        width: 100%;
        justify-content: space-between;

        /* 邮箱验证码的按钮 */
        .send-mail-btn {
          margin-left: 5px;
        }
      }

      /* 记住我选项 */
      .rememberme-panel {
        width: 100%;
      }

      /* 忘记密码？没有账号？*/
      .no-account {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      /* 确定按钮 */
      .op-btn {
        width: 100%;
      }
    }
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

    .check-code {
      margin-left: 5px;
      cursor: pointer;
    }
  }

  .login-btn-qq {
    margin-top: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      cursor: pointer;
      margin-left: 10px;
      width: 20px;
    }
  }
}
</style>
