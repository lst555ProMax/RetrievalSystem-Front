<template>
    <aside class="sidebar">
      <nav class="nav-menu">
        <ul>
          <li><a href='#' @click.prevent="GoToUserManagement">用户管理</a></li>
          <li><a href='#' @click.prevent="GoToSystemManagement">系统管理</a></li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  import Sidebar from "../components/Sidebar.vue";
  
  const router = useRouter();

  const GoToUserManagement=()=>router.push("/userManagement");
  const GoToSystemManagement=()=>router.push("/systemManagement");
  
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px; /* 固定宽度 */
    background-color: #001732; /* 深海蓝色的略深调 */
    padding: 10px; /* 减少内边距 */
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh-60px); /* 调整为视口高度减去外边距 */
    box-sizing: border-box; /* 包括内边距和边框在内的高度 */
  }
  
  .nav-menu ul {
    list-style: none;
    padding: 0;
    width: 100%;
    margin: 0; /* 清除默认外边距 */
  }
  
  .nav-menu li {
    margin: 0; /* 清除外边距 */
    padding: 10px 0; /* 调整内边距以增加上下间距 */
    border-bottom: 1px solid #d3d3d3; /* 添加底部分隔符 */
    text-align: center; /* 文字居中 */
  }
  
  .nav-menu li:last-child {
    border-bottom: none; /* 去掉最后一个元素的边框 */
  }
  
  .nav-menu a {
    color: #d3d3d3; /* 淡雅灰色调 */
    text-decoration: none;
    padding: 10px 15px;
    display: block;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s; /* 添加颜色过渡效果 */
    font-size: 18px; /* 增加字体大小 */
    font-weight: bold; /* 字体加粗 */
    text-transform: uppercase; /* 转为大写字母 */
  }
  
  .nav-menu a:hover {
    background-color: #33b045; /* 悬停时背景色变为深绿色 */
    color: #ffffff; /* 悬停时文字变为白色 */
  }
  </style>
  