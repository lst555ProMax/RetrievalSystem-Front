<template>
  <body>
    <main>
      <nav class="main-menu">
        <div>
          <div class="user-info">
            <img
              :src="avatarSrc"
              alt="user"
            />
            <p>{{ username }}</p>
          </div>
          <ul>
            <li
              class="nav-item"
              :class="{ active: isActive('/framework') }"
              @click="navigateTo('/framework')"
            >
              <a href="#">
                <i class="fa fa-map nav-icon"></i>
                <span class="nav-text">Home</span>
              </a>
            </li>

            <li class="nav-item"
            :class="{ active: isActive('/textSearch') }"
              @click="navigateTo('/textSearch')"
              >
              <a href="#">
                <i class="fa fa-arrow-trend-up nav-icon"></i>
                <span class="nav-text">Image</span>
              </a>
            </li>

            <li class="nav-item"
            :class="{ active: isActive('/imageSearch') }"
              @click="navigateTo('/imageSearch')">
              <a href="#">
                <i class="fa fa-compact-disc nav-icon"></i>
                <span class="nav-text">Text</span>
              </a>
            </li>

            <li class="nav-item"
            :class="{ active: isActive('/dialogue') }"
              @click="navigateTo('/dialogue')">
              <a href="#">
                <i class="fa fa-circle-play nav-icon"></i>
                <span class="nav-text">Dialog</span>
              </a>
            </li>

            <li
              class="nav-item"
              :class="{ active: isActive('/others') }"
              @click="navigateTo('/others')"
            >
              <a href="#">
                <i class="fa fa-heart nav-icon"></i>
                <span class="nav-text">About</span>
              </a>
            </li>

<!--             <li
              class="nav-item"
              :class="{ active: isActive('/test') }"
              @click="navigateTo('/test')"
            >
              <a href="#">
                <i class="fa fa-heart nav-icon"></i>
                <span class="nav-text">About</span>
              </a>
            </li> -->
          </ul>
        </div>

        <ul>
          <li class="nav-item"
          :class="{ active: isActive('/profile') }"
          @click="navigateTo('/profile')">
            <a href="#">
              <i class="fa fa-user nav-icon"></i>
              <span class="nav-text">Profile</span>
            </a>
          </li>

          <li class="nav-item" @click ="GoToLogin">
            <a href="#">
              <i class="fa fa-right-from-bracket nav-icon"></i>
              <span class="nav-text">Logout</span>
            </a>
          </li>
        </ul>
      </nav>

      <section class="content">
        <div class="left-content">
          <slot name="left-content"></slot>
        </div>
      </section>
    </main>
  </body>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, computed,onMounted } from 'vue';
import { getUsername } from "../utils/Auth";

const router = useRouter();
const route = useRoute();
const username=getUsername();

const avatarSrc = ref('../assets/avatar/lst.jpg'); // 默认头像

onMounted(() => {
  // 从 localStorage 或其他地方获取头像文件路径
  const storedAvatar = localStorage.getItem(`avatar_${username}`);
  if (storedAvatar) {
    avatarSrc.value = storedAvatar;
  }
});

// 定义一个函数，判断当前路由是否匹配
const isActive = (path) => {
  return route.path === path;
};

const GoToLogin=()=>{
    router.push("/");
}

// 定义一个导航函数
const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&family=Roboto:wght@300;400;500;700&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

nav {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
}

nav ul,
nav ul li {
  outline: 0;
}

nav ul li a {
  text-decoration: none;
}

img {
  width: 100%;
}

h1 {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

/* MAIN MENU */

main {
  display: grid;
  grid-template-columns: 11% 89%;
  width: 100%;
  height: 100vh;
  margin: 0px;
  background: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  box-shadow: 0 0.5px 0 1px rgba(255, 255, 255, 0.23) inset,
    0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 10;
}

.main-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px 0 0 15px;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  padding: 12px 0 20px;
  overflow: hidden;
  font-family: inherit;
}

.user-info img {
  padding: 12px 24px 6px;
  border-radius: 50%;
}

.user-info p {
  color: #fff;
  font-size: clamp(0.8rem, 5vw, 1.5rem);
  font-weight: 500;
  text-align: center;
  line-height: 1;
  padding: 0 6px 32px;
}

.nav-item {
  display: block;
}

.nav-item a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1rem;
  padding: 12px 0;
  margin: 0 8px;
  border-radius: 5px;
}


.nav-item a i{
  display: -ms-inline-flexbox;
  color:#ffffffd0;
}

.nav-item a i:hover{
  color: #3e3e5f;
}

.nav-item.active a {
  background: rgba(106, 109, 155, 0.5);
  text-decoration: none;
}

.nav-icon {
  width: 40px;
  height: 20px;
  font-size: 1.1rem;
}

.nav-text {
  display: block;
  width: 70px;
  height: 20px;
  letter-spacing: 0;
}

/* CONTENT */

.content {
  display: grid;
  grid-template-columns: 100% 100%;
  max-height: 100%;
  max-width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

/* LEFT CONTENT */

.left-content {
  padding: 10px 30px;
  color: #e5e5e5;
}

/* Containers of Artist and Albums */

.containers {
  display: flex;
  align-items: center;
  padding: 0 0 12px;
  overflow-x: auto;
  cursor: grab;
}

/* MEDIA QUERIES */

@media (max-width: 1500px) {
  .content {
    grid-template-columns: 100%;
    grid-template-areas: "leftContent";
  }

  .left-content {
    grid-area: leftContent;
  }
}

@media (max-width: 1310px) {
  .content {
    grid-template-columns: 100%;
    grid-template-areas: "leftContent";
  }

  .left-content {
    grid-area: leftContent;
  }
}

@media (max-width: 1100px) {
  .content {
    grid-template-columns: 100%;
    grid-template-areas: "leftContent";
  }

  .left-content {
    grid-area: leftContent;
  }
}

@media (max-width: 910px) {
  .content {
    grid-template-columns: 100%;
    grid-template-areas: "leftContent";
  }

  .left-content {
    grid-area: leftContent;
  }
}

@media (max-width: 825px) {
  .content {
    grid-template-columns: 100%;
    grid-template-areas: "leftContent";
  }

  .left-content {
    grid-area: leftContent;
  }
}

@media (max-width: 700px) {
  .content {
    grid-template-columns: 100%;
    grid-template-areas: "leftContent";
  }

  .left-content {
    grid-area: leftContent;
  }
}

@media (max-width: 450px) {
  .content {
    grid-template-columns: 100%;
    grid-template-areas: "leftContent";
  }

  .left-content {
    grid-area: leftContent;
  }
}
</style>

