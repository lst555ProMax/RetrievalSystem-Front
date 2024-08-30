<template>
  <footer class="footer">
    <a href="#" @click="help">帮助中心</a>
    <a href="#">隐私政策</a>
  </footer>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const help = () => {
  router.push("/help");
};
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 20px;
  background-color: #001732; /* 深海蓝色的略深调 */
  color: #d3d3d3; /* 淡雅灰色调 */
  position: absolute;
  bottom: 0;
  width: 100%;
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
