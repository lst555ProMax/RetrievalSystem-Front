<template>
  <body>
    <main>
      <nav class="main-menu">
        <div>
          <div class="user-info">
            <img
              src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/37e5ccfa-f9ee-458b-afa2-dcd85b495e4e"
              alt="user"
            />
            <p>Jane Wilson</p>
          </div>
          <ul>
            <li
              class="nav-item"
              :class="{ active: isActive1 }"
              @click="setActive1"
            >
              <a href="#">
                <i class="fa fa-map nav-icon"></i>
                <span class="nav-text">Home</span>
              </a>
            </li>

            <li class="nav-item">
              <a href="#">
                <i class="fa fa-arrow-trend-up nav-icon"></i>
                <span class="nav-text">Image</span>
              </a>
            </li>

            <li class="nav-item">
              <a href="#">
                <i class="fa fa-compact-disc nav-icon"></i>
                <span class="nav-text">Text</span>
              </a>
            </li>

            <li class="nav-item">
              <a href="#">
                <i class="fa fa-circle-play nav-icon"></i>
                <span class="nav-text">Dialog</span>
              </a>
            </li>

            <li
              class="nav-item"
            >
              <a href="#">
                <i class="fa fa-heart nav-icon"></i>
                <span class="nav-text">About</span>
              </a>
            </li>
          </ul>
        </div>

        <ul>
          <li class="nav-item">
            <a href="#">
              <i class="fa fa-user nav-icon"></i>
              <span class="nav-text">Profile</span>
            </a>
          </li>

          <li class="nav-item">
            <a href="#">
              <i class="fa fa-gear nav-icon"></i>
              <span class="nav-text">Settings</span>
            </a>
          </li>

          <li class="nav-item">
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
  font-size: clamp(0.8rem, 3vw, 1rem);
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
  padding: 30px 20px;
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

<script setup>
import { useRoute,useRouter } from "vue-router";

    const router = useRouter();
    const route =useRoute();

    const navItems = document.querySelectorAll(".nav-item");
    
    if (route.path === '/framework') {
        console.log(navItems.item[0]);
         navItems[0].className = "nav-item.active"
         
    }
</script>