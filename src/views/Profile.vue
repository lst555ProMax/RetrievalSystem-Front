<template>
  <component :is="currentThemeComponent" />
  <Dashboard>
    <template #left-content>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Profile Page</title>

        <link rel="stylesheet" href="style.css" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
        />
      </head>

      <body>
        <div class="navbar-top">
          <div class="title">
            <h1>Profile</h1>
          </div>

          <ul>
            <li
              @mouseover="showForm('form1Vision')"
              @mouseleave="startHideTimer('form1Vision')"
            >
              <a href="#message">
                <i class="fa fa-envelope fa-2x"></i>
              </a>
              <div class="form1Vision">
                <Official :isVisible="isForm1Visible"></Official>
              </div>
            </li>
            <li
              @mouseover="showForm('form2Vision')"
              @mouseleave="startHideTimer('form2Vision')"
            >
              <a href="#notification">
                <i class="fa fa-bell fa-2x"> </i>
              </a>
              <div class="form2Vision">
                <Activity :isVisible="isForm2Visible"></Activity>
              </div>
            </li>
            <li
              @mouseover="showForm('form3Vision')"
              @mouseleave="startHideTimer('form3Vision')"
            >
              <a href="#edit">
                <i class="fa fa-pen fa-2x"> </i>
              </a>
              <div class="form3Vision">
                <PersonContent
                  :isVisible="isForm3Visible"
                  @hide="hideForm"
                  @toggleForm="handleToggleForm"
                  @answer="handleAnswer"
                  @feedBack="handleFeedBack"
                  @pay="handlePay"
                  @delete="handleDelete"
                  @personalization="handlePersonalization"
                ></PersonContent>
              </div>
            </li>
          </ul>
        </div>

        <div class="main">
          <h2>IDENTITY</h2>

          <div class="card">
            <div class="card-body">
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>ImDezCode</td>
                  </tr>
                  <tr>
                    <td>Nickname</td>
                    <td>:</td>
                    <td>ImDezCode001</td>
                  </tr>
                  <tr>
                    <td>Sex</td>
                    <td>:</td>
                    <td>Female</td>
                  </tr>
                  <tr>
                    <td>Birthday</td>
                    <td>:</td>
                    <td>The Code Day</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>imdezcode@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td>Bali, Indonesia</td>
                  </tr>
                  <tr>
                    <td>Hobbies</td>
                    <td>:</td>
                    <td>Diving, Reading Book</td>
                  </tr>
                  <tr>
                    <td>Job</td>
                    <td>:</td>
                    <td>Web Developer</td>
                  </tr>
                  <tr>
                    <td>Skill</td>
                    <td>:</td>
                    <td>PHP, HTML, CSS, Java</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </body>
    </template>
  </Dashboard>
  <Edit :isVisible="isEditVisible" @update:isVisible="isEditVisible = $event" />
  <Answer
    :isVisible="isAnswerVisible"
    @update:isVisible="isAnswerVisible = $event"
  ></Answer>
  <FeedBack
    :isVisible="isFeedBackVisible"
    @update:isVisible="isFeedBackVisible = $event"
  />
  <Pay
    :isVisible="isPayVisible"
    @update:isVisible="isPayVisible = $event"
  ></Pay>
  <Personalization
    :isVisible="isPersonalizationVisible"
    @update:isVisible="isPersonalizationVisible = $event"
  >
  </Personalization>
  <Delete
    :isVisible="isDeleteVisible"
    @update:isVisible="isDeleteVisible = $event"
  ></Delete>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getUsername } from "@/utils/Auth.js";
import PersonContent from "../components/PersonContent.vue";
import Activity from "../components/Activity.vue";
import Official from "../components/Official.vue";
import Edit from "../components/Edit.vue";
import FeedBack from "../components/FeedBack.vue";
import Pay from "../components/Pay.vue";
import Delete from "../components/Delete.vue";
import Answer from "../components/Answer.vue";
import Starfield from "../components/Starfield.vue";
import CrossStar from "@/components/CrossStar.vue";
import Neural from "../components/Neural.vue";
import Dashboard from "../components/Dashboard.vue";
import Personalization from "../components/Personalizaion.vue";

import { defineEmits } from "vue";
import StarfieldVue from "../components/Starfield.vue";

const router = useRouter();
const goHome = () => router.push("/home");

// 定义表单可见性状态
const isForm1Visible = ref(false);
const isForm2Visible = ref(false);
const isForm3Visible = ref(false);
const isEditVisible = ref(false);
const isAnswerVisible = ref(false);
const isFeedBackVisible = ref(false);
const isPayVisible = ref(false);
const isDeleteVisible = ref(false);
const isPersonalizationVisible = ref(false);

const currentTheme = ref("Starfield");

const currentThemeComponent = computed(() => {
  switch (currentTheme.value) {
    case "Neural":
      return Neural;
    case "CrossStar":
      return CrossStar;
    default:
      return Starfield;
  }
});

// 用于隐藏定时器
const hideTimers = ref({});

// 显示表单
const showForm = (formName) => {
  clearTimeout(hideTimers.value[formName]);
  if (formName === "form1Vision") {
    document.querySelector(".form1Vision").style.display = "block";
  } else if (formName === "form2Vision") {
    document.querySelector(".form2Vision").style.display = "block";
  } else if (formName === "form3Vision") {
    document.querySelector(".form3Vision").style.display = "block";
  }
};

// 隐藏表单
const hideForm = (formName) => {
  hideTimers.value[formName] = setTimeout(() => {
    if (formName === "form1Vision") {
      document.querySelector(".form1Vision").style.display = "none";
    } else if (formName === "form2Vision") {
      document.querySelector(".form2Vision").style.display = "none";
    }
    if (formName === "form3Vision") {
      document.querySelector(".form3Vision").style.display = "none";
    }
  }, 100);
};

// 启动隐藏定时器

const startHideTimer = (formName) => {
  hideTimers.value[formName] = setTimeout(() => {
    if (formName === "form1Vision") {
      document.querySelector(".form1Vision").style.display = "none";
    } else if (formName === "form2Vision") {
      document.querySelector(".form2Vision").style.display = "none";
    }
    if (formName === "form3Vision") {
      document.querySelector(".form3Vision").style.display = "none";
    }
  }, 100);
};

// 处理支付
const handlePay = () => {
  document.querySelector(".form3Vision").style.display = "none";
  isPayVisible.value = true;
};
// 切换表单
const handleToggleForm = () => {
  document.querySelector(".form3Vision").style.display = "none";
  isEditVisible.value = true;
};
// 处理回答
const handleAnswer = () => {
  document.querySelector(".form3Vision").style.display = "none";
  isAnswerVisible.value = true;
};
// 处理个性化
const handlePersonalization = () => {
  document.querySelector(".form3Vision").style.display = "none";
  isPersonalizationVisible.value = true;
};
// 处理反馈
const handleFeedBack = () => {
  document.querySelector(".form3Vision").style.display = "none";
  isFeedBackVisible.value = true;
};
// 处理注销
const handleDelete = () => {
  document.querySelector(".form3Vision").style.display = "none";
  isDeleteVisible.value = true;
};

onMounted(() => {
  const username = getUsername();

  if (!username) {
    router.push("/");
  } else {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      currentTheme.value = savedTheme;
    }
  }
});
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Dancing+Script);

* {
  margin: 0;
}

body {
  /* 设置字体和布局 */
  font-family: Arial;
  overflow: hidden;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.navbar-top {
  width: 100%;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px 20px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 80px;
  display: flex;
}

.title {
  font-family: "Dancing Script", cursive;
  color: #fff;
  align-items: center;
}

ul {
  position: relative;
  align-items: center;
  display: flex;
  padding: 10px 0;
}

ul li {
  position: relative;
  display: inline-block;
}

ul li a {
  color: #333;
  padding: 14px 16px;
  text-align: center;
  text-decoration: none;
}

ul li a i {
  display: -ms-inline-flexbox;
  color: #ffffffd0;
}

ul li a i:hover {
  color: #3e3e5f;
}

.icon-count {
  background-color: #ff0000;
  color: #fff;
  float: right;
  font-size: 11px;
  left: -25px;
  padding: 2px;
  position: relative;
}

.trigger-container3 {
  position: relative;
  display: inline-block;
}

.form1Vision {
  border: 0.1px solid #ffffff58;
  width: 800px;
  height: 400px;
  display: none;
  background-color: rgba(128, 128, 128, 0.05);
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 200%;
  left: 50%;
  transform: translateX(-100%);
  z-index: 10;
}

.form2Vision,
.form3Vision {
  border: 0.1px solid #ffffff58;
  width: 400px;
  height: 400px;
  display: none;
  background-color: rgba(128, 128, 128, 0.05);
  border-radius: 18px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 创建一个柔和的阴影效果，使元素从页面中浮起来，增强视觉层次感 */
  position: absolute;
  top: 200%; /* 将元素的顶部边缘定位在其包含块的顶部边缘以下 200% 的位置 */
  left: 50%; /* 将元素的左边缘定位在其包含块的左边缘的 50% 位置 */
  transform: translateX(-100%); /* 将元素在水平方向上移动其自身宽度的 50% */
  z-index: 10; /* 设置元素的堆叠顺序，值越大，元素越位于其他元素之上 */
}

.main {
  font-size: 28px;
  padding: 100px 10px;
  width: auto;
  height: 636px;
  align-items: center;
}

.main h2 {
  color: rgba(255, 255, 255, 0.8);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 24px;
  margin-bottom: 50px;
  width: 80%;
}

.main .card {
  border-radius: 18px;
  box-shadow: 1px 1px 8px 0 grey;
  height: 85%;
  margin-bottom: 20px;
  padding: 20px 0 20px 50px;
  width: 60%;
  color: rgba(255, 255, 255, 0.8);
}

.main .card table {
  border: none;
  font-size: 16px;
  height: 350px;
  width: 80%;
}
</style>
