<template>
  <div>
    <!-- 页眉 -->
    <header class="header">
      <div class="brand-logo">系统Logo</div>
      <h1>支持与帮助</h1>
    </header>

    <!-- 主内容 -->
    <main class="main-content">
      <!-- 常见问题部分 -->
      <section class="section">
        <h2>常见问题</h2>
        <p>
          这里列出了一些常见的问题及其解答。如果你遇到其他问题，可以随时联系我们的支持团队。
        </p>
      </section>

      <!-- 联系我们部分 -->
      <section class="section">
        <h2>联系我们</h2>
        <p>如果你需要进一步的帮助，请通过以下方式联系我们：</p>
        <ul>
          <li>
            电子邮件:
            <a href="mailto:support@example.com" style="color: #39d353"
              >support@example.com</a
            >
          </li>
          <li>电话: 123-456-7890</li>
        </ul>
      </section>

      <!-- 反馈与建议部分 -->
      <section class="section">
        <h2>反馈与建议</h2>
        <p>我们非常欢迎你的反馈和建议，请填写以下表单，帮助我们改进服务：</p>
        <div  class="button-container">
        <button class="contact-button" @click="openFeedbackForm">提交反馈</button>
        <button class="return-button" @click="returnToLogin">返回登录页面</button>
    </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <a href="#">使用条款</a>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
// 定义打开反馈表单的方法
function openFeedbackForm() {
  alert("反馈表单将打开"); // 模拟打开反馈表单
}

const returnToLogin = () => {
  router.push("/");
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  background-color: #001f3f; /* 深海蓝色调 */
  color: #d3d3d3; /* 淡雅灰色调 */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #001732; /* 深海蓝色的略深调 */
  padding: 20px;
  text-align: center;
}

.header h1 {
  font-size: 24px;
  font-weight: bold;
  color: #d3d3d3; /* 淡雅灰色调 */
  margin: 0;
}

.brand-logo {
  font-size: 18px;
  font-weight: bold;
  color: #39d353; /* 草绿色调 */
}

.main-content {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.section {
  margin-bottom: 20px;
}

.section h2 {
  font-size: 20px;
  font-weight: bold;
  border-bottom: 2px solid #39d353; /* 草绿色调 */
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.section p {
  font-size: 16px;
  line-height: 1.6;
}

.button-container {
    display: flex;
  text-align: center;
  width: 50%;
  justify-content: space-between; /* 在主轴上分配空间 */
  padding: 20px;
}

.contact-button,
.return-button {
  padding: 15px 30px;
  background-color: #39d353; /* 草绿色调 */
  color: #d3d3d3; /* 淡雅灰色调 */
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.contact-button:hover {
  background-color: #33b045; /* 鼠标悬停时草绿色加深 */
}

.footer {
  text-align: center;
  padding: 10px;
  background-color: #001732; /* 深海蓝色的略深调 */
  color: #d3d3d3; /* 淡雅灰色调 */
}

.footer a {
  color: #d3d3d3; /* 淡雅灰色调 */
  text-decoration: none;
  margin: 0 15px;
  transition: text-decoration 0.3s;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
